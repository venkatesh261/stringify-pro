import { stringUtils } from '../src/index';
import { CaseType, HashType } from '../src/types';
import { ValidationError, CryptoError } from '../src/errors';

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(stringUtils.capitalize('hello')).toBe('Hello');
      expect(stringUtils.capitalize('world')).toBe('World');
    });

    it('should handle empty string', () => {
      expect(stringUtils.capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(stringUtils.capitalize('a')).toBe('A');
    });

    it('should throw for invalid input', () => {
      expect(() => stringUtils.capitalize(null as any)).toThrow(ValidationError);
      expect(() => stringUtils.capitalize(undefined as any)).toThrow(ValidationError);
      expect(() => stringUtils.capitalize(123 as any)).toThrow(ValidationError);
    });
  });

  describe('convertCase', () => {
    it('should convert to camelCase', () => {
      expect(stringUtils.convertCase('hello-world', CaseType.CAMEL)).toBe('helloWorld');
      expect(stringUtils.convertCase('Hello World', CaseType.CAMEL)).toBe('helloWorld');
      expect(stringUtils.convertCase('hello_world', CaseType.CAMEL)).toBe('helloWorld');
    });

    it('should convert to PascalCase', () => {
      expect(stringUtils.convertCase('hello-world', CaseType.PASCAL)).toBe('HelloWorld');
      expect(stringUtils.convertCase('hello world', CaseType.PASCAL)).toBe('HelloWorld');
      expect(stringUtils.convertCase('hello_world', CaseType.PASCAL)).toBe('HelloWorld');
    });

    it('should convert to snake_case', () => {
      expect(stringUtils.convertCase('helloWorld', CaseType.SNAKE)).toBe('hello_world');
      expect(stringUtils.convertCase('Hello World', CaseType.SNAKE)).toBe('hello_world');
      expect(stringUtils.convertCase('hello-world', CaseType.SNAKE)).toBe('hello_world');
    });

    it('should convert to kebab-case', () => {
      expect(stringUtils.convertCase('helloWorld', CaseType.KEBAB)).toBe('hello-world');
      expect(stringUtils.convertCase('Hello World', CaseType.KEBAB)).toBe('hello-world');
      expect(stringUtils.convertCase('hello_world', CaseType.KEBAB)).toBe('hello-world');
    });
  });

  describe('trimExtraSpaces', () => {
    it('should remove extra spaces', () => {
      expect(stringUtils.trimExtraSpaces('  hello   world  ')).toBe('hello world');
      expect(stringUtils.trimExtraSpaces('hello     world')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(stringUtils.trimExtraSpaces('')).toBe('');
      expect(stringUtils.trimExtraSpaces('   ')).toBe('');
    });
  });

  describe('removeSpecialChars', () => {
    it('should remove special characters', () => {
      expect(stringUtils.removeSpecialChars('hello@world!')).toBe('helloworld');
      expect(stringUtils.removeSpecialChars('hello world!', true)).toBe('hello world');
      expect(stringUtils.removeSpecialChars('hello world!', false)).toBe('helloworld');
    });
  });

  describe('wordCount', () => {
    it('should count words correctly', () => {
      expect(stringUtils.wordCount('hello world')).toBe(2);
      expect(stringUtils.wordCount('hello   world')).toBe(2);
      expect(stringUtils.wordCount('')).toBe(0);
      expect(stringUtils.wordCount('   ')).toBe(0);
    });
  });

  describe('isPalindrome', () => {
    it('should detect palindromes', () => {
      expect(stringUtils.isPalindrome('racecar')).toBe(true);
      expect(stringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true);
      expect(stringUtils.isPalindrome('hello')).toBe(false);
    });

    it('should respect case sensitivity', () => {
      expect(stringUtils.isPalindrome('Racecar', false)).toBe(true);
      expect(stringUtils.isPalindrome('Racecar', true)).toBe(false);
    });
  });

  describe('similarity', () => {
    it('should calculate string similarity', () => {
      expect(stringUtils.similarity('hello', 'hallo')).toBe(80);
      expect(stringUtils.similarity('hello', 'hello')).toBe(100);
      expect(stringUtils.similarity('hello', 'hi')).toBeLessThan(50);
    });
  });

  describe('randomString', () => {
    it('should generate string of correct length', () => {
      expect(stringUtils.randomString(10)).toHaveLength(10);
      expect(stringUtils.randomString(5)).toHaveLength(5);
    });

    it('should respect character type options', () => {
      const numbersOnly = stringUtils.randomString(10, {
        numbers: true,
        symbols: false,
        uppercase: false,
        lowercase: false
      });
      expect(numbersOnly).toMatch(/^[0-9]+$/);

      const upperOnly = stringUtils.randomString(10, {
        numbers: false,
        symbols: false,
        uppercase: true,
        lowercase: false
      });
      expect(upperOnly).toMatch(/^[A-Z]+$/);
    });

    it('should throw for invalid length', () => {
      expect(() => stringUtils.randomString(0)).toThrow(ValidationError);
      expect(() => stringUtils.randomString(-1)).toThrow(ValidationError);
    });
  });

  describe('hash', () => {
    it('should generate correct hash', () => {
      const md5Hash = stringUtils.hash('hello', HashType.MD5);
      expect(md5Hash).toHaveLength(32);

      const sha256Hash = stringUtils.hash('hello', HashType.SHA256);
      expect(sha256Hash).toHaveLength(64);
    });
  });

  describe('hashWithSalt and verifyHash', () => {
    it('should verify hashed string correctly', async () => {
      const password = 'myPassword123';
      const hashedPassword = await stringUtils.hashWithSalt(password);

      expect(await stringUtils.verifyHash(password, hashedPassword)).toBe(true);
      expect(await stringUtils.verifyHash('wrongPassword', hashedPassword)).toBe(false);
    });
  });

  describe('base64', () => {
    it('should encode and decode base64 correctly', () => {
      const original = 'Hello World!';
      const encoded = stringUtils.base64Encode(original);
      const decoded = stringUtils.base64Decode(encoded);

      expect(decoded).toBe(original);
    });

    it('should throw for invalid base64', () => {
      expect(() => stringUtils.base64Decode('invalid base64!')).toThrow();
    });
  });

  describe('slugify', () => {
    it('should create valid slugs', () => {
      expect(stringUtils.slugify('Hello World!')).toBe('hello-world');
      expect(stringUtils.slugify('Hello & World')).toBe('hello-world');
    });

    it('should respect options', () => {
      expect(stringUtils.slugify('The Quick Brown Fox', {
        removeStopWords: true
      })).toBe('quick-brown-fox');

      expect(stringUtils.slugify('Hello World', {
        separator: '_'
      })).toBe('hello_world');
    });
  });
});