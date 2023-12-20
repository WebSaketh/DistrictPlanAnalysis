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
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    // backgroundColor: "#FFC6C4",
    backgroundColor: "#ECECEC",
  },
}));

function createData(
  Row,
  DistrictPlanId,
  IsAvailable,
  DRSplit,
  OpportunityDistricts,
  SwingDistricts,
  BlackDistricts,
  AsianDistricts,
  HispanicDistricts,
  ElectionWinner
) {
  return {
    Row,
    DistrictPlanId,
    IsAvailable,
    DRSplit,
    OpportunityDistricts,
    SwingDistricts,
    BlackDistricts,
    AsianDistricts,
    HispanicDistricts,
    ElectionWinner,
  };
}

const columns = [
  { id: "Selector", label: "View District Plan", minWidth: 50 },
  { id: "Selector2", label: "View Details", minWidth: 50 },
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
    id: "DRSplit",
    label: "D/R Split",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "OpportunityDistricts",
    label: "Opportunity Districts",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "SwingDistricts",
    label: "Swing Districts",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "BlackDistricts",
    label: "Significantly (>1.65x State Avg. Pop.) Black Districts",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AsianDistricts",
    label: "Significantly (>1.65x State Avg. Pop.) Asian Districts",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "HispanicDistricts",
    label: "Significantly (>1.65x State Avg. Pop.) Hispanic Districts",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ElectionWinner",
    label: "Election Winner (2020 Presidential)",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const colors = ["#CF9FFF", "#90EE90", "#ACE5EE", "#FFD580", ,]; // if you change this, must change the colors array in the chart

const DistrictPlanTable = (props) => {
  const selected = props.selected;
  const setSelected = props.setSelected;
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const selectedDistrict = props.selectedDistrict;
  const setSelectedDistrict = props.setSelectedDistrict;

  useEffect(() => {
    let d = [];
    for (let k = 0; k < props.districtPlanInfo.length; k++) {
      let districtPlan = props.districtPlanInfo[k];
      // k = districtPlan.clusterDemographics.republican>districtPlan.clusterDemographics.democrat?"Republican":"Democrat"
      d.push(
        createData(
          k,
          districtPlan.districtPlanID,
          districtPlan.isAvailable,
          districtPlan.clusterDemographics.democrat +
            "/" +
            districtPlan.clusterDemographics.republican,
          districtPlan.clusterDemographics.opportunityDistricts,
          districtPlan.clusterDemographics.swingDistrict,
          districtPlan.clusterDemographics.blackDistricts,
          districtPlan.clusterDemographics.asianDistricts,
          districtPlan.clusterDemographics.hispanicDistrics,
          districtPlan.clusterDemographics.republican >
            districtPlan.clusterDemographics.democrat
            ? "Republican"
            : "Democrat",
          "white"
        )
      );
    }
    setData(d);
  }, [props.districtPlanInfo]);

  const handleClick = (event, id) => {
    if (data[id].IsAvailable === "yes") {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        if (selected.length >= colors.length) return;
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
        newSelected.map((indx) => data[indx].DistrictPlanId)
      );
      for (let i = 0; i < newSelected.length; i++) {
        data[newSelected[i]].Color = colors[i];
      }
    }
  };

  const handleClick2 = (event, id) => {
    if (selectedDistrict === id) {
      setSelectedDistrict(null);
    } else {
      setSelectedDistrict(id);
    }
  };

  const clickButton = () => {
    let newSelected = [];
    for (let i = 0; i < data.length; i++) {
      let comparison = data[i].IsAvailable.localeCompare("yes");
      if (comparison == 0 && newSelected.length < colors.length) {
        newSelected.push(data[i].Row);
      }
    }

    setSelected(newSelected);
    props.changeDistrictPlan(
      newSelected.map((indx) => data[indx].DistrictPlanId)
    );

    for (let i = 0; i < newSelected.length; i++) {
      data[newSelected[i]].Color = colors[i];
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const unselectPlans = () => {
    setSelected([]);
    props.changeDistrictPlan([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clickCompareButton = () => {
    console.log("clicking compare button");
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "#FFC6C4",
                },
                minWidth: 750,
              }}
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
                    let isItemSelected = isSelected(row.Row);
                    let isChecked = row.Row === selectedDistrict;

                    let labelId = `enhanced-table-checkbox-${row.Row}`;
                    let color = row.Color;
                    if (isItemSelected) {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Row}
                          id={row.Row}
                          selected={isItemSelected}
                          style={
                            isSelected
                              ? { backgroundColor: color, opacity: 0.8 }
                              : {}
                          }
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
                                    onClick={(event) =>
                                      handleClick(event, row.Row)
                                    }
                                  />
                                </TableCell>
                              );
                            } else if (column.id === "Selector2") {
                              return (
                                <TableCell
                                  padding="checkbox"
                                  key={column.id}
                                  align={column.align}
                                >
                                  <Checkbox
                                    disabled={
                                      selectedDistrict !== null && !isChecked
                                    }
                                    color="primary"
                                    checked={isChecked}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    onClick={(event) =>
                                      handleClick2(event, row.Row)
                                    }
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
                    } else {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Row}
                          id={row.Row}
                          selected={isItemSelected}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "Row") return;
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
                                    onClick={(event) =>
                                      handleClick(event, row.Row)
                                    }
                                  />
                                </TableCell>
                              );
                            } else if (column.id === "Selector2") {
                              return (
                                <TableCell
                                  padding="checkbox"
                                  key={column.id}
                                  align={column.align}
                                >
                                  <Checkbox
                                    disabled={
                                      selectedDistrict !== null && !isChecked
                                    }
                                    color="primary"
                                    checked={isChecked}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    onClick={(event) =>
                                      handleClick2(event, row.Row)
                                    }
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
                        </StyledTableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Button onClick={clickButton}>View All Available Plans</Button>
      {/*<Button onClick={clickCompareButton}>Compare with enacted</Button>*/}
      <Button onClick={unselectPlans}>Unselect all Plans</Button>
    </div>
  );
};

export default DistrictPlanTable;
