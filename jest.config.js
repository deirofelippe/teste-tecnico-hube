/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};
