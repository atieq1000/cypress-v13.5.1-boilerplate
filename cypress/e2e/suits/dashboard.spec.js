import dashboard from "../pages/dashboard";
import helper from "../helper/helper";




const authenticate = () => {
    cy.session([helper.sessionId], () => {
      cy.window().then((win) => {
        //set the token
        cy.authenticateUsingToken(win);
      });
    });
  };


describe('Login Test', () => {
  it('should log in with valid credentials', () => {

    // Add assertions for successful login, for example:
  //cy.url().should('include', '/dashboard'); // Replace with the actual URL of the dashboard after successful login
  });

  // Add more test cases for invalid credentials, error messages, etc.

  /* ==== Test Created with Cypress Studio ==== */
  it('Login', function() {
    /* ==== Generated with Cypress Studio ==== */
    authenticate();
    cy.visit('http://localhost:3000/');
    
    /* ==== End Cypress Studio ==== */
  });
});