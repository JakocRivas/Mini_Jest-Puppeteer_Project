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
import { DH_CHECK_P_NOT_PRIME } from "constants";
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

//Getting Content

//page.$eval === document.querySelector
//page.$$eval === Array.from(document.querySelectorAll(Selector))

//interacting

//page.click(selector)
//page.tap(selector)
// page.type(selector,text)

//something like this
const lastNameEL = await page.$('[data-testid="lastName"]');
const emaildEL = await page.$('[data-testid="email"]');
const passwordEL = await page.$('[data-testid="password"]');
const submitEL = await page.$('[data-testid="submit"]');

await firstNameEL.tap();

await page.type('[data-testid="firstName"]', user.firstName);

await lastNameEL.tap();

await page.type('[data-testid="lastName"]', user.lastName);

await emaildEL.tap();

await page.type('[data-testid="email"]', user.email);

await passwordEL.tap();

await page.type('[data-testid="password"]', user.password);

await submitEL.tap();

//intercepting requests
page.setRequetsInterception();
interceptedRequest.url.includes("");
interceptedRequest.abort();

//emulating mobile
page.emulate({
  viewport: { options },
  userAgent: string
});

//capturing console msgs
page.on("console");
page.on("pageerror");

//JWTs?
page.setCookie({});

//visual Regression Tests
// page.screenshot(); + differing Library (pixelmatch)

//performance test
//unused CSS
//unused JS
//page weight
await page._clinet.send('performance.enabble')

const perf = await.page.evaluate(_ => ({
    firstPaint:
        performance.loadTimes().firstPaintTime * 1000 -
        performance.timing.navigationStart
}))




//PUPPETEER RECORDER
//chrome extension