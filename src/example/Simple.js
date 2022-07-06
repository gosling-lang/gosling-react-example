import React from 'react';
import { GoslingComponent } from 'gosling.js';

function SimpleExample() {
  return (
    <>
      <GoslingComponent
        spec={{ 
            tracks: [{
                id: "heatmap-track",
                data: {
                    url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
                    type: "multivec",
                    row: "sample",
                    column: "position",
                    value: "peak",
                    categories: ["sample 1", "sample 2", "sample 3", "sample 4"],
                    binSize: 4
                },
                mark: 'rect',
                x: { "field": "start", "type": "genomic" },
                xe: { "field": "end", "type": "genomic" },
                row: { "field": "sample", "type": "nominal", "legend": true },
                color: { "field": "peak", "type": "quantitative", "legend": true, range: 'pink' },
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
