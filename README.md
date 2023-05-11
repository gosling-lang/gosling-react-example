# Gosling React Example

This repository describes a way to use [Gosling.js](https://github.com/gosling-lang/gosling.js) along with [React](https://reactjs.org) and [Vite](https://vitejs.dev/).
 
The repository includes examples related to adding Gosling visualization to webpages and using Gosling JavaScript API functions (e.g., looking up clicked genomic region and its raw data, zooming to a certain gene of interest using a text input).

All examples can be found as separate files under a [src/example](/src/example/) folder.

You can find the online demo at https://gosling-lang.github.io/gosling-react-example/.

## Using This Repository

Fork this repository, and then clone it.

```sh
git clone https://github.com/[YOUR GITHUB ID]/gosling-react-example.git
cd gosling-react-example
```

Install all dependencies:

```sh
yarn install
```

Run the demo in your browser:

```sh
yarn start
```

## Using Gosling Component

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
  const gosRef = useRef(null);
  
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
  }, [gosRef.current]);

  return (
    <div>
      <GoslingComponent
        ref = {gosRef}
        spec = {/**your gosling spec**/}
      />
      <button type="button" onClick={() => gosRef.current?.api.exportPdf()}>
        Export PDF
      </button>
    </div>
  );
}
```

Please refer to [Gosling documentation](http://gosling-lang.org/docs/js-api) for a complete list of Gosling API.

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

Add the following stylesheet to `public/index.html`:
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/higlass@[1.12]/dist/hglib.css">
</head>
```

## Resource

- Gosling Editor ([demo](https://gosling.js.org/), [code](https://github.com/gosling-lang/gosling.js)) is also based on `<GoslingComponent/>`
