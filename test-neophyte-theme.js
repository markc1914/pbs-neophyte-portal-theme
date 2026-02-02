const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { getCredentials } = require('./test-config');

const LOGIN_URL = 'https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte';
const THEME_BASE_URL = 'https://members.phibetasigma1914.org/iMISDEV/App_Themes/PBS-NEOPHYTE-THEME-MODERN';
const LOCAL_CSS_PATH = path.join(__dirname, 'package', 'pbs-neophyte-theme.css');
const SCREENSHOT_DIR = path.join(__dirname, 'testingScreenshots');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testNeophyteTheme() {
    const { username, password } = getCredentials();
    console.log('Using user:', username);

    // Load local CSS and fix image paths
    let localCss = fs.readFileSync(LOCAL_CSS_PATH, 'utf8');
    localCss = localCss.replace(/url\("images\//g, `url("${THEME_BASE_URL}/images/`);

    const browser = await puppeteer.launch({ headless: false, protocolTimeout: 120000 });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    page.on('dialog', async d => await d.accept());

    try {
        // Go to Neophyte Portal
        console.log('Navigating to Neophyte Portal...');
        await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
        await sleep(2000);

        // Screenshot BEFORE CSS injection
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neophyte-1-before-css.png'), fullPage: true });
        console.log('Screenshot: neophyte-1-before-css.png');

        // Inject local CSS
        console.log('Injecting local CSS...');
        await page.addStyleTag({ content: localCss });
        await sleep(1000);

        // Screenshot AFTER CSS injection
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neophyte-2-after-css.png'), fullPage: true });
        console.log('Screenshot: neophyte-2-after-css.png');

        // Try to find and fill login form if present
        const loginForm = await page.$('input[type="text"][id*="signInUserName"], input[type="text"][id*="UserName"]');
        if (loginForm) {
            console.log('Login form found, attempting login...');
            await page.type('input[type="text"][id*="signInUserName"], input[type="text"][id*="UserName"]', username);
            await page.type('input[type="password"]', password);
            
            const submitBtn = await page.$('input[type="submit"], button[type="submit"], .TextButton');
            if (submitBtn) {
                await submitBtn.click();
                await sleep(6000);
                
                // Screenshot after login
                await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neophyte-3-after-login.png'), fullPage: true });
                console.log('Screenshot: neophyte-3-after-login.png');
            }
        } else {
            console.log('No login form found on page');
        }

        console.log('\nKeeping browser open for 15 seconds for inspection...');
        await sleep(15000);

    } catch (error) {
        console.error('Error:', error);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neophyte-error.png'), fullPage: true });
    } finally {
        await browser.close();
    }
}

testNeophyteTheme();
