# Stringify Pro

[![npm version](https://badge.fury.io/js/stringify-pro.svg)](https://badge.fury.io/js/stringify-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A powerful TypeScript/JavaScript string manipulation library providing a comprehensive suite of string operations with robust error handling and type safety.

## Why Stringify Pro?

- 🔒 **Type Safety**: Full TypeScript support with proper type definitions
- 🛡️ **Error Handling**: Robust error handling with custom error types
- 🚀 **Performance**: Optimized for performance with minimal dependencies
- 💪 **Reliability**: Comprehensive test coverage
- 🔧 **Flexibility**: Extensive configuration options for each operation

## Installation

```bash
npm install stringify-pro
```

or

```bash
yarn add stringify-pro
```

## Quick Start

```typescript
import { stringUtils, CaseType, HashType } from 'stringify-pro';

// Case conversion
const camelCase = stringUtils.convertCase('hello-world', CaseType.CAMEL);
console.log(camelCase); // 'helloWorld'

// Secure password hashing
const hashedPassword = await stringUtils.hashWithSalt('myPassword');
const isValid = await stringUtils.verifyHash('myPassword', hashedPassword);

// Generate secure random string
const randomStr = stringUtils.randomString(12, {
  numbers: true,
  symbols: true,
  uppercase: true
});

// Create URL-friendly slug
const slug = stringUtils.slugify('Hello & World!'); // 'hello-world'
```

## Core Features

### Case Conversion
```typescript
// Capitalization
stringUtils.capitalize('hello world'); // 'Hello world'

// Case conversion
stringUtils.convertCase('hello-world', CaseType.CAMEL);  // 'helloWorld'
stringUtils.convertCase('hello world', CaseType.PASCAL); // 'HelloWorld'
stringUtils.convertCase('helloWorld', CaseType.SNAKE);   // 'hello_world'
stringUtils.convertCase('Hello World', CaseType.KEBAB);  // 'hello-kebab'
```

### String Analysis
```typescript
// Word counting
stringUtils.wordCount('hello beautiful world'); // 3

// Palindrome checking
stringUtils.isPalindrome('A man a plan a canal Panama'); // true

// String similarity (0-100)
stringUtils.similarity('hello', 'hallo'); // 80
```

### Security Functions
```typescript
// Secure random string generation
const password = stringUtils.randomString(16, {
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true
});

// Hashing
const hash = stringUtils.hash('password', HashType.SHA256);

// Salted hashing
const hashedPassword = await stringUtils.hashWithSalt('password');
const isValid = await stringUtils.verifyHash('password', hashedPassword);
```

### Text Processing
```typescript
// Clean text
stringUtils.removeSpecialChars('hello@world!'); // 'helloworld'
stringUtils.trimExtraSpaces('hello   world  '); // 'hello world'

// Encoding
const encoded = stringUtils.base64Encode('Hello World');
const decoded = stringUtils.base64Decode(encoded);

// URL-friendly slugs
stringUtils.slugify('Hello & World!', {
  lowercase: true,
  removeStopWords: true
}); // 'hello-world'
```

## API Documentation

### Types and Interfaces

```typescript
enum CaseType {
  CAMEL = 'camel',
  PASCAL = 'pascal',
  SNAKE = 'snake',
  KEBAB = 'kebab'
}

enum HashType {
  MD5 = 'md5',
  SHA256 = 'sha256',
  SHA512 = 'sha512'
}

interface RandomStringOptions {
  numbers?: boolean;
  symbols?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
}

interface SlugifyOptions {
  lowercase?: boolean;
  separator?: string;
  removeStopWords?: boolean;
}
```

### Error Handling

The library provides custom error types for better error handling:

```typescript
try {
  const result = stringUtils.base64Decode('invalid-base64');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Input validation failed:', error.message);
  } else if (error instanceof CryptoError) {
    console.log('Cryptographic operation failed:', error.message);
  }
}
```

## Development

### Setup
```bash
git clone https://github.com/venkatesh261/stringify-pro.git
cd stringify-pro
npm install
```

### Testing
```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Building
```bash
npm run build   # Build library
npm run lint    # Run linter
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Venkat - [admin@nvenkat.dev](mailto:venkat@nvenkat.dev)

## Support

If you find this library helpful, please consider:
- Starring the GitHub repository
- Reporting issues
- Contributing to the codebase
- Sharing with others
