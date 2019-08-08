const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1280, height: 1800 });
//   await page.goto(
//     "https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios"
//   );

//   const checkboxStatus = await page.$eval("#defaultCheck1", input => {
//     return input.checked;
//   });
//   console.log("Checkbox checked status:", checkboxStatus);

//   const radios = await page.$$eval('input[name="exampleRadios"]', inputs => {
//     return inputs.map(input => input.value);
//   });
//   console.log("Radio values:", radios);

//   await page.goto(
//     "https://getbootstrap.com/docs/4.3/components/forms/#select-menu"
//   );

//   const selectOptions = await page.$$eval(
//     ".bd-example > select.custom-select.custom-select-lg.mb-3 > option",
//     options => {
//       return options.map(option => option.value);
//     }
//   );
//   console.log(selectOptions);

//   await browser.close();
// })();
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://news.ycombinator.com/news");
//   const name = await page.$eval(".hnname > a", el => el.innerText);
//   console.log(name);
//   await browser.close();
// })();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.google.com/");
//   const title = await page.title();
//   console.log(title);
//   await browser.close();
// })();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://soundcloud.com/");
//   await page.hover(".playableTile__artwork");
//   await page.screenshot({ path: "hover.png" });
//   await browser.close();
// })();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://trix-editor.org/");
//   await page.focus("trix-editor");
//   await page.keyboard.type("Just adding a title");
//   await page.screenshot({ path: "keyboard.png" });
//   await browser.close();
// })();

// const cookie = {
//   name: "login_email",
//   value: "set_by_cookie@domain.com",
//   domain: ".paypal.com",
//   url: "https://www.paypal.com/",
//   path: "/",
//   httpOnly: true,
//   secure: true
// };

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setCookie(cookie);
//   await page.goto("https://www.paypal.com/signin");
//   await page.screenshot({ path: "paypal_login.png" });
//   await browser.close();
// })();

// const parallel = 5;

// (async () => {
//   puppeteer.launch({ headless: false }).then(async browser => {
//     const promises = [];
//     for (let i = 0; i < parallel; i++) {
//       console.log("Page ID Spawned", i);
//       promises.push(
//         browser.newPage().then(async page => {
//           await page.setViewport({ width: 1280, height: 800 });
//           await page.goto("https://en.wikipedia.org/wiki/" + i);
//           //   await page.screenshot({ path: "wikipedia_" + i + ".png" });
//         })
//       );
//     }
//     await Promise.all(promises);
//     await browser.close();
//   });
// })();

//run on a .test file
// const puppeteer = require("puppeteer");
// let page;
// let browser;
// beforeAll(async () => {
//   browser = await puppeteer.launch();
//   page = await browser.newPage();
//   await page.tracing.start({ path: "trace.json" });
// });

// describe("Walmart shopping cart", () => {
//   test("shows the correct product", async () => {
//     // await page.setViewport({ width: 1280, height: 800 });
//     await page.goto(
//       "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
//       { waitUntil: "networkidle2" }
//     );
//     const productTitle = await page.$eval(
//       "h1.prod-ProductTitle",
//       txt => txt.textContent
//     );
//     expect(productTitle).toBe(
//       "Super Mario Odyssey, Nintendo, Nintendo Switch, 045496590741"
//     );
//   }, 20000);

//   test("adds the product to the cart", async () => {
//     await page.click("button.prod-ProductCTA--primary");
//     await page.waitForSelector(".copy-mini.pos-item-qty");
//     const quantity = await page.$eval(
//       ".copy-mini.pos-item-qty",
//       txt => txt.textContent
//     );
//     expect(quantity).toBe("(1 item)");
//   }, 10000);

//   afterAll(async () => {
//     await page.tracing.stop();
//     await browser.close();
//   });
// });
