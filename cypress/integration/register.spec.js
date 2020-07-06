describe('Register', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/register`)
  })

  afterEach(() => {
    cy.clearStorage('users')
  })

  it('Registration: Success', () => {
    // assert we are in register screen
    cy.get('[data-cy=register-form]').should('be.visible')
    // fill form
    cy.get('[data-cy=firstName]').type('Inspector')
    cy.get('[data-cy=lastName]').type('Spacetime')
    cy.get('[data-cy=username]').type('tim')
    cy.get('[data-cy=password]').type('12345')
    // submit form
    cy.get('[data-cy=register-btn]').click()
    // assert succesfull registration
    cy.get('[data-cy=alert-success]').should('be.visible')
  })

  it('Registration: Failure -> wrong credentials', () => {
    // add user
    const user = { firstName: 'John', lastName: 'Smith', username: 'Doctor', password: '42' }
    cy.register(user)
    // fill form
    cy.get('[data-cy=firstName]').type('Inspector')
    cy.get('[data-cy=lastName]').type('Spacetime')
    cy.get('[data-cy=username]').type('Doctor')
    cy.get('[data-cy=password]').type('12345')
    // submit form
    cy.get('[data-cy=register-btn]').click()
    // assert error registration
    cy.get('[data-cy=alert-danger]').should('be.visible')
  })

  it('Registration: Failure -> incomplete form', () => {
    // fill form
    cy.get('[data-cy=firstName]').type('Inspector')
    cy.get('[data-cy=lastName]').type('Spacetime')
    cy.get('[data-cy=username]').type('Doctor')
    // submit form
    cy.get('[data-cy=register-btn]').click()
    // assert error registration
    cy.get('[data-cy=error-password]').should('be.visible')
  })

  it('Registration: Abort', () => {
    cy.get('[data-cy=firstName]').type('Inspector')
    cy.get('[data-cy=lastName]').type('Spacetime')
    cy.get('[data-cy=username]').type('Doctor')
    cy.get('[data-cy=password]').type('12345')

    cy.get('[data-cy=register-cancel]').click()
    cy.get('[data-cy=login-btn]').should('be.visible')
    cy.get('[data-cy=register-link]').click()

    cy.get('[data-cy=firstName]').should('be.empty')
    cy.get('[data-cy=lastName]').should('be.empty')
    cy.get('[data-cy=username]').should('be.empty')
    cy.get('[data-cy=password]').should('be.empty')
  })
})

describe('Register & Login', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/login`)
  })

  it('Should register and then login', () => {
    // fill register form
    // click submit
    // fill login form
    // assert login
  })
})