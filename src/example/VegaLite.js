import React, { useEffect, useState, useRef } from 'react';
import { GoslingComponent } from 'gosling.js';
import { VegaLite } from 'react-vega'

const goslingSpec = {
	layout: 'linear',
	arrangement: 'vertical',
	centerRadius: 0.8,
	xDomain: { chromosome: '1' },
	style: {
		select: { color: 'black', stroke: 'black', strokeWidth: 6, arrange: 'behind', opacity: 0.1 }
	},
	views: [
		{
			tracks: [
				{
					title: 'ALT + Mouse Drag For Range Selection',
					id: 'scatterplot-track',
					experimental: { mouseEvents: true },
					data: {
						url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec',
						type: 'multivec',
						row: 'sample',
						column: 'position',
						value: 'peak',
						categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4'],
						binSize: 4
					},
					mark: 'point',
					x: { field: 'position', type: 'genomic' },
					y: { field: 'peak', type: 'quantitative' },
					size: { field: 'peak', type: 'quantitative' },
					color: { field: 'sample', type: 'nominal', legend: true },
					width: 600,
					height: 200
				}
			]
		},
	]
};

const vegaLiteSpec = {
	width: 450,
	height: 400,
	mark: 'bar',
	encoding: {
		x: { field: 'peak', type: 'ordinal', bin: true },
		y: { field: 'peak', type: 'quantitative', aggregate: 'count' },
		color: { field: 'sample', type: 'nominal', scale: { domain: ['sample 1', 'sample 2', 'sample 3', 'sample 4'], range: ['#E79F00', '#029F73', '#0072B2', '#CB7AA7'] }}
	},
	data: { name: 'table' }
};

function VegaLiteExample() {
	const gosRef = useRef(null);

	const [selectedData, setSelectedData] = useState([]);

	useEffect(() => {
		if (!gosRef.current) return;
		gosRef.current.api.subscribe('rangeSelect', (_, e) => setSelectedData(e.data));
		return () => gosRef.current.api.unsubscribe('rangeSelect');
	}, [gosRef]);

	return (
		<>
			<GoslingComponent
				ref={gosRef}
				spec={goslingSpec}
				experimental={{ reactive: true }}
			/>

			<div style={{ marginLeft: 80 }}>
				<VegaLite spec={vegaLiteSpec} data={{ table: selectedData }} />
			</div>
		</>
	);
}

export default VegaLiteExample;