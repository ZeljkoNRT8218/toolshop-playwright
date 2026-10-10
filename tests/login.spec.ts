import {test, expect} from '@playwright/test';

test('user can login in with valid credentials', async({page}) =>{
    await page.goto('/auth/login');

    await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
    await page.getByTestId('password').fill('welcome01');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL(/account/);
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});


test('user cannot log in with invalid credentials', async({page}) =>{
    await page.goto('/auth/login');
    await page.getByTestId('email').fill('not.registered@test.com');
    await page.getByTestId('password').fill('WrongPassword1');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');

});

test('user want to log in without email and password', async({page}) =>{
    await page.goto('/auth/login');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('email-error')).toContainText('Email is required');
    await expect(page.getByTestId('password-error')).toContainText('Password is required');
});