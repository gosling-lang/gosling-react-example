import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SimpleExample from "./example/Simple";
import VegaLiteExample from "./example/VegaLite";

const baseUrl = 'gosling-react';

// The full list of examples
const examples = {
    'simple': <SimpleExample/>,
    'vega-lite': <VegaLiteExample/>,
}

function App() {
  return (
    <div className="App">
      {Object.entries(examples).map(entry => <span key={entry[0]} style={{ marginRight: '6px' }}><a href={`/${baseUrl}/${entry[0]}`}>{entry[0]}</a></span>)}
      <Routes>
        {Object.entries(examples).map(entry => <Route key={entry[0]} path={`/${baseUrl}/${entry[0]}`} element={entry[1]}/>)}
      </Routes>
    </div>
  );
}

export default App;