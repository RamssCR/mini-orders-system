import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';
import path from 'path';

const tsconfigPath = path.resolve('audit-service', 'tsconfig.json');
const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
const { compilerOptions } = JSON.parse(tsconfigContent);

const config: Config = {
  displayName: 'audit-service',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage/app-gateway',
  testEnvironment: 'node',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions?.paths || {}, {
    prefix: '<rootDir>/',
  }),
};

export default config;
