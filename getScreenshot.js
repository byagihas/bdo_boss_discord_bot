'use strict';

const playwright = require('playwright');

const getBossScreenshot = async (url) => {
    const browser = await playwright['webkit'].launch();
    const context = await browser.newContext({
      viewport: { width: 500, height: 800 }
    });
    const page = await context.newPage();
    await page.goto(url);
    await page.screenshot({ path: __dirname + `/screenshots/testscreenshot.png` });
    await browser.close();
};

module.exports = getBossScreenshot;