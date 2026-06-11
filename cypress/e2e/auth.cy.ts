describe('Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('redirects unauthenticated user to login', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('shows error on invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('wrong@email.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    cy.get('.error').should('contain', 'Invalid credentials');
  });

  it('shows error on empty form submission', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    cy.get('.error').should('contain', 'required');
  });

  it('redirects to dashboard on valid login', () => {
    cy.login('admin@ep.com', 'admin123');
    cy.url().should('include', '/dashboard');
  });

  it('logs out and redirects to login', () => {
    cy.login('admin@ep.com', 'admin123');
    cy.url().should('include', '/dashboard');
    cy.get('.logout-btn').click();
    cy.url().should('include', '/login');
  });
});
