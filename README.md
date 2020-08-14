# Create static website

This package can initiate, build, watch and run a static React project.

**Please use Node V13.13 or higher**

## How?

Go to the directory where you want to set up the project and run

```
npx alegrify-static-site init
```

When everything is set up, you can use these npm scripts:

| script | purpose                     |
| ------ | --------------------------- |
| build  | Build the static website    |
| watch  | Watch for changes and build |
|  dev   |  Watch and open in browser  |

## Components

Isomorphic components. Write your components inside `components/src` and import them using `components/lib`.

## Pages

Each .js file created inside the pages folder (direct children under src) will be generated into a HTML file on your server root.

## Styling

Each .less,.scss,.css file inside the pages folder (direct children under src) will generate a CSS bundle on your server root.
Less will be compiled with lessc, Scss with sass (no autoprefixer yet) and css with PostCSS.
