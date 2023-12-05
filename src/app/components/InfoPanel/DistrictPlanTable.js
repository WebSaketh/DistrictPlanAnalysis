import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
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
import { visuallyHidden } from "@mui/utils";

function createData(
  Row,
  DistrictPlanId,
  IsAvailable,
  Democratic,
  Republican,
  White,
  Black,
  Hispanic,
  Asian
) {
  return {
    Row,
    DistrictPlanId,
    IsAvailable,
    Democratic,
    Republican,
    White,
    Black,
    Hispanic,
    Asian,
  };
}

const columns = [
  { id: "Selector", label: "Select", minWidth: 50 },
  { id: "Row", label: "Row", minWidth: 100 },
  {
    id: "DistrictPlanId",
    label: "District Plan Id",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "IsAvailable",
    label: "District Plan Available?",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Democratic",
    label: "Dem Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Republican",
    label: "Rep Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "White",
    label: "White Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Black",
    label: "Black Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Hispanic",
    label: "Hispanic Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Asian",
    label: "Asian Pop.",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const DistrictPlanTable = (props) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    let d = [];
    for (let k = 0; k < props.districtPlanInfo.length; k++) {
      let districtPlan = props.districtPlanInfo[k];
      d.push(
        createData(
          k + 1,
          districtPlan.districtPlanId,
          districtPlan.isAvailable == true ? "yes" : "no",
          districtPlan.clusterDemographics.democratic,
          districtPlan.clusterDemographics.republican,
          districtPlan.clusterDemographics.white,
          districtPlan.clusterDemographics.black,
          districtPlan.clusterDemographics.hispanic,
          districtPlan.clusterDemographics.asian
        )
      );
    }
    setData(d);
  }, [props]);

  const handleClick = (event, id) => {
    if (data[id - 1].IsAvailable === "yes") {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);

      props.changeDistrictPlan(
        newSelected.map((indx) => data[indx - 1].DistrictPlanId)
      );
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.Row);
                  const labelId = `enhanced-table-checkbox-${row.Row}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Row}
                      id={row.Row}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, row.Row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "Selector") {
                          return (
                            <TableCell
                              padding="checkbox"
                              key={column.id}
                              align={column.align}
                            >
                              <Checkbox
                                disabled={row.IsAvailable === "no"}
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default DistrictPlanTable;
