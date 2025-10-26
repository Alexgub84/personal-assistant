# Personal Assistant

A TypeScript-based personal assistant built with LangChain and OpenAI, featuring modular architecture and comprehensive unit testing.

## Description

This project implements a personal assistant using LangChain for AI orchestration and OpenAI's GPT models for natural language processing. The assistant is designed with a clean, modular architecture that separates concerns and enables easy testing and extension.

## Tech Stack

- **Language**: TypeScript (strict mode)
- **AI Framework**: LangChain v0.3.58
- **AI Provider**: OpenAI GPT-4o
- **Testing**: Jest with ts-jest
- **Environment**: Node.js with dotenv
- **Build**: TypeScript compiler

## Project Structure

```
personal-asistant/
├── src/
│   └── index.ts              # Main application logic
├── tests/
│   └── index.test.ts          # Unit tests
├── dist/                      # Compiled JavaScript output
├── .cursorrules               # Development rules
├── jest.config.js             # Jest configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Setup

### Prerequisites
- Node.js (v18 or higher)
- npm
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Development

- **Run in development mode**: `npm run dev`
- **Build**: `npm run build`
- **Run compiled code**: `npm start`
- **Run tests**: `npm test`
- **Run tests in watch mode**: `npm run test:watch`
- **Run tests with coverage**: `npm run test:coverage`

## Deployment

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Environment Variables
Ensure the following environment variables are set in production:
- `OPENAI_API_KEY`: Your OpenAI API key

## Status

✅ **Core Features**
- OpenAI GPT-4o integration
- Modular function architecture
- Comprehensive unit testing
- TypeScript strict mode
- Environment variable management

✅ **Testing**
- 7 unit tests covering all exported functions
- Mocked external dependencies
- 100% test coverage for core logic

✅ **Code Quality**
- TypeScript strict configuration
- ESLint-ready structure
- Modular, testable functions
- Proper error handling

## Architecture

The application follows a modular design pattern:

- **`createChatModel()`**: Creates configured OpenAI model instances
- **`createHumanMessage()`**: Creates human messages for the AI
- **`processMessage()`**: Handles message processing through the model
- **`main()`**: Orchestrates the application flow

All functions are pure and testable, with external dependencies properly mocked in tests.
