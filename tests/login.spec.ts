import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) =>{
        loginPage =new LoginPage(page);
        await loginPage.goto();  
    });

test('user can log in in with valid credentials', async({page}) =>{
    test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');
    
    await loginPage.login('customer2@practicesoftwaretesting.com','welcome01')

    await expect(page).toHaveURL(/account/);
    await expect(page.getByTestId('nav-menu')).toContainText('Jack Howe');
    });

test('user cannot log in with invalid credentials', async({page}) =>{
    await loginPage.login('not.registered@test.com','WrongPassword1')

    await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');

    });

test('user cannot log in without email and password', async({page}) =>{
    await loginPage.loginButton.click();
    
    await expect(page.getByTestId('email-error')).toContainText('Email is required');
    await expect(page.getByTestId('password-error')).toContainText('Password is required');
    });

});