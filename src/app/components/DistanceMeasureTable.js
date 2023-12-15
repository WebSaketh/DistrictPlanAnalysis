import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const DistanceMeasureTable = (props) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    for (let i = 0; i < props.distanceMeasureInfo.length; i++) {
      let ensembleName = props.distanceMeasureInfo[i].ensembleName;
      if (ensembleName.localeCompare(props.ensembleName) == 0) {
        setIndex(i);
      }
    }
  });
  const handleOnClick = (e) => {
    props.changeDistanceMeasure(e.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Distance Measure</TableCell>
            <TableCell align="right">Number of Clusters</TableCell>
            <TableCell align="right">Normalized Score</TableCell>
          </TableRow>
        </TableHead>
        {!index && (
          <TableBody>
            {props.distanceMeasureInfo[0].distanceMeasureInfo.map((dm) => (
              <TableRow
                key={dm.distanceMeasure}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button
                    value={dm.distanceMeasure}
                    variant="contained"
                    onClick={handleOnClick}
                  >
                    {dm.distanceMeasure}
                  </Button>
                </TableCell>
                <TableCell align="right">{dm.totalClusters}</TableCell>
                <TableCell align="right">{dm.normalizedScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default DistanceMeasureTable;
