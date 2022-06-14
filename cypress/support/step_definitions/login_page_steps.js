import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import LoginPage  from  '../../pages/login_page.js';
import LoginResultPage  from  '../../pages/login_result_page.js';
import { page_locators } from '../../support/locators.js';
const login_page = new LoginPage()
const login_result_page = new LoginResultPage()

Given('I navigate to the login page', () => {
	login_page.goToLoginPage();
	login_page.waitForLoginPage();
});

When('user {string} logs in with password {string}', (username, password) => {
	login_page.inputField(page_locators.USERNAME_FIELD, username);
	login_page.inputField(page_locators.PASSWORD_FIELD, password);
	login_page.submitForm(page_locators.FORM_ID);
});

Then('user is sucessfully logged in', () => {
	login_result_page.containsMessage(page_locators.LOGIN_RESULT_ALERT, 'You logged into a secure area!');
	login_result_page.containsMessage('h4', 'Welcome to the Secure Area. When you are done click logout below.');
})

Then('error message {string} should be displayed', (err_msg) => {
	login_result_page.containsMessage(page_locators.LOGIN_RESULT_ALERT, err_msg);
})