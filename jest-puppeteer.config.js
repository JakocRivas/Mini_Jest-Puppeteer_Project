module.exports = {
  launch: {
    headless: false,
    slowMo: 250
  },
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupTestFrameworkScriptFile: "expect-puppeteer"
};
