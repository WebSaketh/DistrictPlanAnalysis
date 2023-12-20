import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(distanceMeasure, min, low, med, high, max) {
  return { distanceMeasure, min, low, med, high, max };
}

function roundToNearestHundredth(number) {
  return Number(number.toFixed(2));
}

const rows = [
  createData('optimal_transport', roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random())),
  createData('Hamming Distance', roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random())),
  createData('Entropy', roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random()), roundToNearestHundredth(Math.random())),
];

const BoxAndWhiskersTable = () => {
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
