# Gosling-React
This repository describes a way to embed [Gosling.js](https://github.com/gosling-lang/gosling.js) visualization in your webpage using [React](https://reactjs.org). To make the process simple, this repository is based on [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), but you can use `react` and `react-dom` without `create-react-app` as well. You can checkout the demo online at https://gosling-lang.github.io/gosling-react/.

## Quick Start

Install `gosling.js` and its dependent libraries:

```sh
yarn add gosling.js higlass pixi.js
yarn add react@16.13.1 react-dom@16.13.1 # if not using `create-react-app`
```

Add the following style sheets to your base `html` file:
```html
<head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/higlass@1.11.3/dist/hglib.css">
</head>
```

Use the Gosling.js' react component to visualize your data:

```js
import { validateGoslingSpec, GoslingComponent } from "gosling.js";

...

// validate the spec
const validity = validateGoslingSpec(EXMAPLE_GOSLING_SPEC);

if(validity.state === 'error') {
    console.warn('Gosling spec is invalid!', validity.message);
    return;
}

...

function App() {
  
  ...

  return (
    <GoslingComponent
      spec={EXAMPLE_GOSLING_SPEC}
      compiled={(spec, vConf) => { /* Callback function when compiled */ }}
      padding={30} // Padding around this Gosling Component in px
      id={"my-gosling-component-id"} // The id attribute of the root <div/> element of Gosling Component
      className={"my-gosling-component-style"} // The style attribute of the root <div/> (default: "gosling-component")
    />
  );
}
```

## Develop
Install packages:
```sh
yarn
```
Run the application in the browser:
```sh
yarn start
```

## Troubleshooting
- You may need to install the lower version of `react` and `react-dom` if you see `react`-related error messages or white screen.
   - react: ^16.13.1
   - react-dom: ^16.13.1
