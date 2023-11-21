const { test, expect } = require('@playwright/test');

test('browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinButton = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-title a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await username.type('rahulshettyacademy');
    await password.type('password');
    await signinButton.click();
    await page.locator("[style*='display']").isDisabled();
    await expect(page.locator("[style*='display']")).toContainText('Incorrect username/password.');
    await password.clear();
    await password.fill('learning');
    await signinButton.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allInnerTexts();
    console.log(allTitles);



})

test('ui_controls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinButton = page.locator('#signInBtn');
    const dropDownList = page.locator('select.form-control');
    const radoiButton = page.locator('.radiotextsty');
    const termsCheckBox = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");
    await dropDownList.selectOption('Consultant');
    await radoiButton.last().click();
    await page.locator('#okayBtn').click();
    await expect(radoiButton.last()).toBeChecked();
    await termsCheckBox.click();
    await expect(termsCheckBox).toBeChecked();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
   
})

test('child window handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const redLine = newpage.locator('.im-para.red');
    const text = await redLine.textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await username.type(domain);
   
})