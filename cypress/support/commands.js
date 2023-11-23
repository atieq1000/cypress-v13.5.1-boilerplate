// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//import 'cypress-file-upload';
import { decode } from 'jsonwebtoken';

const environment = 'login.windows.net';
const apiScopes = [`api://${Cypress.env('scope_Id')}/Api.Access`];

const buildAccountEntity = (
  homeAccountId,
  realm,
  localAccountId,
  username,
  name
) => {
  return {
    authorityType: 'MSSTS',
    clientInfo: '',
    homeAccountId,
    environment,
    realm,
    localAccountId,
    username,
    name,
  };
};

const buildIdTokenEntity = (homeAccountId, idToken, realm, username) => {
  return {
    credentialType: 'IdToken',
    homeAccountId,
    environment,
    clientId: Cypress.env('client_Id'),
    secret: idToken,
    realm,
    username
  };
};

const buildAccessTokenEntity = (
  homeAccountId,
  accessToken,
  expiresIn,
  extExpiresIn,
  realm,
  scopes
) => {
  const now = Math.floor(Date.now() / 1000);
  return {
    homeAccountId,
    credentialType: 'AccessToken',
    secret: accessToken,
    cachedAt: now.toString(),
    expiresOn: (now + expiresIn).toString(),
    extendedExpiresOn: (now + extExpiresIn).toString(),
    environment,
    clientId: Cypress.env('client_Id'),
    realm,
    target: scopes.map((s) => s.toLowerCase()).join(' '),
  };
};

const injectTokens = (tokenResponse) => {
  const idToken = decode(tokenResponse.id_token);
  const localAccountId = idToken.oid || idToken.sid;
  const realm = idToken.tid;
  const homeAccountId = `${localAccountId}.${realm}`;
  const username = idToken.preferred_username;
  const name = idToken.name;

  const accountKey = `${homeAccountId}-${environment}-${realm}`;
  const accountEntity = buildAccountEntity(
    homeAccountId,
    realm,
    localAccountId,
    username,
    name
  );


Cypress.Commands.add('authenticateUsingToken', window => {

    cy.request({
  
      method: 'POST',
      url: `https://login.microsoftonline.com/${Cypress.env('tenant_Id')}/oauth2/v2.0/token`,
      header: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: true,
      body: {
        client_id: Cypress.env('client_Id'),
        username: Cypress.env('userName'),
        password: Cypress.env('password'),
        grant_type: 'password',
        client_secret: Cypress.env('client_secret'),
        scope: `openid profile api://${Cypress.env('scope_Id')}/Api.Access`,
      }
    }).then(response => {
      injectTokens(response.body)
    });
  });
}