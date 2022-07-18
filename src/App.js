import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SimpleExample from './example/Simple';
import VegaLiteExample from './example/VegaLite';
import WidgetEncoding from './example/WidgetEncoding';
import WidgetNavigation from './example/WidgetNavigation';
import MouseEvents from './example/MouseEvents';

// The full list of examples
const examples = {
	Simple: <SimpleExample/>,
	'Widget (Encoding)': <WidgetEncoding/>,
	'Widget (Navigation)': <WidgetNavigation/>,
	'Mouse Events': <MouseEvents/>,
	'Vega-Lite': <VegaLiteExample/>,
}

function App() {
	return (
		<div className='flex flex-row h-full w-full'>
			<div className='flex-none border-r-[1px]'>
				<div className='font-bold font-lg m-3'>Examples</div>
				<ol className='list-decimal list-inside divide-y divide-solid'>
					{Object.entries(examples).map(entry => <li className='p-3' key={entry[0]}><Link className='hover:underline' to={`/${entry[0].replace(' ', '_')}`}>{entry[0]}</Link></li>)}
				</ol>
			</div>
			<div className=''>
				<Routes>
					<Route path="/" element={examples.Simple} />
					{Object.entries(examples).map(entry => <Route key={entry[0]} path={`/${entry[0].replace(' ', '_')}`} element={entry[1]}/>)}
				</Routes>
			</div>
		</div>
	);
}

export default App;