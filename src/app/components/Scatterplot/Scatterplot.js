import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Scatterplot = ({ data, width, height, settingDistrictPlan }) => {
  const svgRef = useRef();

  useEffect(() => {
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

    const handleClickedPoint = () => {
      let val = Math.floor(Math.random() * 5);
      if (val == 0) val = 1;
      settingDistrictPlan(val);
    };

    // Create data points with click functionality
    const points = g
      .selectAll(".data-point")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "data-point")
      .attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
      .style("cursor", "pointer")
      .on("click", () => {
        handleClickedPoint();
      });

    // Create '+' symbols for green data points
    points
      .filter((d, i) => i < data.length / 2)
      .append("path")
      .attr("d", d3.symbol().type(d3.symbolCross).size(60)) // Use cross symbol
      .style("fill", "green")
      .style("opacity", 0.7);

    // Create square symbols for red data points
    points
      .filter((d, i) => i >= data.length / 2)
      .append("path")
      .attr("d", d3.symbol().type(d3.symbolSquare).size(60)) // Use square symbol for red
      .style("fill", "red")
      .style("opacity", 0.7);
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
