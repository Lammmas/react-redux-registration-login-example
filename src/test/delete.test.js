const { addUsersToLocalStorage, loginSuccessfully } = require("./utils");
const { timeout, testUser } = require("./constants");

describe("When a user is logged in", () => {
    beforeAll(async () => {
        await addUsersToLocalStorage();
        await loginSuccessfully();
    });

    describe("and deletes a user", () => {
        test("when log out and try to login again they get an 'Username or password is incorrect' error", async () => {
            await page.waitForSelector('.text-user');
            let element = await page.$('.text-user');
            await element.click();

            await logout();
            await page.waitFor(3000);
            await loginSuccessfully();

            let el = await page.$('.alert');
            const text = await (await el.getProperty('textContent')).jsonValue();
            expect(text).toBe('Username or password is incorrect');
        }, timeout);
    });
});

async function logout() {
    await page.waitForSelector('.logout');
    let element = await page.$('.logout');
    await element.click();
};