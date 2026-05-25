import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/app-gateway/jest.config.ts',
    '<rootDir>/audit-service/jest.config.ts',
    '<rootDir>/orders-service/jest.config.ts',
  ],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  detectOpenHandles: true,
};

export default config;
