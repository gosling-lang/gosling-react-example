import React from 'react';
import {GoslingComponent} from 'gosling.js';
import {Vega} from 'react-vega'

const width = 300;
const height = 300;
const goslingSpec = {
	assembly: [['', 11000]],
	views: [
		{
			alignment: 'overlay',
			data: {
				url: 'https://s3.amazonaws.com/gosling-lang.org/data/GeneSpy/gene_spy_example.csv',
				type: 'csv',
				genomicFields: ['Gene start', 'Gene end']
			},
			color: {
				field: 'type',
				type: 'nominal',
				domain: ['anchor', 'conserved', 'disrupted'],
				range: ['red', 'gray', 'yellow']
			},
			row: {field: 'genome name', type: 'nominal'},
			tracks: [
				{
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['+']}
					],
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					mark: 'rect'
				},
				{
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['+']}
					],
					mark: 'rule',
					strokeWidth: {value: 0},
					color: {value: 'white'},
					style: {linePattern: {type: 'triangleRight', size: 10}},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'}
				},
				{
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['-']}
					],
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					mark: 'rect',
					stroke: {value: 'gray'}
				},
				{
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['-']}
					],
					mark: 'rule',
					strokeWidth: {value: 0},
					color: {value: 'white'},
					style: {linePattern: {type: 'triangleLeft', size: 10}},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'}
				}
			],
			height: height
		}
	]
};
const vegaSpec = {
	$schema: 'https://vega.github.io/schema/vega/v5.json',
	description: 'An example of Cartesian layouts for a node-link diagram of hierarchical data.',
	width: width,
	height: height,
	padding: 5,
	data: [
		{
			name: 'tree',
			url: 'https://s3.amazonaws.com/gosling-lang.org/data/GeneSpy/gene_spy_tree.json',
			transform: [
				{
					type: 'stratify',
					key: 'id',
					parentKey: 'parent'
				},
				{
					type: 'tree',
					method: 'cluster',
					field: {field: 'distance'},
					sort: {field: 'value', order: 'ascending'},
					size: [{signal: 'height'}, {signal: 'width'}],
					separation: false,
					as: ['y', 'x', 'depth', 'children']
				},
				{
					type: 'formula',
					expr: 'width * datum.distance',
					as: 'x'
				}
			]
		},
		{
			name: 'leaves',
			source: 'tree',
			transform: [
				{
					type: 'filter',
					expr: '!datum.children'
				}
			]
		},
		{
			name: 'links',
			source: 'tree',
			transform: [
				{type: 'treelinks'},
				{
					type: 'linkpath',
					orient: 'horizontal',
					shape: 'orthogonal'
				}
			]
		}
	],
	marks: [
		{
			type: 'path',
			from: {data: 'links'},
			encode: {
				update: {
					path: {field: 'path'},
					stroke: {value: '#ccc'}
				}
			}
		},
		{
			type: 'rule',
			from: {data: 'leaves'},
			encode: {
				update: {
					x: {field:'x'},
					y: {field: 'y'},
					x2: {value:width},
					y2: {field: 'y'},
					stroke: {value: '#eee'},
				}
			}
		},
		{
			type: 'text',
			from: {data: 'leaves'},
			encode: {
				enter: {
					text: {field: 'name'},
					fontSize: {value: 9},
					baseline: {value: 'middle'}
				},
				update: {
					x: {value: width},
					y: {field: 'y'},
					dx: {signal: 'datum.children ? -7 : 7'},
					align: 'left'
				}
			}
		}
	]
};

function GeneSpy() {
	return (
		<>
			<div style={{display: 'inline-block'}}>
				<Vega spec={vegaSpec}/>
			</div>
			<div style={{display: 'inline-block'}}>
				<GoslingComponent
					padding={0}
					spec={goslingSpec}
					experimental={{reactive: true}}
				/>
			</div>
		</>
	);
}

export default GeneSpy;