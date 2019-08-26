// const header = require("../PageObjects/Twitter/PO/LoginTwitter/h1");
// const loginFields = require("../PageObjects/Twitter/PO/LoginTwitter/loginForm");
// const loginFormButton = require("../PageObjects/Twitter/PO/LoginTwitter/submitButton");
// const submitButton = require("../PageObjects/Twitter/PO/LoginTwitter/loginButton");
const commentBox = require("./PO/CommentTwitter/commentBox");
const timeline = require("./PO/CommentTwitter/timeline");
const post = require("./PO/CommentTwitter/post");
// const search = require("../PageObjects/Twitter/PO/SearchTwitter/search");
// const profile = require("../PageObjects/Twitter/PO/ProfileTwitter/profile");
// const common = require("../resources/common");
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

class HomePage {
  constructor(page) {
    this.page = page;
  }
  async postMessage() {
    const commentBoxTimeline = commentBox.timeline;

    await page.waitForSelector(commentBoxTimeline);
    await page.click(commentBoxTimeline);

    let comment = makeid(5);
    await page.waitFor(3000);
    await page.type(commentBoxTimeline, comment);

    await page.waitFor(3000);

    const sendMessageButton = commentBox.sendMessage;
    await page.waitForSelector(sendMessageButton);

    await page.click(sendMessageButton);

    await page.waitForSelector(timeline.comment);
  }

  async deleteMessage() {
    const downArrow = post.downArrow;

    await page.waitForSelector(downArrow);

    await page.click(downArrow);

    const deleteButton = post.deleteButton;

    await page.waitFor(1000);

    await page.waitForSelector(deleteButton);

    await page.click(deleteButton);

    const deleButtonModal = post.deleButtonModal;

    await page.waitForSelector(deleButtonModal, { visible: true });

    await page.click(deleButtonModal);

    await page.waitFor(2000);
  }
}

module.exports = HomePage;
