export default class LoginResultPage {
	containsMessage(locator, msg){
		cy.get(locator).contains(msg);
	}
}