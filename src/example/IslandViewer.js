import React, {useState} from 'react';
import {GoslingComponent} from 'gosling.js';
import {useEffect, useRef} from 'react';

const islandData = {
	data: {
		type: 'csv',
		url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_islands.csv',
		chromosomeField: 'Accession',
		genomicFields: ['Island start', 'Island end']
	},
	x: {field: 'Island start', type: 'genomic'},
	xe: {field: 'Island end', type: 'genomic'},
}
const circularRadius = 200;
const centerRadius = 0.5;

const linearHeight = 120
const linearSize = linearHeight / 6
const spec = {
	title: 'IslandViewer 4 (Bertelli, C. et al. 2017)',
	subtitle: 'Salmonella enterica subsp. enterica serovar Typhi Ty2, complete genome.',
	assembly: [['NC_004631.1', 4791961]],
	spacing: 50,
	views: [
		{
			layout: 'circular',
			static: true,
			alignment: 'overlay',
			tracks: [
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_annotations.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					dataTransform: [
						{
							type: 'displace',
							method: 'pile',
							boundingBox: {
								padding: 3.5,
								startField: 'Gene start',
								endField: 'Gene end'
							},
							newField: 'row'
						}
					],
					row: {field: 'row', type: 'nominal'},
					mark: 'point',
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					size: {value: 3},
					color: {
						field: 'Type',
						type: 'nominal',
						domain: ['Victors', 'BLAST', 'RGI', 'PAG'],
						range: ['#460B80', '#A684EA', '#FF9CC1', '#FF9CC1']
					},
				},
				{
					...islandData,
					row: {
						field: 'Method',
						type: 'nominal'
					},
					color: {
						field: 'Method',
						type: 'nominal',
						domain: ['Predicted by at least one method', 'IslandPath-DIMOB', 'SIGI-HMM', 'IslandPick', 'Islander'],
						range: ['#B22222', '#4169E1', '#FF8C00', '#008001', '#40E0D0'],
					},
					mark: 'rect'
				},
				{
					mark: 'brush', x: {linkingId: 'detail'}
				}
			],
			width: circularRadius * 2,
			centerRadius: centerRadius
		},
		{
			layout: 'linear',
			xDomain: {chromosome: 'NC_004631.1', interval: [1000000, 1500000]},
			linkingId: 'detail',
			alignment: 'overlay',
			tracks: [
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_genes.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					y: {value: 5.5 * linearSize},
					size: {value: linearSize},
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['1']},
					],
					color: {value: '#E9967A'},
					tooltip: [
						{field: 'Gene name', type: 'nominal', alt: 'Name'},
					]
				},
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_genes.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					y: {value: 4.5 * linearSize},
					size: {value: linearSize},
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['-1']},
					],
					color: {value: '#87976E'},
					tooltip: [
						{field: 'Gene name', type: 'nominal', alt: 'Name'},
					]
				},
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_genes.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					y: {value: 5.5 * linearSize},
					mark: 'text',
					text: {field: 'Gene name', type: 'nominal'},
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['1']},
					],
					color: {value: '#ffffff'},
					visibility: [
						{
							operation: 'less-than',
							measure: 'width',
							threshold: '|xe-x|',
							transitionPadding: 10,
							target: 'mark'
						}
					]
				},
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_genes.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					y: {value: 4.5 * linearSize},
					mark: 'text',
					text: {field: 'Gene name', type: 'nominal'},
					dataTransform: [
						{type: 'filter', field: 'Strand', oneOf: ['-1']},
					],
					color: {value: '#ffffff'},
					visibility: [
						{
							operation: 'less-than',
							measure: 'width',
							threshold: '|xe-x|',
							transitionPadding: 10,
							target: 'mark'
						}
					]
				},
				{
					...islandData,
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['IslandPath-DIMOB']},
					],
					y: {value: 3.5 * linearSize},
					size: {value: linearSize},
					color: {value: '#4169E1'},
				},
				{
					...islandData,
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['SIGI-HMM']},
					],
					y: {value: 2.5 * linearSize},
					size: {value: linearSize},
					color: {value: '#FF8C00'},
				},
				{
					...islandData,
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['IslandPick']},
					],
					y: {value: 1.5 * linearSize},
					size: {value: linearSize},
					color: {value: '#008001'},
				},
				{
					...islandData,
					mark: 'rect',
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['Islander']},
					],
					y: {value: 0.5 * linearSize},
					size: {value: linearSize},
					color: {value: '#40E0D0'},
				},
				{
					data: {
						url: 'https://s3.amazonaws.com/gosling-lang.org/data/IslandViewer/NC_004631.1_annotations.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start', 'Gene end']
					},
					dataTransform: [
						{type: 'filter', field: 'External Annotations', oneOf: [''], not: true},
						{
							type: 'displace',
							method: 'pile',
							boundingBox: {
								padding: 3.5,
								startField: 'Gene start',
								endField: 'Gene end'
							},
							newField: 'row'
						}
					],
					row: {field: 'row', type: 'nominal'},
					mark: 'point',
					x: {field: 'Gene start', type: 'genomic'},
					xe: {field: 'Gene end', type: 'genomic'},
					size: {value: 3},
					color: {
						field: 'Type',
						type: 'nominal',
						domain: ['Victors', 'BLAST', 'RGI', 'PAG'],
						range: ['#460B80', '#A684EA', '#FF9CC1', '#FF9CC1']
					},
					tooltip: [
						{field: 'Type', type: 'nominal', alt: 'Name'},
					]
				}],
			width: 400,
			height: linearHeight,
		}
	],
}

function IslandViewer() {
	const gosRef = useRef(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!gosRef.current) return;
		gosRef.current.api.subscribe('rawData', (type, rawdata) => {
			const viewID = gosRef.current.api.getViewIds()[2]
			const range = gosRef.current.hgApi.api.getLocation(viewID).xDomain
			if (rawdata.data.length > 0 && rawdata.id === viewID && 'Accnum' in rawdata.data[0]) {
				const dataInRange = rawdata.data.filter(entry => entry['Gene start'] > range[0]
                    && entry['Gene start'] < range[1]
                    && entry['Gene end'] > range[0]
                    && entry['Gene end'] < range[1])
				const uniqueInRange = dataInRange.filter((v, i, a) => a.findIndex(v2 => (v2['Gene name'] === v['Gene name'])) === i)
				setData(uniqueInRange)
			}
		});
		return () => {
			gosRef.current.api.unsubscribe('rawData');
		}
	}, [gosRef]);
	const tableKeys = ['Prediction Method', 'Gene name', 'Accnum', 'Product'];
	return (
		<>
			<div style={{display: 'inline-block', width: '50%'}}>
				<GoslingComponent
					ref={gosRef}
					spec={spec}
					experimental={{reactive: true}}
				/>
			</div>
			{data.length === 0 ? null : (
				<div style={{
					height: linearHeight + 2 * circularRadius,
					overflowY: 'scroll',
					display: 'inline-block',
					width: '50%',
				}}>
					<table className='table-fixed border-collapse border border-slate-400'>
						<thead className='capitalize'>
							<tr className='border border-slate-300  bg-slate-100'>{tableKeys.map(d => <th className='px-1'
								key={d}>{d}</th>)}</tr>
						</thead>
						<tbody>
							{data.map(d => <tr className='border border-slate-300' key={d['Gene name']}>
								{tableKeys.map(key => {
									let value = '';
									if (key === 'Prediction Method') {
										if (d['Islands'].length > 0) {
											if (d['Annotations'].length > 0) {
												value = d['Islands'] + '/' + d['Annotations']
											} else {
												value = d['Islands']
											}
										} else if (d['Annotations'].length > 0) {
											value = d['Annotations']
										}
									} else {
										value = d[key]
									}
									return (<td className='px-1' key={key}>{value}</td>)
								}
								)}
							</tr>)}
						</tbody>
					</table>
				</div>)}
		</>
	);
}

export default IslandViewer;
