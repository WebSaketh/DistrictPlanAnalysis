import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const EnsembleTable = (props) => {
  const handleOnClick = (e) => {
    props.changeEnsemble(e.target.value);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ensemble Name</TableCell>
            <TableCell align="right">Distance Metrics</TableCell>
            <TableCell align="right">Number of Plans</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.ensembleTableInfo.map((ensemble) => (
            <TableRow
              key={ensemble.ensembleName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button
                  value={ensemble.ensembleName}
                  variant="contained"
                  onClick={handleOnClick}
                >
                  {ensemble.ensembleName}
                </Button>
              </TableCell>
              <TableCell align="right">{ensemble.distanceMeasures}</TableCell>
              <TableCell align="right">{ensemble.totalPlans}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EnsembleTable;
