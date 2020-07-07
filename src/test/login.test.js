import { addUsersToLocalStorage, removeUsersFromLocalStorage, loginSuccessfully } from "./utils.js";
import { timeout, testUser } from './constants.js';

describe("When user is on homepage", () => {
    beforeAll(async () => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await addUsersToLocalStorage();
    });
    afterAll(async () => {
        await removeUsersFromLocalStorage();
    });

    describe("and enters wrong username/password", () => {
        test("then they should see a 'Username or password is incorrect' message", async () => {
            await page.focus('input[name=username]');
            await page.keyboard.type('wrongUsername');
            await page.focus('input[name=password]');
            await page.keyboard.type('wrongPassword');

            await page.click('button.btn-primary');
            await page.waitFor(2000);

            let element = await page.$('.alert');
            const text = await (await element.getProperty('textContent')).jsonValue();
            expect(text).toBe('Username or password is incorrect');

        }, timeout);
    });

    describe("and enters valid username/password", () => {
        test("they should redirected in the homepage", async () => {
            await loginSuccessfully();
            
            const header = await page.$("h1");
            const title = await page.evaluate(header => header.innerHTML, header);
            expect(title).toBe("Hi " + testUser.firstName + "!");

            const p = await page.$("p");
            const subtitle = await page.evaluate(p => p.innerHTML, p);
            expect(subtitle).toBe("You're logged in with React!!");
        }, timeout);
    });
});


    