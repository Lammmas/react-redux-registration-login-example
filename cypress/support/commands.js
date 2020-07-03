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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

let uid = 1
Cypress.Commands.add('register', ({ firstName, lastName, username, password }) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  localStorage.setItem('users', JSON.stringify([...users, { id: uid++, firstName, lastName, username, password }]))
})

Cypress.Commands.add('clearStorage', key => {
  localStorage.setItem(key, [])
})

Cypress.Commands.add('login', user => {
  localStorage.setItem('user', JSON.stringify(user));
})
