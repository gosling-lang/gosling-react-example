# Gosling React Template

This repository describes a way to embed [Gosling.js](https://github.com/gosling-lang/gosling.js) visualization in your webpage using [React](https://reactjs.org) and also use Gosling API functions, such as looking up clicked genomic region and raw data or zooming to a certain gene using a text input. To make the process simple, this repository is based on [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), but you can use React without Create React App as well.

All examples can be found as separate files under a [src/example](/src/example/) folder.

Checkout the online demo of this repository at https://gosling-lang.github.io/gosling-react/.

To start, you can either fork this template repository or follow the instructions described below.

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

## Gosling API

To use the Gosling API, you need to create a [Ref](https://reactjs.org/docs/refs-and-the-dom.html) that stores a reference to the GoslingComponent.

```javascript
const gosRef = React.useRef(null)

<GoslingComponent
  ref = {gosRef}
  spec = {/**your gosling spec**/}
/>

if (gosRef.current) {
  // then you can use any Gosling API you want
  gosRef.current.api.exportPdf();
}
```

Below is an example
```javascript
import React, { useRef, useEffect } from "react";
import { GoslingComponent} from 'gosling.js';

function app(){
  const gosRef = useRef(null)
  
  useEffect(() => {
    if (gosRef.current) {
      gosRef.current.api.subscribe('click', (type, eventData) => {
            // print raw data that corresponds to the clicked mark
            console.warn(type, eventData.data);
      })
    }
    return ()=>{
      // remember to unsubscribe events
      gosRef.current?.api.unsubscribe('click');
    }
  }, [gosRef.current])

  return <div>
    <GoslingComponent
      ref = {gosRef}
      spec = {/**your gosling spec**/}
    />
    <button type="button" onClick={()=>gosRef.current?.api.exportPdf()}>
      Export PDF
     </button>
  </div>
}
```

Please refer to [Gosling documentation](http://gosling-lang.org/docs/js-api) for a complete list of Gosling API.

## Using This Repository

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
npm run start
```

## Resource

- Gosling Editor ([demo](https://gosling.js.org/), [code](https://github.com/gosling-lang/gosling.js)) is also based on `<GoslingComponent/>`

## Troubleshooting

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

If you confront this error message when trying to install dependencies, add a `--force` tag:

```
npm add gosling.js higlass pixi.js --force
```
