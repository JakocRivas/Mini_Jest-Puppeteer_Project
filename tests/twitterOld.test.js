const header = require("../PageObjects/Twitter/LoginTwitter/h1");
const loginFields = require("../PageObjects/Twitter/LoginTwitter/loginForm");
const loginFormButton = require("../PageObjects/Twitter/LoginTwitter/submitButton");
const submitButton = require("../PageObjects/Twitter/LoginTwitter/loginButton");
const commentBox = require("../PageObjects/Twitter/CommentTwitter/commentBox");
const timeline = require("../PageObjects/Twitter/CommentTwitter/timeline");
const post = require("../PageObjects/Twitter/CommentTwitter/post");
const search = require("../PageObjects/Twitter/SearchTwitter/search");
const profile = require("../PageObjects/Twitter/ProfileTwitter/profile");
const credentials = require("../resources/common");

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

  it('should display "See what’s happening in the world right now" text on page', async () => {
    const h1 = await page.$eval(header.h1Selector, text => text.textContent);
    expect(h1).toBe(header.h1Text);
  });

  test("should log in and check if redirects to the timeline", async () => {
    const email = credentials.email;
    const password = credentials.password;

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

    const home = header.home;
    await page.waitForSelector(home);

    const timeline = await page.evaluate(home => {
      return document.querySelector(home).textContent;
    }, home);

    expect(timeline).toBe("Home");
  });

  it("should post a message", async () => {
    const commentBoxTimeline = commentBox.timeline;
    await page.waitForSelector(commentBoxTimeline);
    await page.click(commentBoxTimeline);

    let comment = makeid(5);
    await page.waitFor(2000);
    await page.type(commentBoxTimeline, comment);

    await page.waitFor(2000);

    const sendMessageButton = commentBox.sendMessage;
    await page.waitForSelector(sendMessageButton);

    await page.click(sendMessageButton);

    // await Promise.all([
    //   page.waitForNavigation(),
    //   ,
    //   page.waitForNavigation()
    // ]);

    await page.waitForSelector(timeline.comment);
  });

  it("should delete message", async () => {
    const downArrow = post.downArrow;

    await page.waitForSelector(downArrow);

    await page.click(downArrow);

    const deleteButton = post.deleteButton;

    await page.waitFor(1000);

    await page.waitForSelector(deleteButton);

    await page.click(deleteButton);

    const deleButtonModal = post.deleButtonModal;

    await page.waitForSelector(deleButtonModal);

    await page.click(deleButtonModal);

    await page.waitFor(2000);
  });

  it("searches for people", async () => {
    const searchBar = search.searchBar;

    await page.waitForSelector(searchBar);

    await page.click(searchBar);
    const person = "@css";

    await page.type(searchBar, person);
    await page.waitFor(2000);
    // await page.keyboard.press("Enter");
    // const searchIcon =
    //   '#doc div[role="search"] .search-icon button[type="submit"].Icon--search';
    // page.click(searchIcon);

    const searchedPerson = search.searchedPerson;

    await page.waitForSelector(searchedPerson);

    await page.click(searchedPerson);

    // const searchedFor =
    //   '#react-root main[role="main"] div[data-testid="primaryColumn"] section[role="region"] div[data-testid="UserCell"] a[role="link"] span span';

    // await page.waitForSelector(searchedFor);
    // await page.click(searchedFor);

    // await page.waitFor(9000);
  });

  it("should get information of the profile", async () => {
    //user .innerText on this
    const profileName = profile.name;

    //user .innerText on this
    const accountName = profile.account;

    //user .textContent on this
    const bio = profile.bio;

    //user .innerText on this
    const location = profile.location;

    //user .innerText on this
    const personalSite = profile.personalSiteUrl;

    //user .innerText on this
    const joinDate = profile.joinDate;

    const navInformation = profile.navInformation;

    await page.waitForSelector(navInformation);
    await page.waitForSelector(profileName);
    await page.waitForSelector(bio);
    await page.waitForSelector(location);
    await page.waitForSelector(personalSite);
    await page.waitForSelector(joinDate);

    let numberOfActions = await page.evaluate(navInformation => {
      let information = [];
      // get the information of tweets, followers, likes, and the humber of people the user follows.
      const numberOfACtions = document.querySelectorAll(navInformation);

      // get the data in variables
      const tweetNumber = numberOfACtions[0].innerText;
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

      return JSON.parse(JSON.stringify(information));
    }, navInformation);

    var accountData = await page.evaluate(
      ({ profileName, accountName, bio, location, personalSite, joinDate }) => {
        let information = [];
        // get the information of the name, account name, description, location, site and date the account was made of the searched profile

        // put the data inside variables

        //use .innerText on this
        const name = document.querySelector(profileName).innerText;
        const account = document.querySelector(accountName).innerText;
        const biography = document.querySelector(bio).textContent;
        const localitation = document.querySelector(location).innerText;
        const site = document.querySelector(personalSite).innerText;
        const dateOfCreation = document.querySelector(joinDate).innerText;

        //puts the data inside and object
        const nameText = { name: name };
        const accountText = { account: account };
        const bioText = { bio: biography };
        const localitationText = { localitation: localitation };
        const siteText = { site: site };
        const dateText = { date: dateOfCreation };

        //push the data to a json
        information.push(nameText);
        information.push(accountText);
        information.push(bioText);
        information.push(localitationText);
        information.push(siteText);
        information.push(dateText);

        return JSON.parse(JSON.stringify(information));
      },
      { profileName, accountName, bio, location, personalSite, joinDate }
    );
    console.log(numberOfActions);
    console.log(accountData);
  });

  //takes a screenshot of the element
  it("should download profile image", async () => {
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

    const file = fs.createWriteStream("./img/" + imageName + ".jpg");
    const request = http.get(imgSrc, function(response) {
      response.pipe(file);
    });
  });
});
