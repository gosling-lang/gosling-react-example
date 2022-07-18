import React, { useEffect, useRef, useState } from 'react';
import { GoslingComponent } from 'gosling.js';

function MouseEvents() {

	const gosRef = useRef();
	const [position, setPosition] = useState();
	const [data, setData] = useState([]);

	useEffect(() => {
		if(!gosRef.current) return;

		gosRef.current.api.subscribe('click', (_, eventData) => {
			const { genomicPosition: p } = eventData;
			setPosition(`${p.chromosome}:${p.position}`)
			setData(eventData.data);
		});

		gosRef.current.api.subscribe('rangeSelect', (_, eventData) => {
			if(!eventData || !eventData.genomicRange) {
				// range selection cleared
				setPosition('N/A');
				setData([]);
			} else {
				const { genomicRange: p } = eventData;
				if(p.length === 2) setPosition(`${p[0].chromosome}:${p[0].position}-${p[1].chromosome}:${p[1].position}`);
				setData(eventData.data.length > 10 ? eventData.data.slice(0, 10) : eventData.data);
			}
		});

		return () => {
			gosRef.current.api.unsubscribe('click');
			gosRef.current.api.unsubscribe('rangeSelect');
		}
	}, [gosRef]);

	return (
		<div>
			<div style={{ marginTop: 30, marginLeft: 80 }}>
				Selected Position: {position ? position : 'N/A'}
			</div>
			<GoslingComponent
				ref={gosRef}
				spec={{ 
					style: { 
						outlineWidth: 0,
						select: { color: 'grey' },
						mouseOver: { stroke: 'black', strokeWidth: 1 }
					},
					xDomain: {chromosome: '1', interval: [136750, 139450]},
					spacing: 0,
					tracks: [
						{
							title: 'Click or mouse drag w/ ALT',
							experimental: { mouseEvents: true },
							data: {
								type: 'bam',
								url: 'https://somatic-browser-test.s3.amazonaws.com/SRR7890905_GAPFI2USVS21.bam',
								indexUrl: 'https://somatic-browser-test.s3.amazonaws.com/SRR7890905_GAPFI2USVS21.bam.bai'
							},
							mark: 'rect',
							dataTransform: [
								{
									type: 'displace',
									method: 'pile',
									boundingBox: {
										startField: 'start',
										endField: 'end',
										padding: 5,
										isPaddingBP: true
									},
									newField: 'pileup-row'
								}
							],
							x: {field: 'start', type: 'genomic'},
							xe: {field: 'end', type: 'genomic'},
							color: { value: 'lightgrey' },
							tooltip: [
								{field: 'start', type: 'genomic'},
								{field: 'end', type: 'genomic'},
								{field: 'strand', type: 'nominal'},
							],
							row: {field: 'pileup-row', type: 'nominal', padding: 0.2},
							width: 500,
							height: 400
						}
					]
				}}
				experimental={{ reactive: true }}
			/>
			{data.length === 0 ? null : (<div  className='mx-[60px]'>
				<table className='table-fixed border-collapse border border-slate-400'>
					<thead className='capitalize'>
					    <tr className='border border-slate-300  bg-slate-100'>{Object.keys(data[0]).map(d => <th className='px-1' key={d}>{d}</th>)}</tr>
					</thead>
					<tbody>
						{data.map(d => <tr className='border border-slate-300' key={JSON.stringify(d)}>{Object.entries(d).map(datum => <td className='px-1' key={datum[0]}>{datum[1]}</td>)}</tr>)}
					</tbody>
				</table>
			</div>)}
		</div>
	);
}

export default MouseEvents;
