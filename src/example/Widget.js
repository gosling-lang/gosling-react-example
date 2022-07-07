import React, { useState, useRef } from 'react';
import { GoslingComponent } from 'gosling.js';

const MARK_OPTIONS = ["point", "bar", "line", "area"];
const LAYOUT_OPTIONS = ['linear', 'circular'];

const goslingSpec = (mark, layout, binSize) => {
	return {
		layout,
		arrangement: 'vertical',
		centerRadius: 0.4,
		xDomain: { chromosome: '1' },
		style: {
			select: { color: 'black', stroke: 'black', strokeWidth: 6, arrange: 'behind', opacity: 0.1 }
		},
		views: [
			{
				tracks: [
					{
						id: 'widget-track',
						data: {
							url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec',
							type: 'multivec',
							row: 'sample',
							column: 'position',
							value: 'peak',
							categories: Array.from(Array(6)).map((_, i) => `sample ${i}`),
							binSize: binSize === 0 ? 1 : binSize
						},
						mark: mark,
						x: { field: 'start', type: 'genomic' },
						xe: { field: 'end', type: 'genomic' },
						row: { field: 'sample', type: 'nominal', legend: false },
						y: { field: 'peak', type: 'quantitative', axis: 'none' },
						color: { field: 'sample', type: 'nominal', legend: true },
						tooltip: [
							{ field: 'start', type: 'genomic', alt: 'Start Position' },
							{ field: 'end', type: 'genomic', alt: 'End Position' },
							{
								field: 'peak',
								type: 'quantitative',
								alt: 'Value',
								format: '.2'
							},
							{ field: 'sample', type: 'nominal', alt: 'Sample' }
						],
						width: 600,
						height: 230
					}
				]
			},
		]
	}
};

function Widget() {
	const gosRef = useRef(null);

	const [mark, setMark] = useState('point');
	const [layout, setLayout] = useState('linear');
	const [binSize, setBinSize] = useState(8);

	return (
		<>
			<span>
				<div style={{ marginTop: 30, marginLeft: 80 }}>
					{'Bin Size: '}
					<input
						type="range"
						min={0}
						max={32}
						step={4}
						value={binSize}
						className="slider"
						id="bin-slider"
						style={{ width: 100, display: 'inline', margin: 10 }}
						onChange={(e) => setBinSize(+e.currentTarget.value)}
					/>
					{binSize === 0 ? 1 : binSize}
				</div>
			</span>
			<div style={{ marginTop: 30, marginLeft: 80 }}>
				{'Mark: '}
				<select name="mark" onChange={(e) => setMark(e.currentTarget.value)}>
					{MARK_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
				</select>
			</div>
			<div style={{ marginTop: 30, marginLeft: 80 }}>
				{'Layout: '}
				<select name="layout" onChange={(e) => setLayout(e.currentTarget.value)}>
					{LAYOUT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
				</select>
			</div>

			<GoslingComponent
				ref={gosRef}
				spec={goslingSpec(mark, layout, binSize)}
				experimental={{ reactive: true }}
			/>
		</>
	);
}

export default Widget;
