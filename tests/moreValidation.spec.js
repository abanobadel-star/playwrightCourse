const { test, expect } = require('@playwright/test');

test('popup validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const pageframe = page.frameLocator("#courses-iframe");
    await pageframe.locator("li .new-navbar-highlighter").first().click();
    const text = await pageframe.locator('.text h2').textContent();
    let finalText =  text.match(/\d+/g).join('');
    console.log(finalText);
})