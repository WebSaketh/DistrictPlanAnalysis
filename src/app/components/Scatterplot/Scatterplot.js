import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const width = 800;
const height = 400;

const Scatterplot = (props) => {
  const svgRef = useRef();
  const [hoverCluster, setHoverCluster] = useState(null);
  const [districtPlans, setDistrictPlans] = useState(null);

  useEffect(() => {
    let i = 0;
    const data = Array.from({ length: props.clusters.length }, () => ({
      x: Math.random() * 100, // Random X value between 0 and 100
      y: Math.random() * 100, // Random Y value between 0 and 100
      count: props.clusters[i].districtPlanIds.length,
      clusterId: props.clusters[i++].clusterId,
    }));

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales to map data to SVG coordinates
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([innerHeight, 0])
      .nice();

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([0, 10]);

    // Draw X and Y axes with gridlines and smaller ticks
    const xAxis = d3.axisBottom(xScale).ticks(5);
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle");

    const yAxis = d3.axisLeft(yScale).ticks(5);
    g.append("g").attr("class", "y-axis").call(yAxis);

    // Add gridlines to the chart area
    g.selectAll(".y-axis .tick line")
      .attr("x2", innerWidth) // Extend the gridlines to the right
      .style("stroke", "#f0f0f0"); // Subtle gridline color

    g.selectAll(".x-axis .tick line")
      .attr("y2", -innerHeight) // Extend the gridlines upwards
      .style("stroke", "#f0f0f0"); // Subtle gridline color

    // Create data points with click functionality
    // Create data points with click functionality
    g.selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", (d) => "data-point-" + d.clusterId)
      .attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .attr("r", (d) => radiusScale(d.count))
      .style("cursor", "pointer")
      .style("fill", "steelblue")
      .style("opacity", 0.7)
      .on("mousedown", handleClickedPoint);

    function handleMouseOver(event, d) {
      setHoverCluster(d.clusterId);
      setDistrictPlans(d.count);
    }

    function handleMouseOut() {
      setHoverCluster(null);
      setDistrictPlans(null);
    }

    function handleClickedPoint(event, d) {
      console.log(props.tabValue);
      props.setTabValue(props.tabValue.replace("Cluster", "District Plan"));
      props.onClick(d.clusterId);
    }
  }, [props.clusters]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <p>Cluster: {hoverCluster}</p>
      <p>Number of District Plans: {districtPlans}</p>
    </div>
  );
};

export default Scatterplot;
