module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "text"],
  projects: [
    {
      displayName: "test",
      preset: "ts-jest",
      collectCoverage: true,
      coverageReporters: ["json", "text"],
      testPathIgnorePatterns: ["/node_modules/", "/dist/"]
    },
    {
      preset: "jest-runner-prettier",
      displayName: "lint:prettier",
      testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/reports/",
        "/coverage/"
      ]
    },
    {
      runner: "eslint",
      displayName: "lint:eslint",
      moduleFileExtensions: ["js", "tsx"],
      testMatch: ["**/*.js", "**/*.tsx"],
      testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/reports/",
        "/coverage/"
      ]
    }
  ]
};
