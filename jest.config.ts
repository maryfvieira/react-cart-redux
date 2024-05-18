import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // ...
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/error/(.*)$': '<rootDir>/src/error/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ["./jest.pre-setup.ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)


