beforeEach(() => {
   cy.visit('http://localhost:8000/')
})
describe('Dashboar', () => {
    it('should render the site', () => {
      cy.get('div').should('have.class', 'container');
    });
});
describe('Add item by + icon', () => {
  it('should navigate to the about page', () => {
    cy.get('[id^=add-0]').click();
    cy.get('[id^="total"]').should('contain','$120,000.00');
  });
});

describe('Add item by click', () => {
  it('should navigate to the about page', () => {
    cy.get('[id^=add-3]').click();
    cy.get('[id^=add-3]').click();
    cy.get('[id^=add-3]').click();
    cy.get('[id^=add-3]').click();
    cy.get('[id^=add-3]').click();
    cy.get('*[class^="page_land"]').contains('Transformer');
    cy.get('[id^="total"]').should('contain','$110,000.00');
  });
});

describe('Add item by form', () => {
    it('should navigate to the about page', () => {
      cy.get('[id=form-3]').get('input[name="newValue-3"]').type('3')
      cy.get('[id=form-3]').get('button[name="submit-3"]').click();
      cy.get('[id^="total"]').should('contain','$60,000.00');
    });
});
