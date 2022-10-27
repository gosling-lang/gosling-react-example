import React from 'react';
import { GoslingComponent } from 'gosling.js';

function SimpleExample() {
	return (
		<>
			<GoslingComponent
				spec={{
					tracks: [{
						id: 'heatmap-track',
						data: {
							url: 'https://raw.githubusercontent.com/ThHarbig/gosling-react/master/proteins_167_161521.csv',
							type: 'csv',
							chromosomeField: 'Locus tag',
							genomicFields: ['Start', 'Stop']
						},
						mark: 'rect',
						width: 600,
						height: 130
					}]
				}}
				experimental={{ reactive: true }}
			/>
		</>
	);
}

export default SimpleExample;
