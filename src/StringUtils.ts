import crypto from "crypto";
import { CaseType, HashType, RandomStringOptions, SlugifyOptions, StringUtilsInterface } from "./types";
import { StringUtilError, ValidationError, CryptoError } from "./errors";

function validateString(str: unknown, functionName: string): string {
  if (str === null || str === undefined) {
    throw new ValidationError(`${functionName}: Input cannot be null or undefined`);
  }
  if (typeof str !== 'string') {
    throw new ValidationError(`${functionName}: Input must be a string`);
  }
  return str;
}

export class StringUtils implements StringUtilsInterface {
  private static instance: StringUtils;

  private constructor() {}

  public static getInstance(): StringUtils {
    if (!StringUtils.instance) {
      StringUtils.instance = new StringUtils();
    }
    return StringUtils.instance;
  }

  public capitalize(str: string): string {
    str = validateString(str, 'capitalize');
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

 public convertCase(str: string, type: CaseType): string {
  str = validateString(str, 'convertCase');

  switch (type) {
    case CaseType.CAMEL:
      return str
        .replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
        .replace(/^(.)/, char => char.toLowerCase());

    case CaseType.PASCAL:
      return str
        .replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
        .replace(/^(.)/, char => char.toUpperCase());

    case CaseType.SNAKE:
      return str
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-\s]+/g, '_')  // Changed to handle multiple spaces/hyphens
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/_+/g, '_');     // Added to handle multiple underscores

    case CaseType.KEBAB:
      return str
        .replace(/([A-Z])/g, '-$1')
        .replace(/[_\s]+/g, '-')  // Changed to handle multiple spaces/underscores
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/-+/g, '-');     // Added to handle multiple hyphens

    default:
      throw new ValidationError('Invalid case type');
  }
}
  public trimExtraSpaces(str: string): string {
    str = validateString(str, 'trimExtraSpaces');
    return str.replace(/\s+/g, ' ').trim();
  }

  public removeSpecialChars(str: string, allowSpaces = true): string {
    str = validateString(str, 'removeSpecialChars');
    return str.replace(allowSpaces ? /[^\w\s]/g : /[^\w]/g, '');
  }

  public wordCount(str: string): number {
    str = validateString(str, 'wordCount');
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  public isPalindrome(str: string, caseSensitive = false): boolean {
    str = validateString(str, 'isPalindrome');
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    const processedStr = caseSensitive ? cleanStr : cleanStr.toLowerCase();
    return processedStr === processedStr.split('').reverse().join('');
  }

  public similarity(str1: string, str2: string): number {
    str1 = validateString(str1, 'similarity');
    str2 = validateString(str2, 'similarity');

    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return Number((1 - distance / maxLength).toFixed(2)) * 100;
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }

    return matrix[a.length][b.length];
  }

  public randomString(length = 10, options: RandomStringOptions = {}): string {
    if (length < 1) throw new ValidationError('Length must be positive');

    const {
      numbers = true,
      symbols = false,
      uppercase = true,
      lowercase = true
    } = options;

    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) {
      throw new ValidationError('At least one character type must be selected');
    }

    try {
      // Fix: Use Array.from to properly convert Uint8Array to number array
      return Array.from(crypto.randomBytes(length))
        .map(byte => chars[byte % chars.length])
        .join('');
    } catch (error) {
      throw new CryptoError('Failed to generate random string');
    }
}

  public hash(str: string, algorithm: HashType): string {
    str = validateString(str, 'hash');
    try {
      return crypto.createHash(algorithm).update(str).digest('hex');
    } catch (error) {
      throw new CryptoError(`Failed to hash string using ${algorithm}`);
    }
  }

  public async hashWithSalt(str: string, saltRounds = 10): Promise<string> {
    str = validateString(str, 'hashWithSalt');
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(str, salt, saltRounds, 64, 'sha512').toString('hex');
      return `${salt}:${hash}`;
    } catch (error) {
      throw new CryptoError('Failed to hash string with salt');
    }
  }

  public async verifyHash(str: string, hashedStr: string): Promise<boolean> {
    str = validateString(str, 'verifyHash');
    hashedStr = validateString(hashedStr, 'verifyHash');

    try {
      const [salt, originalHash] = hashedStr.split(':');
      const hash = crypto.pbkdf2Sync(str, salt, 10, 64, 'sha512').toString('hex');
      return hash === originalHash;
    } catch (error) {
      throw new CryptoError('Failed to verify hash');
    }
  }

  public base64Encode(str: string): string {
    str = validateString(str, 'base64Encode');
    try {
      return Buffer.from(str).toString('base64');
    } catch (error) {
      throw new StringUtilError('Failed to encode string to base64');
    }
  }

  public base64Decode(str: string): string {
  str = validateString(str, 'base64Decode');
  try {
    // Add validation for base64 format
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(str)) {
      throw new StringUtilError('Invalid base64 string');
    }
    return Buffer.from(str, 'base64').toString();
  } catch (error) {
    throw new StringUtilError('Invalid base64 string');
  }
}

  public slugify(str: string, options: SlugifyOptions = {}): string {
    str = validateString(str, 'slugify');

    const {
      lowercase = true,
      separator = '-',
      removeStopWords = false
    } = options;

    let result = str;

    if (lowercase) {
      result = result.toLowerCase();
    }

    if (removeStopWords) {
      const stopWords = ['a', 'an', 'the', 'and', 'or', 'but'];
      result = result.split(' ')
        .filter(word => !stopWords.includes(word.toLowerCase()))
        .join(' ');
    }

    return result
      .replace(/[^\w\s-]/g, '')  // Remove special characters except whitespace and hyphens
      .replace(/\s+/g, separator) // Replace whitespace with separator
      .replace(new RegExp(`${separator}+`, 'g'), separator) // Remove multiple separators
      .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // Remove leading/trailing separators
  }
}