const { test, expect, request } = require('@playwright/test');
const{APIUtils} = require('./utils/APIUtils');
let token;
let response;
let orderId;
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOder(orderPayload);
    

    // const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    //     {
    //         data: loginPayload
    //     })
    // expect(loginResponse.ok()).toBeTruthy();
    // const loginResponseJson = await loginResponse.json();
    // token = loginResponseJson.token;

    // const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    //     {
    //         data: orderPayload,
    //         headers: {
    //             'Authorization': token,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const orderResponseJson =await orderResponse.json();
    //     console.log(orderResponseJson);
    //     odrerId = await orderResponseJson.orders[0];
    //     console.log(odrerId);

        
});

test.beforeEach(() => {

});

test('login to client demo api', async ({ page }) => {
    
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)
    const product_name = 'zara coat 3';
    const email = 'anshika@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    const rows = page.locator('tbody tr');
    const rowsvalue = page.locator('.ng-star-inserted td');
    await page.locator('tbody').waitFor();
    //  await page.waitForTimeout(1000);
    const rowsCount = await rows.count();
    for (let i = 0; i < rowsCount; i++) {
        if (await rows.nth(i).locator('th').textContent() === response.orderId) {
            console.log(response.OrderId);
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    await expect(page.locator(".col-md-6 [class='col-text -main']")).toHaveText(response.orderId);

});