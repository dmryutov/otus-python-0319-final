/* eslint-disable */
module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^handsontable': 'handsontable',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: [
        '<rootDir>/tests/**.(js|jsx|ts|tsx)',
    ],
    testURL: 'http://localhost/',
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**.(js|jsx|ts|tsx|vue)',
        '!<rootDir>/src/main.js',
        '!<rootDir>/src/components/toast/**',
    ],
    coverageReporters: ['html', 'text-summary'],
};
