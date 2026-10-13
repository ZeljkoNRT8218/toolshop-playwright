import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Search', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('shows only products that match the search term', async () => {
        await homePage.search('pliers');
        await expect(homePage.searchCaption).toHaveText('Searched for: pliers');

        const names = await homePage.productNames.allInnerTexts();   //list of names   //allInnerTexts uzmi tekst svih elemenata koje lokator nadje i vrati ih kao listu
        expect(names.length).toBeGreaterThan(0);         //proveri da lista nije prazna
        for (const name of names) {
            expect(name.toLowerCase()).toContain('pliers');
        }
    });

    test('shows a message when no product matches', async () => {
        await homePage.search('Zeljko');
        await expect(homePage.searchCaption).toHaveText('Searched for: Zeljko');
        await expect(homePage.noResults).toHaveText('There are no products found.')
        await expect(homePage.productNames).toHaveCount(0);

    });



});
