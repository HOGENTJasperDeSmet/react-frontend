describe('Not found', () => {
    const notFound = 'http://localhost:3000/sdfsa';
    it(" 'not found' response", () => {
        cy.request({
            url: notFound,
            followRedirect: false,
            failOnStatusCode: false,
        }).then((resp) => {
            expect(resp.redirectedToUrl).to.eq(undefined);
        });
        cy.visit(notFound, {
            failOnStatusCode: false,
        });
        cy.get('[data-cy=not_found]').should('exist');
        cy.get('[data-cy=not_found]').should('be.visible');
    });
});
