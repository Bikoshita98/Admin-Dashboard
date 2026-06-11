describe('Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login('admin@ep.com', 'admin123');
  });

  it('shows 4 stat cards', () => {
    cy.get('.stat-card').should('have.length', 4);
  });

  it('shows recent activity section', () => {
    cy.get('.activity-card').should('be.visible');
    cy.get('.activity-item').should('have.length', 5);
  });

  it('shows new feature banner when flag is enabled', () => {
    cy.get('.new-feature-banner').should('be.visible');
  });
});
