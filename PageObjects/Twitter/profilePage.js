// const header = require("../PageObjects/Twitter/PO/LoginTwitter/h1");
// const loginFields = require("../PageObjects/Twitter/PO/LoginTwitter/loginForm");
// const loginFormButton = require("../PageObjects/Twitter/PO/LoginTwitter/submitButton");
// const submitButton = require("../PageObjects/Twitter/PO/LoginTwitter/loginButton");
// const commentBox = require("../PageObjects/Twitter/PO/CommentTwitter/commentBox");
// const timeline = require("../PageObjects/Twitter/PO/CommentTwitter/timeline");
// const post = require("../PageObjects/Twitter/PO/CommentTwitter/post");
const search = require("./PO/SearchTwitter/search");
const profile = require("./PO/ProfileTwitter/profile");
const common = require("../../resources/common");

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

class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async search() {
    const searchBar = search.searchBar;

    await page.waitForSelector(searchBar);

    await page.click(searchBar);
    const person = common.searchTwitter;

    await page.type(searchBar, person);
    await page.waitFor(2000);

    const searchedPerson = search.searchedPerson;

    await page.waitForSelector(searchedPerson);

    await page.click(searchedPerson);

    // await page.waitFor(9000);
  }
  async getData() {
    let data = [];
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
    data.push(numberOfActions);

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
    data.push(accountData);

    return data;
  }
  async sayCheese() {
    //download
    const jpg = profile.avatar;
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
  }
}

module.exports = ProfilePage;
