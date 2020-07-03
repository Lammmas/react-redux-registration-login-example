describe('Delete', () => {
  const user = { firstName: 'John', lastName: 'Smith', username: 'Doctor', password: '42' }

  beforeEach(() => {
    cy.register(user)
    cy.login({
      ...user,
      id: 1,
      token: 'fake-jwt-token'
    })
    cy.visit(`${Cypress.env('baseUrl')}`)
  })

  it('Delete: Success', () => {
    // click delete
    cy.get('[data-cy=delete-1]').click()
    // assert deletion
    cy.get('[data-cy=delete-1]').should('be.not.visible')
    cy.get('[data-cy=logout]').click()
    // login again
    cy.get('[data-cy=username]').type('Doctor')
    cy.get('[data-cy=password]').type('42')
    cy.get('[data-cy=login-btn]').click()
    // login error
    cy.get('[data-cy=alert-danger]').should('be.visible')
  })
})