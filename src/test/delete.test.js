const { addUsersToLocalStorage, loginSuccessfully } = require("./utils");
const { timeout, testUser } = require("./constants");

describe.skip("When a user is logged in", () => {
    beforeAll(async () => {
        await addUsersToLocalStorage();
        await loginSuccessfully();
    });

    describe("and deletes a user", () => {
        test("the user no longer exists in the page", async () => {
            const links = await page.$('a');
            const text = await (await links.getProperty('textContent')).jsonValue();
            console.log("text", text);
            await page.waitFor(3000);
    
            await Promise.all([
                page.waitForNavigation(),
                links.click({delay: 100})
            ]);

        }, timeout);

        test("when log out and try to login again they get an 'Username or password is incorrect' error", async () => {
            await logout();
            await loginSuccessfully();

            let element = await page.$('.alert');
            const text = await (await element.getProperty('textContent')).jsonValue();
            expect(text).toBe('Username or password is incorrect');
        })
    });
    
});

async function logout() {
    const links = await page.$$('a');
    const text = await (await links[0].getProperty('textContent')).jsonValue();
    console.log("text", text);
    await page.waitFor(3000);

    await Promise.all([
        page.waitForNavigation(),
        links[0].click({delay: 100})
    ]);
}