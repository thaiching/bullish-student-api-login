// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from failing the test if there are any exceptions from 3rd party scripts
return false;
});



