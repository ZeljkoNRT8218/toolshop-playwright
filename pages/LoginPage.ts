import {type Page, type Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

constructor (page: Page) {
    this.page=page;
    this.emailInput=page.getByTestId('email');
    this.passwordInput=page.getByTestId('password');
    this.loginButton=page.getByTestId('login-submit');
    this.loginError=page.getByTestId('login-error');
    this.emailError=page.getByTestId('email-error');
    this.passwordError=page.getByTestId('password-error');
}

async goto() {
    await this.page.goto('/auth/login');
}
async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

}
}
