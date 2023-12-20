import { useState, useEffect } from "react";
import ClusterCard from "./ClusterCard";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    // backgroundColor: "#FFC6C4",
    backgroundColor: "#ECECEC",
  },
}));

const styles = (theme) => ({
  tableRow: {
    "&:hover": {
      backgroundColor: "blue !important",
    },
  },
});

const columns = [
  { id: "Selector", label: "Display Average DP", minWidth: 50 },
  {
    id: "ClusterId",
    label: "ClusterId",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DistrictPlanCount",
    label: "District Plan Count",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgDistrictPlanDistance",
    label: "Avg. Distance Between Plans",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DRSplit",
    label: "Avg. D/R Split",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgOpportunityDistricts",
    label: "Avg Opportunity Districts",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgSwingDistricts",
    label: "Avg Swing Districts",
    maxWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgSigBlackDistricts",
    label: "Avg Sig. Black Districts",
    maxWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgSigAsianDistricts",
    label: "Avg Sig. Asian Districts",
    maxWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgSigHispanicDistricts",
    label: "Avg Sig. Hispanic Districts",
    maxWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  Row,
  ClusterId,
  DistrictPlanCount,
  AvgDistrictPlanDistance,
  DRSplit,
  AvgOpportunityDistricts,
  AvgSwingDistricts,
  AvgSigBlackDistricts,
  AvgSigAsianDistricts,
  AvgSigHispanicDistricts
) {
  return {
    Row,
    ClusterId,
    DistrictPlanCount,
    AvgDistrictPlanDistance,
    DRSplit,
    AvgOpportunityDistricts,
    AvgSwingDistricts,
    AvgSigBlackDistricts,
    AvgSigAsianDistricts,
    AvgSigHispanicDistricts,
  };
}

const ClusterTable = (props) => {
  const selected = props.selected;
  const setSelected = props.setSelected;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  var factor = 1;
  if (props.state == "Colorado") {
    factor = 475;
  }
  if (props.state == "Illinois") {
    factor = 475;
  }
  if (props.state == "Ohio") {
    factor = 85;
    if (props.distanceMeasure == "Hamming Distance") {
      factor = 475;
    }
  }
  useEffect(() => {
    let d = [];
    for (let k = 0; k < props.clusters.length; k++) {
      let cluster = props.clusters[k];
      d.push(
        createData(
          k + 1,
          "Cluster " + cluster.clusterID,
          cluster.districtPlanIDs.length,
          cluster.clusterDemographics.avgDistance,
          Math.round(cluster.clusterDemographics.avgDem * 100) / 100 +
            "/" +
            Math.round(cluster.clusterDemographics.avgRep * 100) / 100,
          cluster.clusterDemographics.avgOpportunityDistricts,
          cluster.clusterDemographics.avgSwingDistricts,
          cluster.clusterDemographics.avgBlackDistricts * factor,
          cluster.clusterDemographics.avgAsianDistricts * factor,
          cluster.clusterDemographics.avgHispanicDistricts * factor
        )
      );
    }
    setData(d);
  }, [props.clusters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClusterClick = (event) => {
    let clusterId = event.currentTarget.id.slice(8);
    props.setTabValue(props.tabValue.replace("Cluster", "District Plan"));
    props.changeCluster(clusterId);
  };

  const handleClick = (event, id) => {
    if (selected === null) {
      setSelected(id);
    } else {
      setSelected(null);
    }
  };

  const isSelected = (id) => selected == id;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            "& .MuiTableRow-root:hover": {
              backgroundColor: "#FFC6C4",
            },
          }}
          size={"small"}
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
          <TableBody sx={{ maxHeight: "100px" }}>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indx) => {
                const isItemSelected = isSelected(row.Row);
                const labelId = `enhanced-table-checkbox-${row.Row}`;
                return (
                  <StyledTableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={indx}
                    id={row.ClusterId}
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
                              disabled={
                                selected !== row.Row && selected !== null
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.Row)}
                            />
                          </TableCell>
                        );
                      } else {
                        if (column.id === "Row") return;
                        return column.id === "ClusterId" ? (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="special-table-cell"
                            onClick={handleClusterClick}
                            id={row.ClusterId}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        ) : (
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
  );
};
export default ClusterTable;
