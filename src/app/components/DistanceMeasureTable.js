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
  const [index, setIndex] = useState(null);
  useEffect(() => {
    console.log(props.distanceMeasure);
    let index = parseInt(props.ensembleName.slice(8)) - 1;
    console.log(index);
    setIndex(index);
  }, [props.ensembleName, props.distanceMeasure]);
  const handleOnClick = (e) => {
    props.changeDistanceMeasure(e.target.id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: 2 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Distance Measure</TableCell>
            <TableCell align="right">Number of Clusters</TableCell>
            <TableCell align="right">Average D/R Split</TableCell>
            <TableCell align="right">Average Distance </TableCell>
          </TableRow>
        </TableHead>
        {index !== null && (
          <TableBody>
            {props.distanceMeasureInfo[index].distanceMeasureInfo.map((dm) =>
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
                  <TableCell align="right">{dm.avgRDsplit}</TableCell>
                  <TableCell align="right">{dm.averageDistance}</TableCell>
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
                    style={{ color: "blue" }}
                  >
                    {dm.distanceMeasure}
                  </TableCell>
                  <TableCell align="right">{dm.totalClusters}</TableCell>
                  <TableCell align="right">{dm.avgRDsplit}</TableCell>
                  <TableCell align="right">{dm.averageDistance}</TableCell>
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
