import React from 'react';
import {GoslingComponent} from 'gosling.js';

function IslandViewer() {
	const islandTracks = [
		{
			dataTransform: [
				{
					type: 'filter',
					field: 'Method',
					oneOf: ['Predicted by at least one method']
				},
			],
			color: {value: 'red'},
		},
		{
			dataTransform: [
				{type: 'filter', field: 'Method', oneOf: ['IslandPath-DIMOB']},
			],
			color: {value: 'blue'},
		},
		{
			dataTransform: [
				{type: 'filter', field: 'Method', oneOf: ['SIGI-HMM']},
			],
			color: {value: 'orange'},
		},
		{
			dataTransform: [
				{type: 'filter', field: 'Method', oneOf: ['IslandPick']},
			],
			color: {value: 'green'},
		},
		{
			dataTransform: [
				{type: 'filter', field: 'Method', oneOf: ['Islander']},
			],
			color: {value: 'turquoise'},
		},
	];
	return (
		<>
			<GoslingComponent
				spec={{
					title: 'IslandViewer',
					subtitle: 'Salmonella enterica subsp. enterica serovar Typhi Ty2, complete genome.',
					assembly: [['NC_004631.1', 4791961]],
					spacing: 50,
					views: [
						{
							layout: 'circular',
							data: {
								url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1.csv',
								type: 'csv',
								chromosomeField: 'Accession',
								genomicFields: ['Island start', 'Island end']
							},
							tracks: [
								{
									dataTransform: [
										{
											type: 'filter',
											field: 'Method',
											oneOf: ['Predicted by at least one method']
										},
									], color: {value: 'red'}, mark: 'rect'
								},
								{
									mark: 'brush', x: {linkingId: 'detail'}
								}],
							x: {field: 'Island start', type: 'genomic'},
							xe: {field: 'Island end', type: 'genomic'},
							mark: 'rect',
							width: 800,
						},
						{
							layout: 'circular',
							data: {
								type: 'csv',
								url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1.csv',
								chromosomeField: 'Accession',
								genomicFields: ['Island start', 'Island end']
							},
							linkingId: 'main',
							tracks: [
								{
									dataTransform: [
										{
											type: 'filter', field: 'Method', oneOf: ['Predicted by at least one method']
										},
									],
									alignment: 'overlay',
									tracks: [
										{color: {value: 'red'}},
										{
											mark: 'brush', x: {linkingId: 'detail'}
										}
									]
								},
								{
									dataTransform: [
										{type: 'filter', field: 'Method', oneOf: ['IslandPath-DIMOB']},
									],
									alignment: 'overlay',
									tracks: [
										{color: {value: 'blue'}},
										{
											mark: 'brush', x: {linkingId: 'detail'}
										}
									]
								},
								{
									dataTransform: [
										{type: 'filter', field: 'Method', oneOf: ['SIGI-HMM']},
									],
									alignment: 'overlay',
									tracks: [
										{color: {value: 'orange'}},
										{
											mark: 'brush', x: {linkingId: 'detail'}
										}
									]
								},
								{
									dataTransform: [
										{type: 'filter', field: 'Method', oneOf: ['IslandPick']},
									],
									alignment: 'overlay',
									tracks: [
										{color: {value: 'green'}},
										{
											mark: 'brush', x: {linkingId: 'detail'}
										}
									]
								},
								{
									dataTransform: [
										{type: 'filter', field: 'Method', oneOf: ['Islander']},
									],
									alignment: 'overlay',
									tracks: [
										{color: {value: 'turquoise'}},
										{
											mark: 'brush', x: {linkingId: 'detail'},
										},
									]
								},
							],
							x: {field: 'Island start', type: 'genomic'},
							xe: {field: 'Island end', type: 'genomic'},
							mark: 'rect',
							width: 800,
							height: 10,
						},
						{
							layout: 'linear',
							xDomain: {chromosome: 'NC_004631.1', interval: [0, 100000]},
							linkingId: 'detail',
							data: {
								url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1.csv',
								type: 'csv',
								chromosomeField: 'Accession',
								genomicFields: ['Island start', 'Island end']
							},
							tracks: islandTracks,
							x: {field: 'Island start', type: 'genomic'},
							xe: {field: 'Island end', type: 'genomic'},
							mark: 'rect',
							width: 800,
							height: 50,
						}
					]
				}}
			/>
		</>
	);
}

export default IslandViewer;
