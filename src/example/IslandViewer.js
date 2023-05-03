import React, {useState} from 'react';
import {GoslingComponent} from 'gosling.js';
import {useEffect, useRef} from 'react';

const islandData = {
	data: {
		type: 'csv',
		url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_islands.csv',
		chromosomeField: 'Accession',
		genomicFields: ['Island start', 'Island end']
	},
	x: {field: 'Island start', type: 'genomic'},
	xe: {field: 'Island end', type: 'genomic'},
}
const circularRadius = 200;
const centerRadius = 0.3;
const trackHeight =  circularRadius * (1 - centerRadius) / 5

const linearHeight = 120
const linearSize = linearHeight / 6
const mainComponent = {
	title: 'IslandViewer',
	subtitle: 'Salmonella enterica subsp. enterica serovar Typhi Ty2, complete genome.',
	assembly: [['NC_004631.1', 4791961]],
	spacing: 50,
	views: [
		{
			layout: 'circular',
			data: {
				type: 'csv',
				url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_islands.csv',
				chromosomeField: 'Accession',
				genomicFields: ['Island start', 'Island end']
			},
			static: true,
			alignment: 'overlay',
			tracks: [
				{
					data: {
						url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_annotations.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start']
					},

					dataTransform: [
						{
							type: 'displace',
							method: 'pile',
							boundingBox: {
								padding: 3,
								startField: 'Gene start',
								endField: 'Gene start'
							},
							newField: 'row'
						}
					],
					row: {field: 'row', type: 'nominal'},
					mark: 'point',
					x: {field: 'Gene start', type: 'genomic'},
					size: {value: 3},
					color: {
						field: 'Type',
						type: 'nominal',
						domain: ['Victors', 'BLAST','RGI','PAG'],
						range: ['#460B80', '#A684EA','#FF9CC1','#FF9CC1']
					},
				},
				{
					...islandData,
					dataTransform: [
						{
							type: 'filter', field: 'Method', oneOf: ['Predicted by at least one method']
						},
					],
					y: {value: 0},
					size: {value: 0},
					color: {value: '#B22222'},
					mark: 'rect'
				},
				{
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['IslandPath-DIMOB']},
					],
					...islandData,
					y: {value: 3.5 * trackHeight},
					size: {value: trackHeight},
					color: {value: '#4169E1'},
					mark: 'rect',

				},
				{
					...islandData,
					y: {value: 3.5 * 2 * trackHeight},
					size: {value: trackHeight},
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['SIGI-HMM']},
					],
					color: {value: '#FF8C00'},
					mark: 'rect'
				},
				{
					...islandData,
					y: {value: 3.5 * 3 * trackHeight},
					size: {value: trackHeight},
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['IslandPick']},
					],
					color: {value: '#008001'},
					mark: 'rect'
				},
				{
					...islandData,
					y: {value: 3.5 * 4 * trackHeight},
					size: {value: trackHeight},
					dataTransform: [
						{type: 'filter', field: 'Method', oneOf: ['Islander']},
					],
					color: {value: '#40E0D0'},
					mark: 'rect'
				},
				{
					mark: 'brush', x: {linkingId: 'detail'}
				}
			],
			width: circularRadius*2,
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
						url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_genes_full.csv',
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
				},
				{
					data: {
						url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_genes_full.csv',
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
						url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1_annotations.csv',
						type: 'csv',
						chromosomeField: 'Accession',
						genomicFields: ['Gene start']
					},
					dataTransform: [
						{type: 'filter', field: 'External Annotations', oneOf: [''], not: true},
						{
							type: 'displace',
							method: 'pile',
							boundingBox: {
								padding: 3,
								startField: 'Gene start',
								endField: 'Gene start'
							},
							newField: 'row'
						}
					],
					row: {field: 'row', type: 'nominal'},
					mark: 'point',
					x: {field: 'Gene start', type: 'genomic'},
					size: {value: 3},
					color: {
						field: 'Type',
						type: 'nominal',
						domain: ['Victors', 'BLAST','RGI','PAG'],
						range: ['#460B80', '#A684EA','#FF9CC1','#FF9CC1']
					},
				}],
			width: 400,
			height: linearHeight,
		}
	],
	experimental: {reactive: true}
}

function IslandViewer() {
	const gosRef = useRef(null);
	const [data, setData] =useState([]);

	useEffect(() => {
		if (!gosRef.current) return;
		gosRef.current.api.subscribe('rawData', (type, data) => {
			const viewID=gosRef.current.api.getViewIds()[2]
			const range =gosRef.current.hgApi.api.getLocation(viewID).xDomain
			if(data.data.length>0 && data.id === viewID && 'Gene end' in data.data[0]){
				setData(data.data.filter(entry => entry['Gene start'] > range[0] && entry['Gene start']< range[1] && entry['Gene end']> range[0] && entry['Gene end']< range[1]))
			}
		});
		return () => {
			gosRef.current.api.unsubscribe('rawData');
		}
	}, [gosRef]);
	const tableKeys=['Prediction Method','Gene name', 'Accnum','Product'];
	return (
		<>
			<div style={{width:'50%', display: 'inline-block'}}>
				<GoslingComponent
					ref={gosRef}
					spec={mainComponent}
				/>
			</div>
			{data.length === 0 ? null : (<div  style={{width:'50%', height:screen.height/2, overflowY:'scroll', display: 'inline-block'}}>
				<table className='table-fixed border-collapse border border-slate-400'>
					<thead className='capitalize'>
					    <tr className='border border-slate-300  bg-slate-100'>{tableKeys.map(d => <th className='px-1' key={d}>{d}</th>)}</tr>
					</thead>
					<tbody>
						{data.map(d => <tr className='border border-slate-300' key={JSON.stringify(d)}>{tableKeys.map(key => <td className='px-1' key={d[key]}>{d[key]}</td>)}</tr>)}
					</tbody>
				</table>
			</div>)}
		</>
	);
}

export default IslandViewer;
