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

    // Links: adding lines between nodes
    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 1)
      .attr("opacity", 0.6)
      .attr("transition", "all 0.3s ease")  // Smooth transition on creation
      .on("mouseover", function (event) {
        d3.select(this).attr("stroke", "#ff7f0e").attr("stroke-width", 2); // Hover effect
      })
      .on("mouseout", function (event) {
        d3.select(this).attr("stroke", "#999").attr("stroke-width", 1); // Revert on mouse out
      });

    // Nodes: adding circles for each node
    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "steelblue")
      .attr("transition", "all 0.5s ease") // Animation on node creation
      .on("mouseover", function (event) {
        d3.select(this).attr("r", 15).attr("fill", "#ff7f0e"); // Hover effect
      })
      .on("mouseout", function (event) {
        d3.select(this).attr("r", 10).attr("fill", "steelblue"); // Revert on mouse out
      });

    node.append("title").text((d) => d.name);

    // Labels for nodes
    const label = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("fill", "#333");

    // Animation for the graph appearance
    const nodeAnimation = node
      .transition()
      .duration(1000)
      .attr("r", 12) // Slightly grow the node size during animation
      .ease(d3.easeElastic);

    // Simulation tick handler
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 4);
    });

    // Dynamically animate the link thickness based on the amount value
    link
      .transition()
      .duration(500)
      .attr("stroke-width", (d) => Math.sqrt(d.amount) + 1);

  }, [minimizedFlow]);

  return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default GraphVisualization;
