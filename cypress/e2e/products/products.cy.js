describe('products test', () => {
    // beforeEach(() => {
    //   cy.login("gerlinde.versyck@student.hogent.be", "12345678"); //admin
    // })

    it('show products', () => {
        cy.intercept('GET', 'http://localhost:9000/api/products', {
            fixture: 'products.json',
        });

        cy.visit('http://localhost:3000/products');
        cy.get('[data-cy=product]').should('have.length', 1);
        cy.get('[data-cy=product_name]')
            .eq(0)
            .should('contain', 'Acetaminophen and Codeine Phosphate');
        cy.get('[data-cy=product_price]').eq(0).should('contain', 35.3);
        cy.get('[data-cy=product_stock]').eq(0).should('contain', 65);
        cy.get('[data-cy=btn_products]').should('exist');
        cy.get('[data-cy=btn_orders]').should('exist');
        cy.get('[data-cy=btn_order]').should('exist');
    });

    it('very slow response', () => {
        cy.intercept('http://localhost:9000/api/products', (req) => {
            req.on('response', (res) => {
                res.setDelay(1000);
            });
        }).as('slowResponse');
        cy.visit('http://localhost:3000/products');
        cy.get('[data-cy=spinner]').should('be.visible');
        cy.wait('@slowResponse');
        cy.get('[data-cy=spinner]').should('not.exist');
    });
});
