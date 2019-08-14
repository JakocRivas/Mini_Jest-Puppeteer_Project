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
    expect(h1).toBe(signupTitle.h1Text);
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
    await page.waitFor(2000);
    await page.type(commentBoxTimeline, comment);

    await page.waitFor(2000);

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

  it("searches for people", async () => {
    const searchBar = '#doc div[role="search"] input[type="text"].search-input';

    await page.waitForSelector(searchBar);

    await page.click(searchBar);
    const person = "@css";

    await page.type(searchBar, person);
    await page.waitFor(2000);
    // await page.keyboard.press("Enter");
    // const searchIcon =
    //   '#doc div[role="search"] .search-icon button[type="submit"].Icon--search';
    // page.click(searchIcon);

    const searchedPerson =
      '#doc div[role="search"] div[role="listbox"] li span.username';

    await page.waitForSelector(searchedPerson);

    await page.click(searchedPerson);

    // const searchedFor =
    //   '#react-root main[role="main"] div[data-testid="primaryColumn"] section[role="region"] div[data-testid="UserCell"] a[role="link"] span span';

    // await page.waitForSelector(searchedFor);
    // await page.click(searchedFor);

    // await page.waitFor(9000);
  });

  it("should get information of the profile", async () => {
    //user .textContent on this
    const profileName =
      "#page-container .AppContainer .ProfileHeaderCard .ProfileSidebar .ProfileHeaderCard-name";

    //user .textContent on this
    const accountName =
      "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-screenname span";

    //user .textContent on this
    const bio =
      "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-bio";

    //user .innerText on this
    const location =
      "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-location";

    //user .innerText on this
    const personalSite =
      "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-url";

    //user .innerText on this
    const joinDate =
      "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-joinDate";
    const navInformation =
      '#page-outer  .AppContainer .ProfileCanopy-nav div[role="navigation"].ProfileNav span.ProfileNav-value';
    await page.waitForSelector(navInformation);

    let numberOfActions = await page.evaluate(() => {
      const navInformation =
        '#page-outer  .AppContainer .ProfileCanopy-nav div[role="navigation"].ProfileNav span.ProfileNav-value';

      let information = [];
      // get the information of tweets, followers, likes, and the humber of people the user follows.
      const numberOfACtions = document.querySelectorAll(navInformation);
      // get the data in variables
      const tweetNumber = numberOfACtions[0].innerText;
      console.log(tweetNumber);
      const followingNumber = numberOfACtions[1].innerText;
      const followersNumber = numberOfACtions[2].innerText;
      const likesNumber = numberOfACtions[3].innerText;

      //puts the data inside and object
      const tweets = { Tweets: tweetNumber };
      const following = { Following: followingNumber };
      const followers = { Followers: followersNumber };
      const likes = { Likes: likesNumber };

      //push the data to a json
      information.push(tweets);
      information.push(following);
      information.push(followers);
      information.push(likes);

      return information;
    });
    console.log(numberOfActions);
  });
});
