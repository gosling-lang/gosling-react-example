import React, {useCallback, useMemo, useState} from 'react';
import {GoslingComponent} from 'gosling.js';
import {Vega} from 'react-vega'

const width = 300;
const height = 300;

function GeneSpy() {
	// track order to link leaves of vega tree to tracks in gosling
	const [trackOrder, setTrackOrder]=useState([])
	const [maxDist,setMaxDist]=useState(1)
	const onNewView = useCallback(view=>{
		let leaves=view.data('leaves').slice();
		leaves.sort((a,b)=>a.x-b.x);
		setTrackOrder(leaves.map(leaf=>leaf.id))
		setMaxDist(Math.max(...leaves.map(d=>d.distance)))
	},[])
	const goslingSpec=useMemo(()=>{
		return({
			title: 'GeneSpy + iTol',
			subtitle: 'Genomic neighborhood visualization with aligned phylogenetic tree',
			description: 'Idea: https://doi.org/10.1093/bioinformatics/bty459',
			assembly: [['', 11000]],
			static: true,
			views: [
				{
					alignment: 'overlay',
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/GeneSpy/gene_spy_example.csv',
						type: 'csv',
						genomicFields: ['Gene start', 'Gene end']
					},
					dataTransform: [
						{type: 'genomicLength', startField: 'Gene start', endField: 'Gene end', newField:'Gene length'}
					],
					color: {
						field: 'type',
						type: 'nominal',
						domain: ['anchor', 'conserved', 'disrupted'],
						range: ['red', 'gray', 'yellow']
					},
					row: {field: 'Accession', type: 'nominal',domain: trackOrder},
					tracks: [
						{
							dataTransform: [
								{type: 'filter', field: 'Strand', oneOf: ['+']}
							],
							x: {field: 'Gene start', type: 'genomic'},
							xe: {field: 'Gene end', type: 'genomic'},
							mark: 'rect',
							size: {value: 2}
						},
						{
							dataTransform: [
								{type: 'filter', field: 'Strand', oneOf: ['+']}
							],
							mark: 'triangleRight',
							style: {align: 'right'},
							size: {field:'Gene length'},
							x: {field: 'Gene end', type: 'genomic'},
						},
						{
							dataTransform: [
								{type: 'filter', field: 'Strand', oneOf: ['-']}
							],
							x: {field: 'Gene start', type: 'genomic'},
							xe: {field: 'Gene end', type: 'genomic'},
							mark: 'rect',
							size: {value: 2},
							stroke: {value: 'gray'}
						},
						{
							dataTransform: [
								{type: 'filter', field: 'Strand', oneOf: ['-']}
							],
							mark: 'triangleLeft',
							style: {align: 'left'},
							x: {field: 'Gene start', type: 'genomic'},
						}
					],
					height: height
				}
			]
		})
	},[trackOrder])
	const vegaSpec = useMemo(()=>{
		return({$schema: 'https://vega.github.io/schema/vega/v5.json',
			description: 'An example of Cartesian layouts for a node-link diagram of hierarchical data.',
			width: width,
			height: height,
			padding: 0,
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
							expr: 'width  * (datum.distance/'+maxDist+')',
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
							stroke: {value: '#000'}
						}
					}
				},
				{
					type: 'rule',
					from: {data: 'leaves'},
					encode: {
						update: {
							x: {field: 'x'},
							y: {field: 'y'},
							x2: {value: width},
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
		})
	},[maxDist])
	return (
		<>
			<div style={{display: 'inline-block'}}>
				<Vega spec={vegaSpec} onNewView={onNewView} actions={false}/>
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