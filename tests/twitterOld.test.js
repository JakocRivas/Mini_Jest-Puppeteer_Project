const signupTitle = require("../PageObjects/Twitter/LoginTwitter/h1");

// const testAtrr = (something, attr) => {
//   const wrapper = `[data-test=''${attr}']`;
//   return wrapper;
// };

describe("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    await page.setViewport({ width: 1366, height: 768 });
  });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    const h1 = await page.$eval(
      signupTitle.h1Selector,
      text => text.textContent
    );
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

    const home = '#doc div.global-nav div[role="navigation"] li.home span.text';
    await page.waitForSelector(home);

    const timeline = await page.evaluate(home => {
      return document.querySelector(home).textContent;
    }, home);

    expect(timeline).toBe("Home");
  });

  it("should post a message", async () => {
    const commentBoxTimeline =
      '#doc div[role="main"] div.timeline-tweet-box div.tweet-content div[role="textbox"]';
    await page.waitForSelector(commentBoxTimeline);
    await page.click(commentBoxTimeline);

    // const commentModal = "#react-root div[aria-labelledby=modal-header]";
    // await page.waitForSelector(commentModal);

    // const commentBoxModal =
    //   "#react-root div[aria-labelledby=modal-header] .public-DraftStyleDefault-block";
    // await page.waitForSelector(commentBoxModal);
    // await page.click(commentBoxModal);

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    makeid(5);
    let comment = makeid(5);
    await page.type(commentBoxTimeline, comment);

    page.waitFor(1000);

    const sendMessageButton =
      '#doc div[role="main"] div.timeline-tweet-box button.tweet-action';
    await page.waitForSelector(sendMessageButton);

    await page.click(sendMessageButton);

    // await Promise.all([
    //   page.waitForNavigation(),
    //   ,
    //   page.waitForNavigation()
    // ]);

    await page.waitForSelector(
      '#doc div[role="main"] .stream-container #stream-items-id li[data-item-type="tweet"]'
    );
  });

  it("should delete message", async () => {
    const downArrow =
      '#doc div[role="main"] .stream-container #stream-items-id li[data-item-type="tweet"] div.stream-item-header .dropdown';

    await page.waitForSelector(downArrow);

    await page.click(downArrow);

    const deleteButton =
      '#doc div[role="main"] .stream-container #stream-items-id li[data-item-type="tweet"] div.stream-item-header .dropdown  ul[role="menu"] .js-actionDelete button';

    await page.waitFor(1000);

    await page.waitForSelector(deleteButton);

    await page.click(deleteButton);

    const deleButtonModal =
      "#delete-tweet-dialog .modal-footer button.delete-action";

    await page.waitForSelector(deleButtonModal);

    await page.click(deleButtonModal);

    await page.waitFor(2000);
  });

  xit("searches for people", async () => {
    const searchBar =
      '#react-root main[role="main"] form[role="search"] input[data-testid="SearchBox_Search_Input"]';

    await page.waitForSelector(searchBar);

    await page.click(searchBar);
    const person = "@css";

    await page.type(searchBar, person);
    await page.keyboard.press("Enter");

    await page.waitFor(5000);

    const searchedFor =
      '#react-root main[role="main"] div[data-testid="primaryColumn"] section[role="region"] div[data-testid="UserCell"] a[role="link"] span span';

    // await page.waitForSelector(searchedFor);
    // await page.click(searchedFor);

    await page.waitFor(10000);
  });
});
