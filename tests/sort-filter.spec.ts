import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Sort products', async () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('by name from A to Z', async () => {
        await homePage.sortBy('Name (A - Z)');

        const names = await homePage.productNames.allInnerTexts();
        expect(names.length).toBeGreaterThan(1); //proveri da na stranici ima barem 2 proizvoda
        const sortedNames = [...names].sort(); //[...names] pravi kopiju liste names  sort() poredja listu kao text po abecedi od A do Z
        expect(names).toEqual(sortedNames);  //za liste uvek koristimo toEqual, pita da li je u listama isti sadrzaj
    });

    test('by name from Z to A ', async () => {
        await homePage.sortBy('Name (Z - A)');

        const names = await homePage.productNames.allInnerTexts();
        expect(names.length).toBeGreaterThan(1);
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    test('by price from low to high', async () => {
        await homePage.sortBy('Price (Low - High)');

        const prices = await homePage.getPrices();
        expect(prices.length).toBeGreaterThan(1);
        const sortedPrices = [...prices].sort((a, b) => a - b); // a-b:od manjeg ka vecem   b-a: od veceg ka manjem
        expect(prices).toEqual(sortedPrices);
    });

    test('by price from high to low', async () => {
        await homePage.sortBy('Price (High - Low)');

        const prices = await homePage.getPrices();
        expect(prices.length).toBeGreaterThan(1);
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });
});

test.describe('Filter', async () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('shows only hammers when the Hammer category is selected', async () => {
        await homePage.filterByCategory('Hammer');

        const names = await homePage.productNames.allInnerTexts();
        expect(names.length).toBeGreaterThan(0);

        for (const name of names) {
            expect(name.toLowerCase()).toContain('hammer');
        }
    });

    test('sort hammers by price from low to high', async () => {
        await homePage.filterByCategory('Hammer');

        const names = await homePage.productNames.allInnerTexts();
        expect(names.length).toBeGreaterThan(0);
        for (const name of names) {
            expect(name.toLowerCase()).toContain('hammer')
        }

        await homePage.sortBy('Price (Low - High)');

        const prices = await homePage.getPrices();
        expect(prices.length).toBeGreaterThan(1);
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });
});
