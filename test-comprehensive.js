/**
 * Comprehensive Theme Test Script
 * Tests: Chrome, Safari (WebKit), Desktop & Mobile viewports, All Nav Pages
 */
const { chromium, webkit } = require('playwright');
const path = require('path');
const fs = require('fs');
const { getCredentials } = require('./test-config');

const BASE_URL = 'https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte';
const THEME_BASE_URL = 'https://members.phibetasigma1914.org/iMISDEV/App_Themes/PBS-NEOPHYTE-THEME-MODERN';
const LOCAL_CSS_PATH = path.join(__dirname, 'package', 'pbs-neophyte-theme.css');
const SCREENSHOT_DIR = path.join(__dirname, 'testingScreenshots');

// Viewports to test
const VIEWPORTS = {
    desktop: { width: 1400, height: 900 },
    mobile: { width: 375, height: 812 }  // iPhone X
};

// Browsers to test
const BROWSERS = {
    chrome: chromium,
    safari: webkit
};

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runTest(browserName, browserType, viewportName, viewport) {
    const { username, password } = getCredentials();
    const prefix = browserName + '-' + viewportName;

    console.log('\n=== Testing: ' + browserName + ' @ ' + viewportName + ' (' + viewport.width + 'x' + viewport.height + ') ===');

    // Load local CSS
    let localCss = fs.readFileSync(LOCAL_CSS_PATH, 'utf8');
    localCss = localCss.replace(/url\("images\//g, 'url("' + THEME_BASE_URL + '/images/');

    const browser = await browserType.launch({ headless: true });
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    try {
        // 1. Test Login Page
        console.log('  [' + prefix + '] Loading login page...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await sleep(1000);

        // Screenshot before CSS
        await page.screenshot({
            path: path.join(SCREENSHOT_DIR, prefix + '-01-login-before.png'),
            fullPage: true
        });

        // Inject CSS
        await page.addStyleTag({ content: localCss });
        await sleep(500);

        // Screenshot after CSS
        await page.screenshot({
            path: path.join(SCREENSHOT_DIR, prefix + '-02-login-after.png'),
            fullPage: true
        });
        console.log('  [' + prefix + '] Login page captured');

        // 2. Login
        console.log('  [' + prefix + '] Logging in...');
        const usernameField = await page.$('input[id*="signInUserName"], input[id*="UserName"]');
        const passwordField = await page.$('input[type="password"]');

        if (usernameField && passwordField) {
            await usernameField.fill(username);
            await passwordField.fill(password);

            const submitBtn = await page.$('input[type="submit"], .TextButton');
            if (submitBtn) {
                await submitBtn.click();
                await sleep(5000);

                // Re-inject CSS after page reload
                await page.addStyleTag({ content: localCss });
                await sleep(500);
            }
        }

        // 3. Screenshot home page after login
        await page.screenshot({
            path: path.join(SCREENSHOT_DIR, prefix + '-03-home.png'),
            fullPage: true
        });
        console.log('  [' + prefix + '] Home page captured');

        // 4. Get all nav links and click through each
        const navLinks = await page.$$eval('.RadMenu a.rmLink, .RadMenu a.rmRootLink', links => {
            return links.map(link => ({
                text: link.textContent.trim(),
                href: link.href
            })).filter(l => l.text && l.text.length > 0);
        });

        console.log('  [' + prefix + '] Found ' + navLinks.length + ' nav items');

        let pageNum = 4;
        for (const navItem of navLinks) {
            try {
                console.log('  [' + prefix + '] Navigating to: ' + navItem.text);
                await page.goto(navItem.href, { waitUntil: 'networkidle', timeout: 30000 });
                await sleep(2000);

                // Re-inject CSS
                await page.addStyleTag({ content: localCss });
                await sleep(500);

                // Screenshot
                const safeName = navItem.text.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                const pageNumStr = pageNum < 10 ? '0' + pageNum : '' + pageNum;
                await page.screenshot({
                    path: path.join(SCREENSHOT_DIR, prefix + '-' + pageNumStr + '-' + safeName + '.png'),
                    fullPage: true
                });
                pageNum++;
            } catch (e) {
                console.log('  [' + prefix + '] Error on ' + navItem.text + ': ' + e.message);
            }
        }

        console.log('  [' + prefix + '] Complete - ' + (pageNum - 1) + ' screenshots taken');

    } catch (error) {
        console.error('  [' + prefix + '] Error:', error.message);
        await page.screenshot({
            path: path.join(SCREENSHOT_DIR, prefix + '-error.png'),
            fullPage: true
        });
    } finally {
        await browser.close();
    }
}

async function main() {
    console.log('============================================================');
    console.log('PBS Neophyte Portal - Comprehensive Theme Test');
    console.log('============================================================');

    const { username } = getCredentials();
    console.log('User: ' + username);
    console.log('CSS: ' + LOCAL_CSS_PATH);
    console.log('Screenshots: ' + SCREENSHOT_DIR);

    // Ensure screenshot directory exists
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    // Run tests for each browser and viewport combination
    for (const [browserName, browserType] of Object.entries(BROWSERS)) {
        for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
            await runTest(browserName, browserType, viewportName, viewport);
        }
    }

    console.log('\n============================================================');
    console.log('All tests complete!');
    console.log('============================================================');
}

main().catch(console.error);
