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
      runner: "prettier",
      displayName: "lint:prettier",
      moduleFileExtensions: ["js", "tsx", "json", "md"],
      testMatch: ["**/*.js", "**/*.tsx", "**/*.json", "**/*.md"],
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
