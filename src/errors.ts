export class StringUtilError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StringUtilError';
    Object.setPrototypeOf(this, StringUtilError.prototype);
  }
}

export class ValidationError extends StringUtilError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class CryptoError extends StringUtilError {
  constructor(message: string) {
    super(message);
    this.name = 'CryptoError';
    Object.setPrototypeOf(this, CryptoError.prototype);
  }
}