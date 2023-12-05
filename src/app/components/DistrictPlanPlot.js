import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const width = 1000;
const height = 600;

const DistrictPlanPlot = (props) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [hoverDistrictPlan, setHoverDistrictPlan] = useState(null);
  useEffect(() => {
    let i = 0;
    const data2 = Array.from({ length: props.districtPlanInfo.length }, () => ({
      x: Math.random() * 100, // Random X value between 0 and 100
      y: Math.random() * 100, // Random Y value between 0 and 100
      isAvailable: props.districtPlanInfo[i].isAvailable,
      districtPlanId: props.districtPlanInfo[i++].districtPlanId,
    }));

    setData(data2);

    // Create '+' symbols for green data points
  }, []);

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

  // Create data points with click functionality
  const points = g
    .selectAll(".data-point")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "data-point")
    .attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .style("cursor", "pointer");

  points
    .filter((d) => d.isAvailable)
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolCross).size(60)) // Use cross symbol
    .style("fill", "green")
    .style("opacity", 0.7)
    .on("mousedown", handleClickedPoint);

  // Create square symbols for red data points
  points
    .filter((d) => !d.isAvailable)
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolSquare).size(60)) // Use square symbol for red
    .style("fill", "red")
    .style("opacity", 0.7);

  function handleMouseOver(event, d) {
    setHoverDistrictPlan(d.districtPlanId);
  }

  function handleMouseOut() {
    setHoverDistrictPlan(null);
  }

  function handleClickedPoint(event, d) {
    var t = d.districtPlanId;
    var p = [...props.districtPlan];
    var q = [...props.selected];

    var x = 0;
    for (x = 0; x < props.districtPlanInfo.length; x++) {
      if (props.districtPlanInfo[x].districtPlanId == t) {
        x++;
        break;
      }
    }

    if (q.indexOf(x) != -1) {
      q.splice(q.indexOf(x), 1);
      props.setSelected(q);
    } else {
      q.push(x);
      props.setSelected(q);
    }

    if (p.indexOf(t) != -1) {
      p.splice(p.indexOf(t), 1);
      props.changeDistrictPlan(p);
    } else {
      p.push(t);
      props.changeDistrictPlan(p);
    }
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
      <p>District Plan: {hoverDistrictPlan}</p>
    </div>
  );
};

export default DistrictPlanPlot;
