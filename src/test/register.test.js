import { testUser, timeout } from './constants.js';
import { loginSuccessfully, navigateToRegisterPage, removeUsersFromLocalStorage } from './utils.js';

describe.skip("When user is on homepage", () => {
    beforeEach(async () => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
    });
    describe("and clicks on the Register button", () => {
        test("they should be redirected to the registration form", async () => {
            await navigateToRegisterPage();
     
            const header = await page.$("h2");
            const html = await page.evaluate(header => header.innerHTML, header);
      
            expect(html).toBe("Register");
        }, timeout);
    });
});

describe("When user is on registration form ", () => {
    beforeEach(async () => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await navigateToRegisterPage();
    });
    afterAll(async () => {
        await removeUsersFromLocalStorage();
    });

    describe("when they press cancel", () => {
        test("then they are redirected back on the homepage", async () => {
            const links = await page.$$('a');
            await Promise.all([
                page.waitForNavigation(),
                links[0].click({delay: 100})
            ]);

            const header = await page.$("h2");
            const html = await page.evaluate(header => header.innerHTML, header);
            expect(html).toBe("Login");
        }, timeout);
    });

    describe("when they fill out the form except for the password and click on the Register button", () => {
        test("then they should see a 'Password required' message", async () => {
            await page.focus('input[name=firstName]');
            await page.keyboard.type(testUser.firstName);
            await page.focus('input[name=lastName]');
            await page.keyboard.type(testUser.lastName);
            await page.focus('input[name=username]');
            await page.keyboard.type(testUser.username);

            await page.click('button.btn-primary');
            await page.waitFor(1000);
            
            let element = await page.$('.help-block');
            const text = await (await element.getProperty('textContent')).jsonValue();
            expect(text).toBe('Password is required');
            
        }, timeout);
    });

    describe("when they fill out the form and click on the Register button", () => {
        test("then they are redirected back on the homepage and the see a registration successful message", async () => {
            await page.focus('input[name=firstName]');
            await page.keyboard.type(testUser.firstName);
            await page.focus('input[name=lastName]');
            await page.keyboard.type(testUser.lastName);
            await page.focus('input[name=username]');
            await page.keyboard.type(testUser.username);
            await page.focus('input[name=password]');
            await page.keyboard.type(testUser.password);

            await page.click('button.btn-primary');
            await page.waitFor(1000);
            
            let element = await page.$('.alert');
            const text = await (await element.getProperty('textContent')).jsonValue();
            expect(text).toBe('Registration successful');
            
        }, timeout);
    });
});

