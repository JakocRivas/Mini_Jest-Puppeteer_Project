const LoginPage = require("../PageObjects/Twitter/loginPage");
const HomePage = require("../PageObjects/Twitter/homepage");
const ProfilePage = require("../PageObjects/Twitter/profilePage");

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
  it("should download profile image", async () => {
    await profilePage.sayCheese();
  });
});
