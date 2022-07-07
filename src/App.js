import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SimpleExample from './example/Simple';
import VegaLiteExample from './example/VegaLite';
import Widget from './example/Widget';

// The full list of examples
const examples = {
	Simple: <SimpleExample/>,
	Widget: <Widget/>,
	'Vega-Lite': <VegaLiteExample/>,
}

function App() {
	return (
		<div className="App">
			<h1>Gosling React Examples</h1>
			{/* Examples */}
			<ol>
				{Object.entries(examples).map(entry => <li key={entry[0]}><Link to={`/${entry[0]}`}>{entry[0]}</Link></li>)}
			</ol>
			{/* Example Page */}
			<Routes>
				<Route path="/" element={examples.Simple} />
				{Object.entries(examples).map(entry => <Route key={entry[0]} path={`/${entry[0]}`} element={entry[1]}/>)}
			</Routes>
		</div>
	);
}

export default App;