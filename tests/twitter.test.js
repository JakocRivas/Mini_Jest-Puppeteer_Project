// describe("Twitter", () => {
//   beforeAll(async () => {
//     await page.goto("https://twitter.com/");
//   });

//   test('should display "twitter" text on page', async () => {
//     await expect(page).toMatch("twitter");
//   });
// });

// it("should open a new page", async () => {
//   let page = await browser.newPage();
//   await page.goto("https://google.com");
// });

it("should open a new page", async () => {
  // const page = await browser.newPage();
  await page.goto("https://google.com");
});

it("should fill an input", async () => {
  await page.waitForSelector(".gLFyf");
  await page.type(".gLFyf", "Hello");
});
