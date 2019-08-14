module.exports = {
  launch: {
    headless: true,
    // slowMo: 250,
    args: ["--lang=en-US,bn"]
  },
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupTestFrameworkScriptFile: "expect-puppeteer"
};
