import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchResetXbutton: Locator;
    readonly searchButton: Locator;
    readonly searchCaption: Locator;
    readonly searchCompleted: Locator;
    readonly productNames: Locator;
    readonly noResults: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('search-query');
        this.searchResetXbutton = page.getByTestId('search-reset');
        this.searchButton = page.getByTestId('search-submit');
        this.searchCaption = page.getByTestId('search-caption');
        this.searchCompleted = page.getByTestId('search_completed');
        this.productNames = page.getByTestId('product-name');
        this.noResults = page.getByTestId('no-results');
    };

    async goto() {
        await this.page.goto('/');
        await this.productNames.first().waitFor();
    };

    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.searchCompleted.waitFor();
    };

    async resetSearch() {
        await this.searchResetXbutton.click();
    }
};
