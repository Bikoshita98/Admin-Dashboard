describe('Role Based Access Control', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  context('Admin user', () => {
    beforeEach(() => {
      cy.login('admin@ep.com', 'admin123');
    });

    it('can access /users', () => {
      cy.visit('/users');
      cy.url().should('include', '/users');
      cy.get('h1').should('contain', 'Users');
    });

    it('can access /analytics', () => {
      cy.visit('/analytics');
      cy.url().should('include', '/analytics');
      cy.get('h1').should('contain', 'Analytics');
    });

    it('can access /audit-log', () => {
      cy.visit('/audit-log');
      cy.url().should('include', '/audit-log');
      cy.get('h1').should('contain', 'Audit Log');
    });

    it('sees Users link in sidebar', () => {
      cy.visit('/dashboard');
      cy.get('.nav-link').should('contain', 'Users');
    });
  });

  context('Manager user', () => {
    beforeEach(() => {
      cy.login('manager@ep.com', 'manager123');
    });

    it('cannot access /users and gets redirected', () => {
      cy.visit('/users');
      cy.url().should('not.include', '/users');
    });

    it('cannot access /audit-log and gets redirected', () => {
      cy.visit('/audit-log');
      cy.url().should('not.include', '/audit-log');
    });

    it('can access /analytics', () => {
      cy.visit('/analytics');
      cy.url().should('include', '/analytics');
    });

    it('does not see Users link in sidebar', () => {
      cy.visit('/dashboard');
      cy.get('.nav-link').should('not.contain', 'Users');
    });
  });
});
