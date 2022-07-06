import React, { useEffect, useState, useRef } from 'react';
import { debounce } from "lodash";
import { GoslingComponent } from 'gosling.js';
import { VegaLite } from 'react-vega'

const goslingSpec = (mark, binSize) => {
  return {
    layout: "linear",
    arrangement: "vertical",
    centerRadius: 0.8,
    xDomain: { chromosome: "1" },
    style: {
      select: { color: 'black', stroke: 'black', strokeWidth: 6, arrange: 'behind', opacity: 0.1 }
    },
    views: [
      {
        tracks: [
          {
            title: 'ALT + Mouse Drag For Range Selection',
            "id": "scatterplot-track",
            experimental: { mouseEvents: true },
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1", "sample 2", "sample 3", "sample 4"],
              binSize: binSize === 0 ? 1 : binSize
            },
            "mark": 'point',
            "x": { "field": "position", "type": "genomic" },
            "y": { "field": "peak", "type": "quantitative" },
            size: { "field": "peak", "type": "quantitative" },
            color: { "field": "sample", "type": "nominal", "legend": true },
            "width": 600,
            height: 330
          },
          {
            id: "heatmap-track",
            data: {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1", "sample 2", "sample 3", "sample 4"],
              binSize: binSize === 0 ? 1 : binSize
            },
            "mark": mark,
            "x": { "field": "start", "type": "genomic" },
            "xe": { "field": "end", "type": "genomic" },
            "row": { "field": "sample", "type": "nominal", "legend": true },
            "color": { "field": "peak", "type": "quantitative", "legend": true, range: 'pink' },
            "tooltip": [
              { "field": "start", "type": "genomic", "alt": "Start Position" },
              { "field": "end", "type": "genomic", "alt": "End Position" },
              {
                "field": "peak",
                "type": "quantitative",
                "alt": "Value",
                "format": ".2"
              },
              { "field": "sample", "type": "nominal", "alt": "Sample" }
            ],
            "width": 600,
            height: 130
          }
        ]
      },
    ]
  }
};

const vegaLiteSpec = {
  width: 450,
  height: 400,
  mark: 'bar',
  encoding: {
    x: { field: 'peak', type: 'ordinal', bin: true },
    y: { field: 'peak', type: 'quantitative', aggregate: 'count' },
    color: { field: 'sample', type: 'nominal', scale: { domain: ['sample 1', 'sample 2', 'sample 3', 'sample 4'], range: ['#E79F00', '#029F73', '#0072B2', '#CB7AA7'] }}
  },
  data: { name: 'table' }
};

function VegaLiteExample() {
  const gosRef = useRef(null);

  const [mark, setMark] = useState('rect');
  const [binSize, setBinSize] = useState(0);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    if (!gosRef.current) return;

    gosRef.current.api.subscribe(
      "rangeSelect",
      debounce((type, e) => {
        setSelectedData(e.data);
      }, 0)
    );

    return () => gosRef.current.api.unsubscribe("rangeSelect");
  }, [gosRef]);

  return (
    <>
      <span>
        <div style={{ marginTop: 30, marginLeft: 80 }}>
          {'Bin Size: '}
          <input
            type="range"
            min={0}
            max={32}
            step={4}
            value={binSize}
            className="slider"
            id="bin-slider"
            style={{ width: 100, display: 'inline', margin: 10 }}
            onChange={(e) => setBinSize(+e.currentTarget.value)}
          />
          {binSize === 0 ? 1 : binSize}
        </div>
      </span>
      <div style={{ marginTop: 30, marginLeft: 80 }}>
        {'Heatmap Mark: '}
        <select name="mark" onChange={(e) => setMark(e.currentTarget.value)}>
          <option value="rect">rect</option>
          <option value="point">point</option>
        </select>
      </div>

      <GoslingComponent
        ref={gosRef}
        spec={goslingSpec(mark, binSize)}
        experimental={{ reactive: true }}
      />

      <div style={{ marginLeft: 80 }}>
        <VegaLite spec={vegaLiteSpec} data={{ table: selectedData }} />
      </div>
    </>
  );
}

export default VegaLiteExample;
