# Toolshop – Playwright Test Automation

[![Playwright Tests](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml)

UI test automation for [Toolshop](https://practicesoftwaretesting.com), a demo e-commerce web app built for practicing test automation.
Written in TypeScript with Playwright, using the Page Object Model.

> This is a learning project that I'm building step by step. New tests are added as I go.

## What is tested

- **Login** – valid login, invalid credentials, empty email and password
- **Account** – a guest is redirected to login; a logged-in user sees the account page and their name, can open the profile page and log out
- **Navigation** – opening a category from the menu and by its address, opening the contact page
- **Search** - only matching products are shown; a message is shown when nothing matches; search ignores case; the reset button shows all products again

## Tech stack

- [Playwright Test](https://playwright.dev) with TypeScript
- Page Object Model
- GitHub Actions (CI)

## Project structure

```
pages/      page objects (LoginPage, AccountPage, HomePage, CategoryPage, Header)
tests/      test files (login, account, navigation, search)
.github/    GitHub Actions workflow
```

## How to run

You need [Node.js](https://nodejs.org) installed.

```bash
npm ci
npx playwright install chromium
npx playwright test
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

Tests run on GitHub Actions on every push and pull request to `main`.
Toolshop rejects logins coming from GitHub Actions servers (the login request returns 401, found with the Playwright trace viewer),
so tests that need a logged-in user are skipped on CI and run locally.

## Next steps

- Filters, cart and checkout tests
- Reusing the logged-in state between tests
- API tests
