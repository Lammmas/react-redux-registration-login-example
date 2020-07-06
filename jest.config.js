module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "http://localhost:8080/"
    },
    testMatch: [
        "**/test/*.test.js"
    ],
    "setupFiles": [
        "<rootDir>/jest.init.js"
       ],
    verbose: true
}