import {test, expect} from "@playwright/test";

test('test screenshoy ', async({page}) => {
   await  page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await expect(page.locator('#displayed-text')).toBeVisible();
   await  page.locator('#hide-textbox').click();
   await expect(page.locator('#displayed-text')).toBeHidden();
   await page.screenshot({path:'firstimage.png', fullPage:true});


});
test('test visual ', async({page}) => {
    await  page.goto('https://www.google.com/');
    expect(await page.screenshot()).toMatchSnapshot('laningPage.png'); 
 });