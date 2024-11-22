// src/components/GraphVisualization.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ minimizedFlow }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600,
      height = 400;

    // Define nodes and links
    const nodes = Array.from(
      new Set(minimizedFlow.flatMap((d) => [d.payer, d.payee]))
    ).map((name) => ({ name }));
    const links = minimizedFlow.map((d) => ({
      source: d.payer,
      target: d.payee,
      amount: d.amount,
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.name)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", (d) => Math.sqrt(d.amount));

    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "steelblue");

    node.append("title").text((d) => d.name);

    const label = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 12);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 4);
    });
  }, [minimizedFlow]);

  return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default GraphVisualization;
