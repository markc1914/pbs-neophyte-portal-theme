/**
 * Production Comparison Test - No CSS injection
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { getCredentials } = require('./test-config');

const PROD_URL = 'https://members.phibetasigma1914.org/iMIS15/PBSNeophyte';
const SCREENSHOT_DIR = path.join(__dirname, 'testingScreenshots');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runProdTest() {
    const { username, password } = getCredentials();
    console.log('Production Comparison Test');
    console.log('User:', username);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
    const page = await context.newPage();

    try {
        // 1. Login page
        console.log('Loading production login page...');
        await page.goto(PROD_URL, { waitUntil: 'networkidle' });
        await sleep(1000);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod-01-login.png'), fullPage: true });
        console.log('Login page captured');

        // 2. Login
        console.log('Logging in...');
        const usernameField = await page.$('input[id*="signInUserName"], input[id*="UserName"]');
        const passwordField = await page.$('input[type="password"]');

        if (usernameField && passwordField) {
            await usernameField.fill(username);
            await passwordField.fill(password);
            const submitBtn = await page.$('input[type="submit"], .TextButton');
            if (submitBtn) {
                await submitBtn.click();
                await sleep(5000);
            }
        }

        // 3. Home page
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod-02-home.png'), fullPage: true });
        console.log('Home page captured');

        // 4. Navigate to ALL pages
        const navLinks = await page.$$eval('.RadMenu a.rmLink, .RadMenu a.rmRootLink', links => {
            return links.map(link => ({
                text: link.textContent.trim(),
                href: link.href
            })).filter(l => l.text && l.text.length > 0 && l.href.includes('phibetasigma1914.org'));
        });

        let pageNum = 3;
        for (const navItem of navLinks) {
            if (navItem.text === 'Home') continue;
            try {
                console.log('Navigating to:', navItem.text);
                await page.goto(navItem.href, { waitUntil: 'networkidle', timeout: 30000 });
                await sleep(1500);

                const safeName = navItem.text.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                const pageNumStr = pageNum < 10 ? '0' + pageNum : '' + pageNum;
                await page.screenshot({
                    path: path.join(SCREENSHOT_DIR, 'prod-' + pageNumStr + '-' + safeName + '.png'),
                    fullPage: true
                });
                pageNum++;
            } catch (e) {
                console.log('Error on', navItem.text + ':', e.message);
            }
        }

        console.log('Done -', (pageNum - 1), 'screenshots taken');

    } catch (error) {
        console.error('Error:', error.message);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod-error.png'), fullPage: true });
    } finally {
        await browser.close();
    }
}

runProdTest().catch(console.error);
