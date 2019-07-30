describe("Google", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
  });

  it('should display "google" text on page', async () => {
    await expect(page).toMatch("google");
  });
});
