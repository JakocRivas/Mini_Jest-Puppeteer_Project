const LoginPage = require("../PageObjects/Twitter/loginPage"),
  HomePage = require("../PageObjects/Twitter/homepage"),
  ProfilePage = require("../PageObjects/Twitter/profilePage"),
  common = require("../resources/common"),
  { h1Text } = require("../PageObjects/Twitter/PO/LoginTwitter/h1");

// const testAtrr = (something, attr) => {
//   const wrapper = `[data-test=''${attr}']`;
//   return wrapper;
// };

describe.only("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    await page.setViewport({ width: 1920, height: 1080 });
  });
  beforeAll(async () => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    profilePage = new ProfilePage();
  });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    const header = await loginPage.waitForHeader();
    expect(header).toBe(h1Text);
  });

  it("should log in and check if redirects to the timeline", async () => {
    await loginPage.login(common.email, common.password);

    const timeline = await loginPage.waitForHome();
    expect(timeline).toBe("Home");
  }, 8000);

  it("should post a message", async () => {
    await homePage.postMessage();
  }, 8000);

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
  it("should download profile image", async () => {
    await profilePage.sayCheese();
  });

  it("should log out", async () => {
    await page.waitFor(2000);
    await loginPage.logout();
    await page.waitFor(2000);
    await loginPage.waitForHeader();
  }, 80000);

  it("should fail to log in", async () => {
    await loginPage.login(common.wrongEmail, common.wrongPassword);
    let logError = await loginPage.loginError();
    await expect(logError).toBe(
      "The username and password you entered did not match our records. Please double-check and try again."
    );
  });
});
