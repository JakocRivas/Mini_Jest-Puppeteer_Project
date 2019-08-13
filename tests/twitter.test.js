const signupTitle = require("../PageObjects/Twitter/LoginTwitter/h1");

const testAtrr = (something, attr) => {
  const wrapper = `[data-test=''${attr}']`;
  return wrapper;
};

describe("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    await page.setViewport({ width: 1366, height: 768 });
  });

  // beforeEach(async () => {
  //   await page.waitFor(8000);
  // });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    const h1 = await page.$eval(
      signupTitle.h1Selector,
      text => text.textContent
    );
    // const text = await page.evaluate(() => document.body.textContent);
    await expect(h1).toBe(signupTitle.h1Text);
  });

  test("should log in and check if redirects to the timeline", async () => {
    const email = "testyboiint@gmail.com";
    const password = "welcome1234";

    const emailField = ".js-username-field.email-input.js-initial-focus";
    const passwordField = ".js-password-field";

    const submitButton =
      ".submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium";

    const logInButton =
      "#doc > div > div.StaticLoggedOutHomePage-content > div.StaticLoggedOutHomePage-cell.StaticLoggedOutHomePage-utilityBlock > div.StaticLoggedOutHomePage-signupBlock > div.StaticLoggedOutHomePage-noSignupForm > div > a.js-nav.EdgeButton.EdgeButton--medium.EdgeButton--secondary.StaticLoggedOutHomePage-buttonLogin";

    await page.waitForSelector(logInButton);
    await page.click(logInButton);

    await page.waitForSelector(emailField);
    await page.waitForSelector(passwordField);

    await page.type(emailField, email);
    await page.type(passwordField, password);

    await page.waitForSelector(submitButton);
    await page.click(submitButton);

    const home =
      "#react-root > div > div > div > main > div > div.css-1dbjc4n.r-aqfbo4.r-1niwhzg.r-16y2uox > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div > div.css-1dbjc4n.r-aqfbo4.r-14lw9ot.r-my5ep6.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q > div.css-1dbjc4n.r-1loqt21.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > h2 > span";
    await page.waitForSelector(home);

    const timeline = await page.evaluate(home => {
      return document.querySelector(home).textContent;
    }, home);

    expect(timeline).toBe("Home");
  });

  it("should post a message", async () => {
    const commentBoxTimeline =
      '#react-root main[role=main] a[aria-label="Compose new Tweet"] div[dir=auto] span';
    await page.waitForSelector(commentBoxTimeline);
    await page.click(commentBoxTimeline);

    const commentModal = "#react-root div[aria-labelledby=modal-header]";
    await page.waitForSelector(commentModal);

    const commentBoxModal =
      "#react-root div[aria-labelledby=modal-header] .public-DraftStyleDefault-block";
    await page.waitForSelector(commentBoxModal);
    await page.click(commentBoxModal);
    let comment = "a post";
    await page.type("div.DraftEditor-root", comment);

    const sendMessageButton = "#react-root div[data-testid=tweetButton]";
    await page.waitForSelector(sendMessageButton);
    // await page.click(sendMessageButton);
    // await page.waitFor(1000);

    await Promise.all([
      page.waitForNavigation(),
      await page.click(sendMessageButton),
      page.waitForNavigation()
    ]);

    await page.waitForSelector(
      '#react-root main[role=main] div[data-testid="primaryColumn"] section[role] article div[lang=en] span'
    );
  });

  test("should delete message", async () => {
    // await page.waitForSelector("div[data-testid=tweet] div[data-testid=caret]");
    // await page.click("div[data-testid=tweet] div[data-testid=caret]");
    // jest.setTimeout(50000);

    const downArrow = "div[data-testid=tweet] div[data-testid=caret]";

    await page.waitForSelector(downArrow);

    await page.click(downArrow);

    const deleteButton = 'div[role="menu"] div[role="button"]';

    await page.waitFor(1000);

    await page.waitForSelector(deleteButton);

    await page.click(deleteButton);

    const deleButtonModal = 'div[data-testid="confirmationSheetConfirm"]';

    await page.waitForSelector(deleButtonModal);

    await page.click(deleButtonModal);

    await page.waitFor(2000);

    // await page.evaluate(
    //   deleteButton => document.querySelector(deleteButton).click(),
    //   deleteButton
    // );
    // const deleteButton = "#react-root  div[role=menu] div[role=button] span";
    // const downArrowMenu = "#react-root  div[role=menu]";
    // await page.waitFor(10000);
    // await page.waitForSelector(downArrowMenu);
    // await page.click(deleteButton);
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
