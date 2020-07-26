
describe('Saving favourite pokemon', () => {
  it('persists the favourites', () => {
    cy.visit('/pokemon/charizard')

    cy.get('button')
      .contains('Add to favourites')
      .click()
      .should('have.text', 'Remove from favourites')

    cy.visit('/favourites')

    cy.get('li').first()
      .should('have.text', 'charizard')

    cy.visit('/pokemon/charizard')

    cy.get('button')
      .contains('Remove from favourites')
      .click()
      .should('have.text', 'Add to favourites')
  })
})
