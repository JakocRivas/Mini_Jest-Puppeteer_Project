const header = require("../PageObjects/Twitter/PO/LoginTwitter/h1");
const loginFields = require("../PageObjects/Twitter/PO/LoginTwitter/loginForm");
const loginFormButton = require("../PageObjects/Twitter/PO/LoginTwitter/submitButton");
const submitButton = require("../PageObjects/Twitter/PO/LoginTwitter/loginButton");
const commentBox = require("../PageObjects/Twitter/PO/CommentTwitter/commentBox");
const timeline = require("../PageObjects/Twitter/PO/CommentTwitter/timeline");
const post = require("../PageObjects/Twitter/PO/CommentTwitter/post");
const search = require("../PageObjects/Twitter/PO/SearchTwitter/search");
const profile = require("../PageObjects/Twitter/PO/ProfileTwitter/profile");
const common = require("../resources/common");
const LoginPage = require("../PageObjects/Twitter/loginPage");
const HomePage = require("../PageObjects/Twitter/homepage");
const ProfilePage = require("../PageObjects/Twitter/profilePage");

// const testAtrr = (something, attr) => {
//   const wrapper = `[data-test=''${attr}']`;
//   return wrapper;
// };

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    await page.setViewport({ width: 1366, height: 768 });
  });
  beforeEach(async () => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    profilePage = new ProfilePage();
  });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    await loginPage.waitForHeader();
  });

  it("should log in and check if redirects to the timeline", async () => {
    await loginPage.login();

    const timeline = await loginPage.waitForHome();
    await expect(timeline).toBe("Home");
  }, 90000);

  it("should post a message", async () => {
    await homePage.postMessage();
  }, 9000);

  it("should delete message", async () => {
    await homePage.deleteMessage();
  });

  it("searches for people", async () => {
    await profilePage.search();
  });

  it("should get information of the profile", async () => {
    let data = await profilePage.getData();
    console.log(data);
  });

  //takes a screenshot of the element
  xit("should download profile image", async () => {
    await profilePage.sayCheese();
  });
});
