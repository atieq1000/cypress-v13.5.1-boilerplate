const sessionId = Math.floor(Math.random() * 1000000000);
function clickElement(locator){
    cy.get(locator).click()
}