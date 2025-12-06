import { test, expect, Page, Browser, BrowserContext } from "@playwright/test";

// Playwright-extra allows plugin support — needed for stealth
const { chromium } = require("playwright-extra");

// Load the stealth plugin
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);

// Helper function: Go to main page
async function goToMainPage(page: Page) {
    await page.goto("https://www.thaiticketmajor.com/");
    const mainLink = page.locator("a", { hasText: "หน้าหลัก" });
    if ((await mainLink.count()) > 0) {
        await mainLink.first().click();
    }
    await expect(page).toHaveURL("https://www.thaiticketmajor.com/index.html");
}

// Helper function: Sign in
async function signIn(page: Page) {
    // This function logic seems fine, no changes needed here.
    await page.waitForLoadState("domcontentloaded");
    const signInByRole = page.getByRole("button", { name: "เข้าสู่ระบบ" });
    if ((await signInByRole.count()) > 0) {
        await signInByRole.first().waitFor({ state: "visible", timeout: 5000 });
        await signInByRole.first().click();
        return;
    }
    // ... other fallbacks
    const byText = page.locator("text=เข้าสู่ระบบ");
    await byText.first().waitFor({ state: "visible", timeout: 5000 });
    await byText.first().click();
}

// --- Test Suite Definition ---

test.describe("logging in", () => {
    // Declare variables for browser, context, and page
    // They will be accessible within the entire describe block
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    // Use test.beforeAll to set up the browser once
    test.beforeAll(async () => {
        // --- PROXY CONFIGURATION ---
        // Replace these with your actual proxy provider's details
        const proxyServer = "p.webshare.io:80";
        const proxyUsername = "enydiqyo-rotate";
        const proxyPassword = "knl4m3im63ch";
        // -------------------------

        browser = await chromium.launch({
            headless: false,
            // Add the proxy configuration object here
            proxy: {
                server: proxyServer,
                username: proxyUsername,
                password: proxyPassword,
            },
        });

        context = await browser.newContext({
            // Your other context options remain the same
            viewport: {
                width: 1280 + Math.floor(Math.random() * 100),
                height: 720 + Math.floor(Math.random() * 100),
            },
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
            locale: "en-US",
            timezoneId: "Asia/Bangkok",
        });

        page = await context.newPage();
    });

    // Use test.afterAll to clean up once all tests are done
    test.afterAll(async () => {
        await browser.close();
    });

    // Use test.beforeEach if you need to run something before every single test
    test.beforeEach(async () => {
        await goToMainPage(page);
    });

    // --- Your Tests ---

    test("go to main page", async () => {
        await expect(page).toHaveURL(
            "https://www.thaiticketmajor.com/index.html"
        );
    });

    test("login", async () => {
		test.slow();
        await signIn(page);

        await page.fill('input[name="username"]', "chatrinza@gmail.com");
        await page.fill('input[name="password"]', "Chatrin2548");
        await page
            .locator('input[type="checkbox"]')
            .check()
            .catch(() => {});
        await page.click('button[type="submit"]');

        const userProfile = page.locator("button.box-member-avatar");
        await expect(userProfile).toBeVisible();
    });
});
