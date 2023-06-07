
# Tesla Energy Sales

## Command to run the application:

By running this command all dependencies will be installed, the code will be built and the application will be started.

After couple of minutes, you will find the application running [here](http://localhost:8000).

```bash
yarn runApp
# or
npm run runApp
```

## Commands for testing:
1. In order to be able to test you need the application running in a separate console.
```bash
yarn dev
# or
npm run dev
```
2. run the following command in a separate console to test end to end.
```bash
yarn test
# or
npm run test
```

3. run the following command in a separate console to test components.
```bash
yarn testComponents
# or
npm run testComponents
```

## App description

This application uses the following stack:

- [React](https://react.dev/) library for web and native user interfaces.
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) React Framework for the Web.
- [Cypress](https://www.cypress.io/) Testing Framework for e2e testing and component testing.

This application has the following components:
- **[cart](https://github.com/josuhern/enery-sales/blob/main/src/components/cart.tsx):** Manages the main functions that control the application.
- **[cartItems](https://github.com/josuhern/enery-sales/blob/main/src/components/cartItems.tsx):** Display the categories of the items, + and - controls, number of items in cart.
- **[dashboard](https://github.com/josuhern/enery-sales/blob/main/src/components/dashboard.tsx):** Contains the markup where cart lives in.
- **[device](https://github.com/josuhern/enery-sales/blob/main/src/components/device.tsx):** Class that defines the battery.
- **[devicesForm](https://github.com/josuhern/enery-sales/blob/main/src/components/devicesForm.tsx):** Form that adds items to the cart by providing an input number.
- **[layout](https://github.com/josuhern/enery-sales/blob/main/src/components/layout.tsx):** Component that renders an autogenerated layout of the batteries.
- **[utilities](https://github.com/josuhern/enery-sales/blob/main/src/components/utilities.tsx):** Contains a utility function that renders price format.

The application has the following [end to end tests](https://github.com/josuhern/enery-sales/blob/main/cypress/e2e/app.cy.js)
- **Dashboard:** checks that the application loads properly.
- **Add item by + icon:** checks that a baterry is added to the cart by clicking on + control.
- **Add item by click:** check that the layout is being generated.
- **Add item by form:** checks that the number of batteries is added using the form input.

The application has the following [component test](https://github.com/josuhern/enery-sales/blob/main/src/components/layoutLayout.cy.tsx)
- **layout**
    - **Render Devices Layout:** check that the batteries are render properly in the layout.
    - **Render Transformer Layout:** check that the transformers are render properly in the layout.
    - **Item has defined width:** check that the layout is following the scale ratio for the batteries.

## App functionality

This application has the following functionalities:

- ![alt text](https://github.com/josuhern/enery-sales/blob/main/src/img/app.png?raw=true)

1. You can enter the number of any device you want and add it to the cart using the shopping cart button.
![alt text](https://github.com/josuhern/enery-sales/blob/main/src/img/form.png?raw=true)

2. You will see a summary showing the total price, energy density, and land dimensions required.
3. You will see a category list of items added to the cart, showing the total price by category and number of items in cart.
4. You can add and remove items from cart by using the + or - buttons. 
5. Transformers are added automatically assuming that for every 4 industrial batteries 1 transformer is needed.
![alt text](https://github.com/josuhern/enery-sales/blob/main/src/img/cart.png?raw=true)

6. You will see a layout showing an arrangement of the batteries based on user configuration.
7. User configuration is determined as the items are added to the cart and can be manipulated using the + and - controls.
8. Layout doesn't exceed 100ft, this is based on scale 1ft equal to 6px.
![alt text](https://github.com/josuhern/enery-sales/blob/main/src/img/layout.png?raw=true)

## Requirements

- The user should be able to enter the number of each device they want, and your UI should show the price, land dimension required and the sites energy density.
- Assume that for every 4 industrial batteries bought 1 transformer is needed.
- The UI should also have an autogenerated layout showing an arrangement of batteries based on the user’s configuration.
- The site layouts should not exceed 100ft in width.
- If this project requires many things to work, ensure the whole app is runnable with one command.
- Make sure the front-end service runs on http://localhost:8000 when hosted locally.

## Software Stack
- React
- JavaScript/TypeScript
- Node/Python/Golang

### Adding any one of this is a plus:
- A testing library
- Typescript
- Surprising features