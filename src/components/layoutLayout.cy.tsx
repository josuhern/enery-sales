import React from 'react'
import Layout from './layout'
import Device from "./device";

/**
 * Sample devices for testing
 */
const devices: Device[] = [
  new Device("Megapack 2XL", "40ft x 10ft", 4, 120000, 2022),
  new Device("Megapack 2", "30ft x 10ft", 3, 80000, 2021),
  new Device("Megapack", "30ft x 10ft", 2, 50000, 2005),
  new Device("Powerpack", "10ft x 10ft", 1, 20000, 2000),
];
/**
 * transformer device for testing
 */
const transforCart: Device[] = [new Device("Transformer", "10ft x 10ft", -0.25, 10000)];

/**
 * looks up for a div that has a "page_land" class
 * if it contains the "Megapack" then it means it is rendering properly
 */
describe('Render Devices Layout', () => {
  it('Renders Devices Layout', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('*[class^="page_land"]').should('contain','Megapack 2XL');
  })
})

/**
 * looks up for a div that has a "page_land" class
 * if it contains the "Transformer" then it means it is rendering properly
 */
describe('Render Transformer Layout', () => {
  it('Renders Transformer Layout', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('*[class^="page_land"]').should('contain','Transformer');
  })
})

/**
 * looks up for the first device on the sample data, and checks 
 * that the width matches the packRatio on pixels
 */
describe('Item has defined width', () => {
  it('Item has defined width', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('[data-test-id="device-0"]').should('have.css', 'width').and('eq', '80px');
  })
})