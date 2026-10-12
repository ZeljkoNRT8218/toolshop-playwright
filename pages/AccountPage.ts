import { type Page, type Locator } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly profileLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('page-title');
        this.profileLink = page.getByTestId('nav-profile');
    };

    async goto() {
        await this.page.goto('/account');
    }

    async goToProfile() {
        await this.profileLink.click();
    }
};