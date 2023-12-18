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
    props.changeDistanceMeasure(e.target.id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600, border: 2 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Distance Measure</TableCell>
            <TableCell align="right">Number of Clusters</TableCell>
            <TableCell align="right">Normalized Score</TableCell>
          </TableRow>
        </TableHead>
        {!index && (
          <TableBody>
            {props.distanceMeasureInfo[0].distanceMeasureInfo.map((dm) =>
              dm.distanceMeasure === props.distanceMeasure ? (
                <TableRow
                  key={dm.distanceMeasure}
                  sx={{
                    backgroundColor: "#FFC6C4",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell id={dm.distanceMeasure}>
                    {dm.distanceMeasure}
                  </TableCell>
                  <TableCell align="right">{dm.totalClusters}</TableCell>
                  <TableCell align="right">{dm.normalizedScore}</TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={dm.distanceMeasure}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    className="special-table-cell"
                    onClick={handleOnClick}
                    id={dm.distanceMeasure}
                  >
                    {dm.distanceMeasure}
                  </TableCell>
                  <TableCell align="right">{dm.totalClusters}</TableCell>
                  <TableCell align="right">{dm.normalizedScore}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default DistanceMeasureTable;
