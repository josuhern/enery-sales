import React from 'react'
import Layout from './layout'
import Device from "./device";
const devices: Device[] = [
  new Device("Megapack 2XL", "40ft x 10ft", 4, 120000, 2022),
  new Device("Megapack 2", "30ft x 10ft", 3, 80000, 2021),
  new Device("Megapack", "30ft x 10ft", 2, 50000, 2005),
  new Device("Powerpack", "10ft x 10ft", 1, 20000, 2000),
];
const transforCart: Device[] = [new Device("Transformer", "10ft x 10ft", -0.25, 10000)];

describe('Render Devices Layout', () => {
  it('Renders Devices Layout', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('*[class^="page_land"]').should('contain','Megapack 2XL');
  })
})

describe('Render Transformer Layout', () => {
  it('Renders Transformer Layout', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('*[class^="page_land"]').should('contain','Transformer');
  })
})

describe('Item has defined width', () => {
  it('Item has defined width', () => {
    cy.mount(<Layout cart={devices} transfor={transforCart} packRatio={2} />)
    cy.get('[data-test-id="device-0"]').should('have.css', 'width').and('eq', '80px');
  })
})