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
    // const h1 = await page.$eval(header.h1Selector, text => text.textContent);
    // console.log(h1);
    // expect(h1).toBe(header.h1Text);
    // let loginPage = new LoginPage();
    // let nrp = await loginPage.waitForHeader();
    await loginPage.waitForHeader();
    // console.log(nrp);

    // await LoginPage.waitForHeader;
  });

  it("should log in and check if redirects to the timeline", async () => {
    // loginPage = new LoginPage();
    await loginPage.login();

    const timeline = await loginPage.waitForHome();
    await expect(timeline).toBe("Home");

    // const email = common.email;
    // const password = common.password;

    // const emailField = loginFields.emailField;
    // const passwordField = loginFields.passwordField;

    // const loginButton = submitButton.selector;

    // const loginFieldbutton = loginFormButton.selector;

    // await page.waitForSelector(loginButton);
    // await page.click(loginButton);

    // await page.waitForSelector(emailField);
    // await page.waitForSelector(passwordField);

    // await page.type(emailField, email);
    // await page.type(passwordField, password);

    // await page.waitForSelector(loginFieldbutton);
    // await page.click(loginFieldbutton);

    // const home = header.home;
    // await page.waitForSelector(home);

    // const timeline = await page.evaluate(home => {
    //   return document.querySelector(home).textContent;
    // }, home);

    // expect(timeline).toBe("Home");
  });

  it("should post a message", async () => {
    await homePage.postMessage();

    // const commentBoxTimeline = commentBox.timeline;
    // await page.waitForSelector(commentBoxTimeline);
    // await page.click(commentBoxTimeline);

    // let comment = makeid(5);
    // await page.waitFor(3000);
    // await page.type(commentBoxTimeline, comment);

    // await page.waitFor(3000);

    // const sendMessageButton = commentBox.sendMessage;
    // await page.waitForSelector(sendMessageButton);

    // await page.click(sendMessageButton);

    // await page.waitForSelector(timeline.comment);
  }, 9000);

  it("should delete message", async () => {
    await homePage.deleteMessage();

    // const downArrow = post.downArrow;

    // await page.waitForSelector(downArrow);

    // await page.click(downArrow);

    // const deleteButton = post.deleteButton;

    // await page.waitFor(1000);

    // await page.waitForSelector(deleteButton);

    // await page.click(deleteButton);

    // const deleButtonModal = post.deleButtonModal;

    // await page.waitForSelector(deleButtonModal, { visible: true });

    // await page.click(deleButtonModal);

    // await page.waitFor(2000);
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
    //download
    const jpg = "img.ProfileAvatar-image";
    await page.waitForSelector(jpg);
    const imgSrc = await page.$eval(jpg, img => img.getAttribute("src"));

    // await img.screenshot({
    //   path: "profile-img-screenshot.jpg",
    //   omitBackground: true
    // });

    const imageName = makeid(5);

    const http = require("https");
    const fs = require("fs");

    const file = fs.createWriteStream(common.imgPath + imageName + ".jpg");
    const request = http.get(imgSrc, function(response) {
      response.pipe(file);
    });
  });
});
