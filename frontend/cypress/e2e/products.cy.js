describe('Products Flow (Mocked API)', () => {

  it('creates a new product and displays it in the list', () => {

    let products = []

    cy.intercept('GET', '/api/products', (req) => {
      req.reply({
        statusCode: 200,
        body: products
      })
    }).as('getProducts')

    cy.intercept('POST', '/api/products', (req) => {
      const newProduct = {
        id: 999,
        ...req.body
      }

      products.push(newProduct)

      req.reply({
        statusCode: 201,
        body: newProduct
      })
    }).as('createProduct')

    cy.visit('/products')

    cy.wait('@getProducts')

    cy.get('input[name="code"]').type('P999')
    cy.get('input[name="name"]').type('Cypress Product')
    cy.get('input[name="price"]').type('150')

    cy.contains('button', 'Add Product').click()

    cy.wait('@createProduct')

    cy.contains('Cypress Product').should('exist')

  })

})