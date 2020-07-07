import { testUser } from './constants.js';

export async function addUsersToLocalStorage () {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
        localStorage.setItem('users', JSON.stringify([{firstName: 'Test', lastName: 'Testopoulos', username: 'testakis', password: 'test', id: 1}]));
    });
}

export async function removeUsersFromLocalStorage () {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
        localStorage.clear();
    });
}

export async function navigateToRegisterPage () {
    const links = await page.$$('a');
    
    await Promise.all([
        page.waitForNavigation(),
        links[0].click({delay: 100})
    ]);
};

export async function login () {
    await page.goto(URL, { waitUntil: "domcontentloaded" });

    await page.waitForSelector('input[name=username]');
    await page.focus('input[name=username]');
    await page.keyboard.type(testUser.username);
    await page.focus('input[name=password]');
    await page.keyboard.type(testUser.password);

    await page.click('button.btn-primary');
    await page.waitFor(1000);
}