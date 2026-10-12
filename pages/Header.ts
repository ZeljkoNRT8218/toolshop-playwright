import {type Page, type Locator} from '@playwright/test';

export class Header {
readonly page: Page;                      //Link==button
readonly userMenu: Locator;
readonly contactLink: Locator
readonly signOutLink: Locator;
readonly signInLink: Locator;
readonly pageTitle: Locator;

constructor (page: Page)
{
    this.page=page;
    this.userMenu=page.getByTestId('nav-menu');
    this.contactLink=page.getByTestId('nav-contact');
    this.signOutLink=page.getByTestId('nav-sign-out');
    this.signInLink=page.getByTestId('nav-sign-in');
    this.pageTitle=page.getByTestId('page-title');
}

async logout()
{
    await this.userMenu.click();
    await this.signOutLink.click();
}


};