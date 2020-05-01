# Static site

This project was bootstrapped with [alegrify-static-site](https://www.npmjs.com/package/alegrify-static-site)

## Project structure

### components/src

The `components` folder contains isomorphic components. (both server and client side)

Import the `lib` folder variant of a component to use it into pages or clientside js.

### pages/src

All files directly under `pages/src` will be generated into html pages.

For example, `index.js` will become `index.html`

These components only render on build time

### client-js/src

This is all JS that will actually be sent to the client.

Every file directly under `client-js/src` will become a separate bundle.

### static

The static folder contains all assets, pictures, fonts,... that will be copied into the production build
