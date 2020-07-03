describe('Login', () => {
  beforeEach(() => {
    const user = { firstName: 'John', lastName: 'Smith', username: 'Doctor', password: '42' }
    cy.register(user)
    cy.visit(`${Cypress.env('baseUrl')}/login`)
  })

  afterEach(() => {
    cy.clearStorage('users')
  })

  it('Login: Success', () => {
    cy.get('[data-cy=username]').type('Doctor')
    cy.get('[data-cy=password]').type('42')
    cy.get('[data-cy=login-btn]').click()
    // assert we logged in
    cy.get('[data-cy=logged-in-header]').should('be.visible')
  })

  it('Login: Failure', () => {
    cy.get('[data-cy=username]').type('Doctor')
    cy.get('[data-cy=password]').type('1111')
    cy.get('[data-cy=login-btn]').click()
    cy.get('[data-cy=alert-danger]').should('be.visible')
  })
})

describe('Logout', () => {
  beforeEach(() => {
    // login user
    cy.login({
      id: 2,
      username: 'test',
      firstName: 'aaa',
      lastName: 'bbb',
      token: 'fake-jwt-token'
    })
    cy.visit(`${Cypress.env('baseUrl')}`)
  })

  it('Logout: Success', () => {
    cy.wait(2000) // it's too fast
    cy.get('[data-cy=logout]').click()
    cy.get('[data-cy=logged-in-header]').should('be.not.visible')
    cy.get('[data-cy=login-btn]').should('be.visible')
  })
})