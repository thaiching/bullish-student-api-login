export default class LoginPage {
	goToLoginPage(){
		cy.visit(Cypress.env('LOGIN_BASE_URL'));
	}

	inputField(locator, value){
		cy.get(locator).type(value);
	}

	submitForm(locator){
		cy.get(locator).submit();
	}

	waitForLoginPage(){
		cy.get('h2').contains('Login Page')
	}
}