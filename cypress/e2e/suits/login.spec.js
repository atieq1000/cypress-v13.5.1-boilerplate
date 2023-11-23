import dashboard from "../pages/dashboard";

describe('Login Test', () => {
    it('should log in with valid credentials', () => {
      const username = 'your_username'; // Replace with a valid username
      const password = 'your_password'; // Replace with a valid password
  
      dashboard.login();
  
      // Add assertions for successful login, for example:
    //   cy.url().should('include', '/dashboard'); // Replace with the actual URL of the dashboard after successful login
    });
  
    // Add more test cases for invalid credentials, error messages, etc.
  });