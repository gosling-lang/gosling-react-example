# Gosling React Template

This repository describes a way to embed [Gosling.js](https://github.com/gosling-lang/gosling.js) visualization in your webpage using [React](https://reactjs.org). To make the process simple, this repository is based on [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), but you can use React without Create React App as well. 

Checkout the online demo of this repository at https://gosling-lang.github.io/gosling-react/.

To start, you can fork this template repository or follow the instructions described below.

## Using Create React App

Install a react application using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

```
npx create-react-app my-app
cd my-app
```

Install `gosling.js` and its dependent libraries:

```sh
npm add gosling.js higlass pixi.js
```

> **Note** The compatible versions of React (`react`) and ReactDOM (`react-dom`) are behind their current versions. If their versions in your `package.json` file are higher than `16.13.1`, you need to lower the versions:
> ```sh
> npm add react@16.13.1 react-dom@16.13.1 react-scripts@4.0.2
> ```
> If you were using 18.0.0 or higher versions, you will need to edit your codes reflecting the major version change of React. For example, see https://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-version.

Add the following stylesheet to `public/index.html`:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/higlass@1.11.3/dist/hglib.css">
</head>
```

Use the Gosling.js's react component to visualize your data:

```js
import { GoslingComponent } from "gosling.js";

function App() {
  return (
    <GoslingComponent
      // Gosling specification
      spec={{
        "tracks": [{
          "data": {
            "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
            "type": "multivec",
            "row": "sample",
            "column": "position",
            "value": "peak",
            "categories": ["sample 1"]
          },
          "mark": "rect",
          "x": { "field": "position", "type": "genomic" },
          "color": { "field": "peak", "type": "quantitative", "legend": true },
          "width": 600,
          "height": 130
        }]
      }}
      // Styles of Gosling Component
      margin={0}
      padding={30}
      border={'none'}
      id={"my-gosling-component-id"}
      className={"my-gosling-component-style"}
      // Styling theme (refer to https://github.com/gosling-lang/gosling-theme)
      theme={'light'}
    />
  );
}
```

Run the demo in your browser:

```sh
rpm run start
```

## Using This Repo

Fork this repository, and then clone it.

```sh
git clone https://github.com/[YOUR GITHUB ID]/gosling-react.git
cd gosling-react
```

Install all dependencies:

```sh
npm install
```

Run the demo in your browser:

```sh
rpm run start
```

## Resource

- Gosling Editor ([demo](https://gosling.js.org/), [code](https://github.com/gosling-lang/gosling.js)) is also based on `<GoslingComponent/>`
