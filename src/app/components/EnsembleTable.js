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
    props.changeEnsemble(e.target.id);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: 2 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ensemble Name</TableCell>
            <TableCell align="right">Distance Metrics</TableCell>
            <TableCell align="right">Number of Plans</TableCell>
            <TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.ensembleTableInfo.map((ensemble) => (
            <TableRow
              key={ensemble.ensembleName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="special-table-cell">
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#990001",
                    color: "white",
                    fontSize: "12px",
                  }}
                  onClick={handleOnClick}
                  id={ensemble.ensembleName}
                >
                  {ensemble.ensembleName}
                </Button>
              </TableCell>
              <TableCell align="right">{ensemble.distanceMeasures}</TableCell>
              <TableCell align="right">{ensemble.totalPlans}</TableCell>
              <TableCell align="right">{ensemble.dateCreated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EnsembleTable;
