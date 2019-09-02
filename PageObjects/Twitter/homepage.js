const commentBox = require("./PO/CommentTwitter/commentBox");
const timeline = require("./PO/CommentTwitter/timeline");
const post = require("./PO/CommentTwitter/post");
let makeid = require("../../resources/createComment");

class HomePage {
  constructor() {
    this.commentBox = commentBox;
    this.timeline = timeline;
    this.post = post;
    this.makeComment = makeid(5);
  }
  async postMessage() {
    const commentBoxTimeline = this.commentBox.timeline;

    await page.waitForSelector(commentBoxTimeline);
    await page.click(commentBoxTimeline);

    let comment = this.makeComment;
    await page.waitFor(3000);
    await page.type(commentBoxTimeline, comment);

    await page.waitFor(3000);

    const sendMessageButton = this.commentBox.sendMessage;
    await page.waitForSelector(sendMessageButton);

    await page.click(sendMessageButton);

    await page.waitForSelector(this.timeline.comment);
  }

  async deleteMessage() {
    const downArrow = this.post.downArrow;

    await page.waitForSelector(downArrow);

    await page.click(downArrow);

    const deleteButton = this.post.deleteButton;

    await page.waitFor(1000);

    await page.waitForSelector(deleteButton);

    await page.click(deleteButton);

    const deleButtonModal = this.post.deleButtonModal;

    await page.waitForSelector(deleButtonModal, { visible: true });

    await page.click(deleButtonModal);

    await page.waitFor(2000);
  }
}

module.exports = HomePage;
