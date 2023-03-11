describe('soldItems test', () => {
    // beforeEach(() => {
    //   cy.login("gerlinde.versyck@student.hogent.be", "12345678"); //admin
    // })

    it('show cartItems', () => {
        cy.intercept('GET', 'http://localhost:9000/api/cart', {
            fixture: 'cart.json',
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('[data-cy=order]').should('have.length', 2);
        cy.get('[data-cy=order_qty]').eq(0).should('contain', 3);
    });

    it('very slow response', () => {
        cy.intercept('http://localhost:9000/api/cart', (req) => {
            req.on('response', (res) => {
                res.setDelay(1000);
            });
        }).as('slowResponse');
        cy.visit('http://localhost:3000/cart');
        cy.get('[data-cy=spinner]').should('be.visible');
        cy.wait('@slowResponse');
        cy.get('[data-cy=spinner]').should('not.exist');
    });
});
