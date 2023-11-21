const { test, expect } = require('@playwright/test');
const email = 'anshika@gmail.com';
let WebContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').click();
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').click();
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').press('Enter');
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    WebContext = await browser.newContext({ storageState: 'state.json' });

})

test('login to client demo', async () => {
    const product_name = 'zara coat 3';
    const page = await WebContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');
    const product_count = await products.count();
    for (let i = 0; i < product_count; i++) {
        if (await products.nth(i).locator('b').textContent() === product_name) {
            products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.waitForTimeout(2000);
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const cart_section = page.locator('.cartSection');
    expect(await cart_section.locator('h3').isVisible()).toBeTruthy();
    await page.locator("li[class='totalRow'] button[type='button']").click();
    await page.locator("input[placeholder='Select Country']").type('ind', { delay: 100 })
    const dropDownOption = page.locator('.ta-results.list-group.ng-star-inserted');
    await dropDownOption.waitFor();
    const countOption = await dropDownOption.locator('button').count();
    for (let i = 0; i < countOption; i++) {
        let countryName = await dropDownOption.locator('button').nth(i).textContent();
        if (countryName === " India") {
            await dropDownOption.locator('button').nth(i).click();
            break;
        }
    }
    //  await expect(page.locator("input[class='input txt text-validated ng-valid ng-dirty ng-touched']")).toHaveText(email);
    const text_field = page.locator('.field.small input');
    await text_field.first().fill('323');
    await text_field.last().fill('test');
    await page.locator('.btnn.action__submit.ng-star-inserted').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const odrerId = await page.locator("label[class='ng-star-inserted']").innerText();
    let newOrderId = odrerId.replace(/\|/g, '');  // remove all `|` from the string
    let finalOrderId = newOrderId.trim();
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    const rows = page.locator('tbody tr');
    const rowsvalue = page.locator('.ng-star-inserted td');
    await page.locator('tbody').waitFor();
    //  await page.waitForTimeout(1000);
    const rowsCount = await rows.count();
    for (let i = 0; i < rowsCount; i++) {
        if (await rows.nth(i).locator('th').textContent() === finalOrderId) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    await expect(page.locator(".col-md-6 [class='col-text -main']")).toHaveText(finalOrderId);

});