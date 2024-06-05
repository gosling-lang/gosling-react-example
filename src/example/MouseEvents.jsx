import React, { useEffect, useMemo, useRef, useState } from "react";
import { GoslingComponent } from "gosling.js";

function MouseEvents() {
  const gosRef = useRef();
  const [position, setPosition] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!gosRef.current) return;
    const localRef = gosRef.current;

    localRef.api.subscribe("click", (_, eventData) => {
      const { genomicPosition: p } = eventData;
      setPosition(`${p.chromosome}:${p.position}`);
      setData(eventData.data);
    });

    localRef.api.subscribe("rangeSelect", (_, eventData) => {
      if (!eventData || !eventData.genomicRange) {
        // range selection cleared
        setPosition("N/A");
        setData([]);
      } else {
        const { genomicRange: p } = eventData;
        if (p.length === 2)
          setPosition(
            `${p[0].chromosome}:${p[0].position}-${p[1].chromosome}:${p[1].position}`
          );
        setData(
          eventData.data.length > 10
            ? eventData.data.slice(0, 10)
            : eventData.data
        );
      }
    });
  }, []);

  const goslingComponent = useMemo(
    () => (
      <GoslingComponent
        ref={gosRef}
        spec={{
          xDomain: { chromosome: "chr3", interval: [52168000, 52890000] },
          tracks: [
            {
              title: "Group Marks By Gene",
              template: "gene",
              data: {
                url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
                type: "beddb",
                genomicFields: [
                  { index: 1, name: "start" },
                  { index: 2, name: "end" },
                ],
                valueFields: [
                  { index: 5, name: "strand", type: "nominal" },
                  { index: 3, name: "name", type: "nominal" },
                ],
                exonIntervalFields: [
                  { index: 12, name: "start" },
                  { index: 13, name: "end" },
                ],
              },
              encoding: {
                startPosition: { field: "start" },
                endPosition: { field: "end" },
                strandColor: { field: "strand", range: ["gray"] },
                strandRow: { field: "strand" },
                opacity: { value: 0.4 },
                geneHeight: { value: 20 },
                geneLabel: { field: "name" },
                geneLabelFontSize: { value: 20 },
                geneLabelColor: { field: "strand", range: ["gray"] },
                geneLabelStroke: { value: "white" },
                geneLabelStrokeThickness: { value: 4 },
                geneLabelOpacity: { value: 1 },
                type: { field: "type" },
              },
              tooltip: [{ field: "name", type: "nominal" }],
              width: 600,
              height: 60,
              experimental: {
                mouseEvents: {
                  mouseOver: true,
                  rangeSelect: true,
                  groupMarksByField: "name",
                },
              },
              style: {
                mouseOver: {
                  arrange: "behind",
                  color: "#E0E0E0",
                  stroke: "#E0E0E0",
                  strokeWidth: 4,
                },
                select: {
                  arrange: "behind",
                  color: "#B9D4FA",
                  stroke: "#B9D4FA",
                  strokeWidth: 4,
                },
              },
            },
          ],
        }}
      />
    ),
    []
  );

  return (
    <div>
      <div style={{ marginTop: 30, marginLeft: 60 }}>
		Hold down the alt or option key to select a range. <br />
        Selected Position: <b>{position ? position : "N/A"}</b>
      </div>
      {goslingComponent}
      {/* Rest of the code */}
    </div>
  );
}

export default MouseEvents;
