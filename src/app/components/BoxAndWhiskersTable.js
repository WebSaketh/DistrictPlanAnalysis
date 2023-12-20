import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(distanceMeasure, min, low, med, high, max) {
  return { distanceMeasure, min, low, med, high, max };
}

function roundToNearestHundredth(number) {
  return Number(number.toFixed(2));
}

var rows = [
  createData(
    "optimal_transport",
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random())
  ),
  createData(
    "Hamming Distance",
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random())
  ),
  createData(
    "Entropy",
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random()),
    roundToNearestHundredth(Math.random())
  ),
];

const BoxAndWhiskersTable = (props) => {
  if (props.state == "Colorado" && props.ensemble == "Ensemble1") {
    rows = [
      createData(
        "Hamming Distance",
        roundToNearestHundredth(0.0),
        roundToNearestHundredth(0.815),
        roundToNearestHundredth(0.868),
        roundToNearestHundredth(0.921),
        roundToNearestHundredth(1.0)
      ),
    ];
  }
  if (props.state == "Ohio" && props.ensemble == "Ensemble2") {
    rows = [
      createData(
        "Hamming Distance",
        roundToNearestHundredth(0.0),
        roundToNearestHundredth(0.78444),
        roundToNearestHundredth(0.86),
        roundToNearestHundredth(0.92222),
        roundToNearestHundredth(1.0)
      ),
    ];
  }
  if (props.state == "Illinois" && props.ensemble == "Ensemble1") {
    rows = [
      createData(
        "Hamming Distance",
        roundToNearestHundredth(0.0),
        roundToNearestHundredth(0.7943262),
        roundToNearestHundredth(0.867612),
        roundToNearestHundredth(0.9267139),
        roundToNearestHundredth(1.0)
      ),
    ];
  }
  if (props.state == "Ohio" && props.ensemble == "Ensemble1") {
    rows = [
      createData(
        "Optimal Transport",
        roundToNearestHundredth(0.0),
        roundToNearestHundredth(0.460674),
        roundToNearestHundredth(0.561798),
        roundToNearestHundredth(0.651685),
        roundToNearestHundredth(1)
      ),
    ];
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Distance Measure</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Med</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.distanceMeasure}>
              <TableCell component="th" scope="row">
                {row.distanceMeasure}
              </TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.low}</TableCell>
              <TableCell align="right">{row.med}</TableCell>
              <TableCell align="right">{row.high}</TableCell>
              <TableCell align="right">{row.max}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxAndWhiskersTable;
