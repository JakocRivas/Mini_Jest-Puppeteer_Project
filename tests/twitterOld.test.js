const LoginPage = require("../PageObjects/Twitter/loginPage");
const HomePage = require("../PageObjects/Twitter/homepage");
const ProfilePage = require("../PageObjects/Twitter/profilePage");
const common = require("../resources/common");

// const testAtrr = (something, attr) => {
//   const wrapper = `[data-test=''${attr}']`;
//   return wrapper;
// };

describe("Twitter", () => {
  beforeAll(async () => {
    await page.goto("https://twitter.com/");
    await page.setViewport({ width: 1366, height: 768 });
  });
  beforeAll(async () => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    profilePage = new ProfilePage();
  });

  it('should display "See what’s happening in the world right now" text on page', async () => {
    await loginPage.waitForHeader();
  });

  xit("should log in and check if redirects to the timeline", async () => {
    await loginPage.login(common.email, common.password);

    const timeline = await loginPage.waitForHome();
    await expect(timeline).toBe("Home");
  }, 90000);

  xit("should post a message", async () => {
    await homePage.postMessage();
  }, 9000);

  xit("should delete message", async () => {
    await homePage.deleteMessage();
  });

  xit("searches for people", async () => {
    await profilePage.search();
  });

  xit("should get information of the profile", async () => {
    let data = await profilePage.getData();
    console.log(data);
  });

  //takes a screenshot of the element
  xit("should download profile image", async () => {
    await profilePage.sayCheese();
  });

  xit("should log out", async () => {
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
