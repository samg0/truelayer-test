
describe('Searching for a pokemon', () => {
  it('displays the correct information', () => {
    cy.visit('/')
    cy.get('#search-box')
      .type('charizard')

    cy.get('button')
      .click()

    cy.get('h1')
      .should('contain.text', 'charizard')

    cy.get('p')
      .should('contain.text', 'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.')
  })
})
