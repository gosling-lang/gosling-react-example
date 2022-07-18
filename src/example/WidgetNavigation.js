import React, { useRef } from 'react';
import { GoslingComponent } from 'gosling.js';

const CHRS = [
	'chr1',
	'chr2',
	'chr3',
	'chr4',
	'chr5',
	'chr6',
	'chr7',
	'chr8',
	'chr9',
	'chr10',
	'chr11',
	'chr12',
	'chr13',
	'chr14',
	'chr15',
	'chr16',
	'chr17',
	'chr18',
	'chr19',
	'chr20',
	'chr21',
	'chr22',
	'chrX',
	'chrY',
];

function WidgetNavigation() {

	const gosRef = useRef();

	return (
		<>
			<div style={{ marginTop: 30, marginLeft: 80 }}>
				{'Zoom To Chromosome: '}
				<select name="Chromosome" onChange={(e) => gosRef.current?.api.zoomTo('navigation-track-id', e.currentTarget.value, 0, 1000)}>
					{CHRS.map(d => <option key={d} value={d}>{d}</option>)}
				</select>
			</div>

			<div style={{ marginTop: 30, marginLeft: 80 }}>
				{'Zoom To Gene: '}
				<button className='mr-3 p-1 rounded bg-slate-200' onClick={() => gosRef.current?.api.zoomToGene('navigation-track-id', 'MYC', 3000, 1000)}>MYC</button>
				<button className='mr-3 p-1 rounded bg-slate-200' onClick={() => gosRef.current?.api.zoomToGene('navigation-track-id', 'CCNK', 3000, 1000)}>CCNK</button>
			</div>

			<div style={{ marginTop: 30, marginLeft: 80 }}>
				<button className='mr-3 p-1 rounded bg-slate-200' onClick={() => gosRef.current?.api.zoomToExtent('navigation-track-id', 1000)}>Zoom To Extent</button>
			</div>

			<GoslingComponent
				ref={gosRef}
				spec={{ 
					style: { outlineWidth: 0 },
					xDomain: { chromosome: 'chr1' },
					spacing: 0,
					tracks: [
						{
							id: 'navigation-track-id',
							template: 'gene',
							data: {
								url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
								type: 'beddb',
								genomicFields: [
									{index: 1, name: 'start'},
									{index: 2, name: 'end'}
								],
								valueFields: [
									{index: 5, name: 'strand', type: 'nominal'},
									{index: 3, name: 'name', type: 'nominal'}
								],
								exonIntervalFields: [
									{index: 12, name: 'start'},
									{index: 13, name: 'end'}
								]
							},
							encoding: {
								startPosition: {field: 'start', axis: 'none'},
								endPosition: {field: 'end'},
								strandColor: {field: 'strand', range: ['gray']},
								strandRow: {field: 'strand'},
								opacity: {value: 0.4},
								geneHeight: {value: 15},
								geneLabel: {field: 'name'},
								geneLabelFontSize: {value: 30},
								geneLabelColor: {field: 'strand', range: ['gray']},
								geneLabelStroke: {value: 'white'},
								geneLabelStrokeThickness: {value: 4},
								geneLabelOpacity: {value: 1},
								type: {field: 'type'}
							},
							width: 1000,
							height: 40
						},
						{
							data: {
								url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec',
								type: 'multivec',
								row: 'sample',
								column: 'position',
								value: 'peak',
								categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4']
							},
							mark: 'area',
							x: {field: 'position', type: 'genomic'},
							y: {field: 'peak', type: 'quantitative', axis: 'none'},
							color: {field: 'sample', type: 'nominal'},
							width: 1000,
							height: 30
						},
						{
							alignment: 'overlay',
							data: {
								url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/cytogenetic_band.csv',
								type: 'csv',
								chromosomeField: 'Chr.',
								genomicFields: [
									'ISCN_start',
									'ISCN_stop',
									'Basepair_start',
									'Basepair_stop'
								]
							},
							tracks: [
								{
									mark: 'text',
									dataTransform: [
										{
											type: 'filter',
											field: 'Stain',
											oneOf: ['acen-1', 'acen-2'],
											not: true
										}
									],
									text: {field: 'Band', type: 'nominal'},
									color: {value: 'black'},
									strokeWidth: {value: 0},
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
									mark: 'rect',
									dataTransform: [
										{
											type: 'filter',
											field: 'Stain',
											oneOf: ['acen-1', 'acen-2'],
											not: true
										}
									],
									color: {
										field: 'Density',
										type: 'nominal',
										domain: ['', '25', '50', '75', '100'],
										range: ['white', '#D9D9D9', '#979797', '#636363', 'black']
									}
								},
								{
									mark: 'rect',
									dataTransform: [
										{type: 'filter', field: 'Stain', oneOf: ['gvar']}
									],
									color: {value: '#A0A0F2'}
								},
								{
									mark: 'triangleRight',
									dataTransform: [
										{type: 'filter', field: 'Stain', oneOf: ['acen-1']}
									],
									color: {value: '#B40101'}
								},
								{
									mark: 'triangleLeft',
									dataTransform: [
										{type: 'filter', field: 'Stain', oneOf: ['acen-2']}
									],
									color: {value: '#B40101'}
								}
							],
							x: {field: 'Basepair_start', type: 'genomic', axis: 'bottom'},
							xe: {field: 'Basepair_stop', type: 'genomic'},
							stroke: {value: 'gray'},
							strokeWidth: {value: 1},
							width: 1000,
							height: 20
						}
					]
				}}
				experimental={{ reactive: true }}
			/>
		</>
	);
}

export default WidgetNavigation;
