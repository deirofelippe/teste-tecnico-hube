module.exports = {
  clearMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  collectCoverageFrom: [
    './src/services/**',
    './src/validators/**',
    './src/repositories/**'
  ],
  coverageThreshold: {
    global: {
      lines: 80
    }
  }
};
