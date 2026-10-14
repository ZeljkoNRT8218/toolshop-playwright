import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../pages/Header';

test.describe('Login', () => { //start of the test group
    let loginPage: LoginPage;  //create a variable that can hold only a (LoginPage class) object.

    test.beforeEach(async ({ page }) => {   //runs before each test  *(page) is a new browser tab that Playwright opens for each test and gives to us
        loginPage = new LoginPage(page);  //create a new object before each test; (page)is passed to the constructor
        await loginPage.goto();
    });

    test('user can log in with valid credentials', async ({ page }) => {
        test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');
        const header = new Header(page);

        await loginPage.login('customer2@practicesoftwaretesting.com', 'welcome01')

        await expect(page).toHaveURL(/account/);
        await expect(header.userMenu).toContainText('Jack Howe');
    });

    test('user cannot log in with invalid credentials', async ({ page }) => {
        await loginPage.login('not.registered@test.com', 'WrongPassword1')

        await expect(loginPage.loginError).toContainText('Invalid email or password');

    });

    test('user cannot log in without email and password', async ({ page }) => {
        await loginPage.loginButton.click();

        await expect(loginPage.emailError).toContainText('Email is required');
        await expect(loginPage.passwordError).toContainText('Password is required');
    });

});
