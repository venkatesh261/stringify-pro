export enum CaseType {
  CAMEL = 'camel',
  PASCAL = 'pascal',
  SNAKE = 'snake',
  KEBAB = 'kebab'
}

export enum HashType {
  MD5 = 'md5',
  SHA256 = 'sha256',
  SHA512 = 'sha512'
}

export interface RandomStringOptions {
  numbers?: boolean;
  symbols?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
}

export interface SlugifyOptions {
  lowercase?: boolean;
  separator?: string;
  removeStopWords?: boolean;
}

export interface StringUtilsInterface {
  capitalize(str: string): string;
  convertCase(str: string, type: CaseType): string;
  trimExtraSpaces(str: string): string;
  removeSpecialChars(str: string, allowSpaces?: boolean): string;
  wordCount(str: string): number;
  isPalindrome(str: string, caseSensitive?: boolean): boolean;
  similarity(str1: string, str2: string): number;
  randomString(length?: number, options?: RandomStringOptions): string;
  hash(str: string, algorithm: HashType): string;
  hashWithSalt(str: string, saltRounds?: number): Promise<string>;
  verifyHash(str: string, hashedStr: string): Promise<boolean>;
  base64Encode(str: string): string;
  base64Decode(str: string): string;
  slugify(str: string, options?: SlugifyOptions): string;
}