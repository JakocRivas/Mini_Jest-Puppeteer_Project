import puppeteer from "puppeteer";

//launch browser
let browser = await puppeteer.launch();

//open a tab(page)
let page = await browser.newPage();

//navigate to website url
await page.goto("url_or_localhost");

//do stuff then assert
const html = await page.$eval(".app-title", e => e.innerHTML);
expect(html).toBe("h1 of the page");

//close browser
browser.close();

//soemthing like this
import puppeteer from "puppeteer";
test("h1 loads correctly", async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto("url");

  const html = await page.$eval(".app-title", e => e.innerHTML);

  expect(html).toBe("h1 of the page");

  browser.close();
});

// tips:
// Utilize BeforeAll and afterAll

// Understand async / await

// Utilize enviroment variables

// Utilize headless
