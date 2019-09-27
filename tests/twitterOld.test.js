const LoginPage = require("../PageObjects/Twitter/loginPage"),
  HomePage = require("../PageObjects/Twitter/homepage"),
  ProfilePage = require("../PageObjects/Twitter/profilePage"),
  common = require("../resources/common"),
  { h1Text } = require("../PageObjects/Twitter/PO/LoginTwitter/h1");
//describe
describe("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    // await page.setViewport({ width: 1920, height: 1080 });
    loginPage = new LoginPage();
    homePage = new HomePage();
    profilePage = new ProfilePage();
  });
  it('should display "See what’s happening in the world right now" text on page', async () => {
    const header = await loginPage.waitForHeader();
    //See what’s happening in the world right now
    expect(header).toBe(h1Text);
  });

  //logs in and waits for the timeline to be logged
  it("should log in and check if redirects to the timeline", async () => {
    await loginPage.login(common.email, common.password);

    const timeline = await loginPage.waitForHome();
    expect(timeline).toBe("Home");
  }, 8000);

  //post a messages on the timeline
  xit("should post a message", async () => {
    await homePage.postMessage();
  }, 8000);

  //deletes message on the timeline
  xit("should delete message", async () => {
    await homePage.deleteMessage();
  });

  //search user on the search bar and enters to his profile
  xit("searches for people", async () => {
    await profilePage.search();
  });

  //scrap the public information of a profile
  xit("should get information of the profile", async () => {
    let data = await profilePage.getData();
    console.log(data);
  });

  //takes a screenshot of the element
  xit("should download profile image", async () => {
    await profilePage.sayCheese();
  });

  //logs out from twitter dot com
  xit("should log out", async () => {
    await page.waitFor(2000);
    await loginPage.logout();
    await page.waitFor(2000);
    await loginPage.waitForHeader();
  }, 80000);

  //logs in to fail
  xit("should fail to log in", async () => {
    await loginPage.login(common.wrongEmail, common.wrongPassword);
    let logError = await loginPage.loginError();
    await expect(logError).toBe(
      "The username and password you entered did not match our records. Please double-check and try again."
    );
  });
});
