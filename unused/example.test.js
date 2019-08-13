// import {} = require('./patht')
// test();

// test("nothing", () => {
//   console.log("hola");
// });

// {
//   describe("Google", () => {
//     beforeAll(async () => {
//       await page.goto("https://www.google.com/");
//     });

//     it('should display "google" text on page', async () => {
//       await expect(page).toMatch("google");
//     });

//     it("takes photo", async () => {
//       // const browser = await puppeteer.launch({headless: false});
//       // const page = await browser.newPage();
//       // await page.goto('https://google.com');
//       await page.setViewport({ width: 1000, height: 500 });
//       await page.screenshot({ path: "google.png" });
//     });
//   });
// }

// describe("outer", () => {
//   console.log("describe outer-a");

//   describe("describe inner 1", () => {
//     console.log("describe inner 1");
//     test("test 1", () => {
//       console.log("test for describe inner 1");
//       expect(true).toEqual(true);
//     });
//   });

//   console.log("describe outer-b");

//   test("test 1", () => {
//     console.log("test for describe outer");
//     expect(true).toEqual(true);
//   });

//   describe("describe inner 2", () => {
//     console.log("describe inner 2");
//     test("test for describe inner 2", () => {
//       console.log("test for describe inner 2");
//       expect(false).toEqual(false);
//     });
//   });

//   console.log("describe outer-c");
// });

// describe("outer", () => {
//   it("lililili", () => {
//     console.log("lula");
//   });
// });
