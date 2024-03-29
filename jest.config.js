const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./setupTests.ts"],
  testEnvironmentOptions: {
    url: "http://localhost:3000",
  },
};

module.exports = createJestConfig(customJestConfig);
