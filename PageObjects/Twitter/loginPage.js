const header = require("./PO/LoginTwitter/h1");
const loginFields = require("./PO/LoginTwitter/loginForm");
const loginFormButton = require("./PO/LoginTwitter/submitButton");
const submitButton = require("./PO/LoginTwitter/loginButton");
// const commentBox = require("../PageObjects/Twitter/PO/CommentTwitter/commentBox");
// const timeline = require("../PageObjects/Twitter/PO/CommentTwitter/timeline");
// const post = require("../PageObjects/Twitter/PO/CommentTwitter/post");
// const search = require("../PageObjects/Twitter/PO/SearchTwitter/search");
// const profile = require("../PageObjects/Twitter/PO/ProfileTwitter/profile");
const common = require("../../resources/common");

class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async waitForHeader() {
    const h1 = await page.$eval(header.h1Selector, text => text.textContent);
    expect(h1).toBe(header.h1Text);
    return h1;
  }
  async login() {
    const email = common.email;
    const password = common.password;

    const emailField = loginFields.emailField;
    const passwordField = loginFields.passwordField;

    const loginButton = submitButton.selector;

    const loginFieldbutton = loginFormButton.selector;

    await page.waitForSelector(loginButton);
    await page.click(loginButton);

    await page.waitForSelector(emailField);
    await page.waitForSelector(passwordField);

    await page.type(emailField, email);
    await page.type(passwordField, password);

    await page.waitForSelector(loginFieldbutton);
    await page.click(loginFieldbutton);
  }
  async waitForHome() {
    const home = header.home;
    await page.waitForSelector(home);

    const timeline = await page.evaluate(home => {
      return document.querySelector(home).textContent;
    }, home);

    // expect(timeline).toBe("Home");
    return timeline;
  }
}

module.exports = LoginPage;
