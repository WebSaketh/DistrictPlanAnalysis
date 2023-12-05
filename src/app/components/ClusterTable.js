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

const columns = [
  { id: "Row", label: "Row", minWidth: 100 },
  {
    id: "ClusterId",
    label: "ClusterId",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DistrictPlanCount",
    label: "Num of District plans",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AvgDistrictPlanDistance",
    label: "Average Distance Between District Plans",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Democratic",
    label: "Avg Dem Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Republican",
    label: "Avg Rep Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "White",
    label: "Avg White Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Black",
    label: "Avg Black Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Hispanic",
    label: "Avg Hisp Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Asian",
    label: "Avg Asian Pop.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  Row,
  ClusterId,
  DistrictPlanCount,
  AvgDistrictPlanDistance,
  Democratic,
  Republican,
  White,
  Black,
  Hispanic,
  Asian
) {
  return {
    Row,
    ClusterId,
    DistrictPlanCount,
    AvgDistrictPlanDistance,
    Democratic,
    Republican,
    White,
    Black,
    Hispanic,
    Asian,
  };
}

const ClusterTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    let d = [];
    for (let k = 0; k < props.clusters.length; k++) {
      let cluster = props.clusters[k];
      d.push(
        createData(
          k + 1,
          cluster.clusterId,
          cluster.districtPlanIds.length,
          Math.random(),
          cluster.clusterDemographics.democratic,
          cluster.clusterDemographics.republican,
          cluster.clusterDemographics.white,
          cluster.clusterDemographics.black,
          cluster.clusterDemographics.hispanic,
          cluster.clusterDemographics.asian
        )
      );
    }
    setData(d);
  }, [props]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClusterClick = (event) => {
    console.log(props.tabValue);
    let clusterId = event.currentTarget.id;
    props.setTabValue(props.tabValue.replace("Cluster", "District Plan"));
    props.changeCluster(clusterId);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
              .map((row, indx) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={indx}
                    id={row.ClusterId}
                    onClick={handleClusterClick}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
