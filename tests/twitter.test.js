describe("Basic", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
  });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    const h1 = await page.$eval(
      "#doc > div > div.StaticLoggedOutHomePage-content > div.StaticLoggedOutHomePage-cell.StaticLoggedOutHomePage-utilityBlock > div.StaticLoggedOutHomePage-signupBlock > h1",
      text => text.textContent
    );
    // const text = await page.evaluate(() => document.body.textContent);
    expect(h1).toBe("See what’s happening in the world right now");
  });
});

// describe("Twitter", () => {
//   beforeAll(async () => {
//     await page.goto("https://twitter.com/");
//   });

//   it('should display "twitter" text on page', async () => {
//     await expect(page).toMatch("twitter");
//   });
// });

// it("should open a new page", async () => {
//   let page = await browser.newPage();
//   await page.goto("https://google.com");
// });

// it("should open a new page", async () => {
//   // const page = await browser.newPage();
//   await page.goto("https://google.com");
// });

// it("should fill an input", async () => {
//   await page.waitForSelector(".gLFyf");
//   await page.type(".gLFyf", "Hello");
// });
