import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  verbose: true,
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: [],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.spec.(t|j)s', '!**/*-spec.(t|j)s'],
  coverageDirectory: './coverage',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src/apps/', '<rootDir>/src/libs/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: process.cwd() }),
    '^@app/common(|/.*)$': '<rootDir>/src/libs/common/src/$1',
  },
};

export default async (): Promise<Config> => {
  return config;
};

// export default config;
