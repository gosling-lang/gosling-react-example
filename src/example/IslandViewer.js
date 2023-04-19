import React from 'react';
import {GoslingComponent} from 'gosling.js';

function IslandViewer() {
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
							alignment: 'overlay',
							title: 'Islands',
							layout:'circular',
							data: {
								type: 'tsv',
								url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/NC_004631.1',
								chromosomeField: 'Accession',
								genomicFields: ['Island start', 'Island end']
							},
							tracks: [
								{
									mark: 'rect',
									color: {value: '#0072B2'},
									stroke: {value: 'white'},
									strokeWidth: {value: 2}
								}
							],
							x: {field: 'Island start', type: 'genomic'},
							xe: {field: 'Island end', type: 'genomic'},
							width: 800,
							height: 30,
							static: true,
						}
					]
				}}
				experimental={{reactive: true}}
			/>
		</>
	);
}

export default IslandViewer;
