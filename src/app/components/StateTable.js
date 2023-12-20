import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

const ohioData = {
  state: "Ohio",
  rep: 53.27,
  dem: 45.24,
  white: 77.3,
  black: 13.3,
  hispanic: 4.5,
  asian: 2.7,
  other: 2.2,
};
const coloradoData = {
  state: "Colorado",
  rep: 41.9,
  dem: 55.4,
  white: 66.5,
  black: 4.7,
  hispanic: 22.5,
  asian: 3.8,
  other: 2.5,
};

const illinoisData = {
  state: "Illinois",
  rep: 40.6,
  dem: 57.5,
  white: 59.5,
  black: 14.7,
  hispanic: 18.3,
  asian: 6.3,
  other: 1.2,
};

const StateTable = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.state === "Colorado") {
      setData(coloradoData);
    } else if (props.state === "Ohio") {
      setData(ohioData);
    } else if (props.state === "Illinois") {
      setData(illinoisData);
    }
  }, [props.state]);
  return (
    <div>
      <Box sx={{ maxWidth: "600px", width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"small"}
              sx={{ border: 2 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>Rep. %</TableCell>
                  <TableCell>Dem. %</TableCell>
                  <TableCell>White %</TableCell>
                  <TableCell>Black %</TableCell>
                  <TableCell>Hispanic %</TableCell>
                  <TableCell>Asian %</TableCell>
                  <TableCell>Other %</TableCell>
                </TableRow>
              </TableHead>
              {data !== null ? (
                <TableBody>
                  <TableRow>
                    <TableCell>{data.state}</TableCell>
                    <TableCell align="left">{data.rep}</TableCell>
                    <TableCell align="left">{data.dem}</TableCell>
                    <TableCell align="left">{data.white}</TableCell>
                    <TableCell align="left">{data.black}</TableCell>
                    <TableCell align="left">{data.hispanic}</TableCell>
                    <TableCell align="left">{data.asian}</TableCell>
                    <TableCell align="left">{data.other}</TableCell>
                  </TableRow>
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};
export default StateTable;
