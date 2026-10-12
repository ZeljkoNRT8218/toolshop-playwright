import { type Page, type Locator } from "@playwright/test";

export class CategoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('page-title');
    }

    async goto(category: string) {
        await this.page.goto('/category/' + category);

    }
}