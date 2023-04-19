import React from 'react';
import {GoslingComponent} from 'gosling.js';

function IslandViewer() {
	return (
		<>
			<GoslingComponent
				spec={{
					title: 'SARS-CoV-2',
					subtitle: 'Data Source: WashU Virus Genome Browser, NCBI, GISAID',
					assembly: [['NC_045512.2', 29903]],
					layout: 'linear',
					spacing: 50,
					views: [
						{
							alignment: 'overlay',
							title: 'NC_045512.2 Genes',
							data: {
								type: 'csv',
								url: 'https://s3.amazonaws.com/gosling-lang.org/data/COVID/NC_045512.2-Genes.csv',
								chromosomeField: 'Accession',
								genomicFields: ['Start', 'Stop']
							},
							tracks: [
								{
									mark: 'rect',
									color: {value: '#0072B2'},
									stroke: {value: 'white'},
									strokeWidth: {value: 2}
								},
								{
									mark: 'rule',
									color: {value: 'white'},
									opacity: {value: 0.6},
									strokeWidth: {value: 0},
									style: {linePattern: {type: 'triangleRight', size: 10}}
								},
								{
									mark: 'text',
									text: {field: 'Gene symbol', type: 'nominal'},
									color: {value: 'black'},
									stroke: {value: 'white'},
									strokeWidth: {value: 3},
									visibility: [
										{
											target: 'mark',
											measure: 'width',
											threshold: '|xe-x|',
											operation: 'LTET',
											transitionPadding: 30
										}
									]
								},
								{mark: 'brush', x: {linkingId: 'detail'}}
							],
							x: {field: 'Start', type: 'genomic'},
							xe: {field: 'Stop', type: 'genomic'},
							width: 800,
							height: 30,
							static: true,
							layout: 'linear',
							xDomain: {interval: [1, 29903]}
						},
						{
							centerRadius: 0,
							xDomain: {interval: [1, 29903]},
							linkingId: 'detail',
							alignment: 'stack',
							tracks: [
								{
									alignment: 'overlay',
									title: 'NC_045512.2 Genes',
									data: {
										type: 'csv',
										url: 'https://s3.amazonaws.com/gosling-lang.org/data/COVID/NC_045512.2-Genes.csv',
										chromosomeField: 'Accession',
										genomicFields: ['Start', 'Stop']
									},
									tracks: [
										{
											mark: 'rect',
											color: {value: '#0072B2'},
											stroke: {value: 'white'},
											strokeWidth: {value: 2}
										},
										{
											mark: 'rule',
											color: {value: 'white'},
											opacity: {value: 0.6},
											strokeWidth: {value: 0},
											style: {linePattern: {type: 'triangleRight', size: 10}}
										},
										{
											mark: 'text',
											text: {field: 'Gene symbol', type: 'nominal'},
											color: {value: 'black'},
											stroke: {value: 'white'},
											strokeWidth: {value: 3},
											visibility: [
												{
													target: 'mark',
													measure: 'width',
													threshold: '|xe-x|',
													operation: 'LTET',
													transitionPadding: 30
												}
											]
										}
									],
									x: {field: 'Start', type: 'genomic'},
									xe: {field: 'Stop', type: 'genomic'},
									width: 800,
									height: 30
								}
							]
						}
					]
				}}
				experimental={{reactive: true}}
			/>
		</>
	);
}

export default IslandViewer;