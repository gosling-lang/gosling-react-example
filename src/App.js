import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import * as gosling from 'gosling.js';

const goslingSpec = (domain, mark, binSize, height, hoveredSample) => { 
  return {
    "layout": "linear",
    "arrangement": "vertical",
    "centerRadius": 0.8,
    "xDomain": {"chromosome": "1", "interval": [1, 3000500]},
    "views": [
      {
        "tracks": [
          {
            "id": "track-1",
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1", "sample 2", "sample 3", "sample 4"],
              binSize: binSize === 0 ? 1 : binSize
            },
            "mark": mark,
            "x": {"field": "start", "type": "genomic", "axis": "top"},
            "xe": {"field": "end", "type": "genomic"},
            "row": {"field": "sample", "type": "nominal", "legend": true},
            "color": {"field": "peak", "type": "quantitative", "legend": true, domain},
            "tooltip": [
              {"field": "start", "type": "genomic", "alt": "Start Position"},
              {"field": "end", "type": "genomic", "alt": "End Position"},
              {
                "field": "peak",
                "type": "quantitative",
                "alt": "Value",
                "format": ".2"
              },
              {"field": "sample", "type": "nominal", "alt": "Sample"}
            ],
            "width": 600,
            height
          },
          {
            alignment: "overlay",
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
            "x": {"field": "position", "type": "genomic", "axis": "top"},
            "y": {"field": "peak", "type": "quantitative" },
            opacity: { value: 0.6 },
            // "row": {"field": "sample", "type": "nominal", "legend": true},
            tracks: [
              { 
                "id": "track-2",
                "color": { "value": "lightgray" } 
              },
              { 
                "id": "track-3",
                dataTransform: [
                  { type: 'filter', field: 'sample', oneOf: [hoveredSample] }
                ],
                "color": { "value": "steelblue" } 
              },
            ],
            "width": 600,
            height
          }
        ]
      },
    ]
  }
};

function App() {

  const gosRef = useRef(null);

  const [min, setMin] = useState(0);
  const [height, setHeight] = useState(130);
  const [mark, setMark] = useState('rect');
  const [binSize, setBinSize] = useState(0);
  const [hoveredSample, setHoveredSample] = useState();

  useEffect(() => {
    if (!gosRef.current) return;

    gosRef.current.api.subscribe(
      "mouseover",
      (type, e) => {
        setHoveredSample(e.data.sample);
      }
    );

    gosRef.current.api.subscribe(
      "mouseleave",
      (type, e) => {
        setHoveredSample();
      }
    );

    return () => gosRef.current.api.unsubscribe("mouseover");
  }, [gosRef]);

  return (
    <>
      <span>
        <div style={{marginTop: 30, marginLeft: 80}}>
          Bin Size:
          <input 
            type="range" 
            min={0}
            max={32}
            step={4} 
            value={binSize}
            className="slider" 
            id="bin-slider" 
            style={{ width: 100, display: 'inline', margin: 10}}
            onChange={(e) => setBinSize(+e.currentTarget.value) }
          />
          {binSize === 0 ? 1 : binSize}
        </div>
        <div style={{marginLeft: 80}}>
          Color Min Value:
          <input 
            type="range" 
            min={0}
            max={0.001}
            step={0.0001} 
            value={min}
            className="slider" 
            id="min-slider" 
            style={{ width: 100, display: 'inline', margin: 10}}
            onChange={(e) => setMin(e.currentTarget.value) }
          />
          {min}
        </div>
        {/* <div style={{marginLeft: 80}}>
          Height:
          <input 
            type="range" 
            min={130}
            max={300}
            step={10} 
            value={height}
            className="slider" 
            id="height-slider" 
            style={{ width: 100, display: 'inline', margin: 10}}
            onChange={(e) => setHeight(e.currentTarget.value) }
          />
          {height}
        </div> */}
      </span>
      <div style={{marginTop: 30, marginLeft: 80}}>
        Mark:
        <select name="mark" onChange={(e) => setMark(e.currentTarget.value)}>
          <option value="rect">rect</option>
          <option value="point">point</option>
        </select>
      </div>
      <gosling.GoslingComponent
        ref={gosRef}
        spec={goslingSpec([+min, 0.001], mark, binSize, height, hoveredSample)}
        experimental={{ reactive: true }}
      />
    </>
  );
}

export default App;
