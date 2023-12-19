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
  rep: 45,
  dem: 55,
  white: 35,
  black: 23,
  hispanic: 13,
  asian: 15,
};
const coloradoData = {
  state: "Colorado",
  rep: 53,
  dem: 47,
  white: 75,
  black: 12,
  hispanic: 4,
  asian: 6,
};
const illinoisData = {
  state: "Illinois",
  rep: 34,
  dem: 66,
  white: 64,
  black: 20,
  hispanic: 7,
  asian: 10,
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
      <Box sx={{ width: "100%" }}>
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
                </TableRow>
              </TableHead>
              {data !== null ? (
                <TableBody>
                  <TableRow>
                    <TableCell>{data.state}</TableCell>
                    <TableCell align="center">{data.rep}</TableCell>
                    <TableCell align="center">{data.dem}</TableCell>
                    <TableCell align="center">{data.white}</TableCell>
                    <TableCell align="center">{data.black}</TableCell>
                    <TableCell align="center">{data.hispanic}</TableCell>
                    <TableCell align="centers">{data.asian}</TableCell>
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
