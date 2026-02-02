/**
 * Mobile Theme Test - iPhone viewport
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { getCredentials } = require('./test-config');

const BASE_URL = 'https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte';
const THEME_BASE_URL = 'https://members.phibetasigma1914.org/iMISDEV/App_Themes/PBS-NEOPHYTE-THEME-MODERN';
const LOCAL_CSS_PATH = path.join(__dirname, 'package', 'pbs-neophyte-theme.css');
const SCREENSHOT_DIR = path.join(__dirname, 'testingScreenshots');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runMobileTest() {
    const { username, password } = getCredentials();
    console.log('Mobile Theme Test - iPhone viewport (375x812)');
    console.log('User:', username);

    // Load local CSS
    let localCss = fs.readFileSync(LOCAL_CSS_PATH, 'utf8');
    localCss = localCss.replace(/url\("images\//g, 'url("' + THEME_BASE_URL + '/images/');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const page = await context.newPage();

    try {
        // 1. Login page
        console.log('Loading login page...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await sleep(1000);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-01-login-before.png'), fullPage: true });

        // Inject CSS
        await page.addStyleTag({ content: localCss });
        await sleep(500);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-02-login-after.png'), fullPage: true });
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
                await page.addStyleTag({ content: localCss });
                await sleep(500);
            }
        }

        // 3. Home page
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-03-home.png'), fullPage: true });
        console.log('Home page captured');

        // 4. Navigate to a couple pages
        const navLinks = await page.$$eval('.RadMenu a.rmLink, .RadMenu a.rmRootLink', links => {
            return links.slice(0, 4).map(link => ({
                text: link.textContent.trim(),
                href: link.href
            })).filter(l => l.text && l.text.length > 0);
        });

        let pageNum = 4;
        for (const navItem of navLinks) {
            if (navItem.text === 'Home') continue;
            try {
                console.log('Navigating to:', navItem.text);
                await page.goto(navItem.href, { waitUntil: 'networkidle', timeout: 30000 });
                await sleep(1500);
                await page.addStyleTag({ content: localCss });
                await sleep(500);

                const safeName = navItem.text.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                const pageNumStr = pageNum < 10 ? '0' + pageNum : '' + pageNum;
                await page.screenshot({
                    path: path.join(SCREENSHOT_DIR, 'mobile-' + pageNumStr + '-' + safeName + '.png'),
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
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-error.png'), fullPage: true });
    } finally {
        await browser.close();
    }
}

runMobileTest().catch(console.error);
