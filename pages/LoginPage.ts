import { type Page, type Locator } from '@playwright/test';

export class LoginPage {                      //pravimo klasu LoginPage
    readonly page: Page;                      //field    spisak onoga sto svaki objekat ima, ovde su polja =>
    readonly emailInput: Locator;                        //samo najavljena
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    //Sta se desi u trenutku pravljenja objekta: popunjavaju se polja
    constructor(page: Page) {             //*(page)nam stize kao parametar, postoji samo dok se konstruktor izvrsava          
        this.page = page;                    //desno je parametar, levo je polje objekta //linija kaze svaki objekat cuvace jedan tab, jedan emailInput itd...
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
        this.emailError = page.getByTestId('email-error');
        this.passwordError = page.getByTestId('password-error');
    }

    async goto() {                                //f-je, sta objekat ume da radi (otvori stranicu, uloguje se...)
        await this.page.goto('/auth/login');
    }
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

    }
}
