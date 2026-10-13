import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { Header } from "../pages/Header";
import { CategoryPage } from "../pages/CategoryPage";

test.describe('Navigation', () => {
    let header: Header;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        header = new Header(page);
        await homePage.goto();
    });

    test('can open Hand Tools from the categories menu', async ({ page }) => {
        const categoryPage = new CategoryPage(page);

        await header.goToHandTools();
        await expect(page).toHaveURL(/hand-tools/);
        await expect(categoryPage.pageTitle).toHaveText('Category: Hand Tools');

    });

    test('can open a category directly by its address', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        await categoryPage.goto('power-tools');
        await expect(page).toHaveURL('/category/power-tools');
        await expect(categoryPage.pageTitle).toHaveText('Category: Power Tools');
    });

    test('can open the contact page from the header', async ({ page }) => {
        await header.goToContact();
        await expect(page).toHaveURL('/contact')
    });
});
