import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../pages/Header';
import { AccountPage } from '../pages/AccountPage';

test.describe('Guest', ()=>{
    test('is redirected to login when opening the account page', async ({page}) => {
        const accountPage= new AccountPage(page);

        await accountPage.goto();
        await expect(page).toHaveURL(/login/);
    });
});

test.describe('logged-in user', ()=>{
    test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');
    let header: Header;
    let accountPage: AccountPage;

    test.beforeEach(async ({page}) => {
        const loginPage=new LoginPage(page);
        header=new Header(page);
        accountPage=new AccountPage(page);

        await loginPage.goto();
        await loginPage.login('customer2@practicesoftwaretesting.com','welcome01');
        await expect(page).toHaveURL(/account/);

    });

test('sees the account page after login', async ()=> {
    await expect(accountPage.pageTitle).toHaveText('My account');
 });

 test('sees their name in the header', async()=> {
    await expect(header.userMenu).toHaveText('Jack Howe');
 });

 test('can logout', async({page})=> {
    await header.logout();
    await expect(header.signInLink).toBeVisible();
    await expect(page).toHaveURL('auth/login');

 });

 test('can open the profile page', async({page}) =>{
    await accountPage.goToProfile();
    await expect(page).toHaveURL('/account/profile');
});

test('can open the contact page from the header', async({page}) =>{
await header.contactLink.click();
await expect(page).toHaveURL('/contact');
});

});