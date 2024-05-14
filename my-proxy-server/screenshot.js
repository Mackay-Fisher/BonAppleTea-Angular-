const puppeteer = require('puppeteer');

async function captureScreenshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
}

captureScreenshot('https://bonappletea-fbedf.web.app/');
