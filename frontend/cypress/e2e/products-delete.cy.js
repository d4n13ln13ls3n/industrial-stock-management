describe('Products Delete Flow (Mocked API)', () => {

  it('deletes a product from the list', () => {

    let products = [
      {
        id: 1,
        code: 'P001',
        name: 'Delete Me',
        price: 100
      }
    ]

    cy.intercept('GET', '/api/products', (req) => {
      req.reply({
        statusCode: 200,
        body: products
      })
    }).as('getProducts')

    cy.intercept('DELETE', '/api/products/1', (req) => {
      products = products.filter(p => p.id !== 1)
      req.reply({
        statusCode: 204
      })
    }).as('deleteProduct')

    cy.visit('/products')

    cy.wait('@getProducts')

    cy.contains('Delete Me').should('exist')

    cy.contains('button', 'Delete').click()

    cy.wait('@deleteProduct')

    cy.contains('Delete Me').should('not.exist')

  })

})