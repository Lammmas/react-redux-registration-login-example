import { testUser, timeout } from './constants.js';

describe("Test title and header of the homepage", () => {
    beforeAll(async () => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
    });
    test("Title of the page", async () => {
        const title = await page.title();

        expect(title).toBe("React + Redux - User Registration and Login Example & Tutorial");
    }, timeout);

    test("Header of the page", async () => {
        const header = await page.$("h2");

        const html = await page.evaluate(header => header.innerHTML, header);

        expect(html).toBe("Login");
    }, timeout);
});
