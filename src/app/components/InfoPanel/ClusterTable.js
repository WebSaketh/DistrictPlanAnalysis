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
    id: "Democratic",
    label: "Democratic",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Republican",
    label: "Republican",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "White",
    label: "White",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Black",
    label: "Black",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Hispanic",
    label: "Hispanic",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Asian",
    label: "Asian",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  Row,
  ClusterId,
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
    let clusterId = event.currentTarget.id;
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
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
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

    /*<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ClusterId</StyledTableCell>
            <StyledTableCell align="right">Democratic</StyledTableCell>
            <StyledTableCell align="right">Republic</StyledTableCell>
            <StyledTableCell align="right">White</StyledTableCell>
            <StyledTableCell align="right">Black</StyledTableCell>
            <StyledTableCell align="right">Hispanic</StyledTableCell>
            <StyledTableCell align="right">Asian</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clusters
            .slice(
              currentPage * pageLength,
              Math.min(
                props.clusters.length,
                currentPage * pageLength + pageLength
              )
            )
            .map((cluster) => (
              <StyledTableRow key={cluster.clusterId}>
                <StyledTableCell component="th" scope="row">
                  {currentPage * pageLength + i + 1}
                </StyledTableCell>
                <StyledTableCell align="right" p={i++}>
                  {cluster.clusterDemographics.democratic}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {cluster.clusterDemographics.republican}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {cluster.clusterDemographics.white}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {cluster.clusterDemographics.black}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {cluster.clusterDemographics.hispanic}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {cluster.clusterDemographics.asian}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        color="primary"
      />
    </TableContainer>*/

    /*<div className="bg-gray-100">
      <div className="flex flex-row">
        <div className="m-2">Cluster Id</div>
        <div className="m-2">Republican</div>
        <div className="m-2">Democratic</div>
        <div className="m-2">White</div>
        <div className="m-2">Black</div>
        <div className="m-2">Hispanic</div>
        <div className="m-2">Asian</div>
      </div>
      {props.clusters
        .slice(
          page * pageLength,
          Math.min(props.clusters.length, page * pageLength + pageLength)
        )
        .map((cluster) => (
          <ClusterCard
            cluster={cluster}
            id={page * pageLength + i + 1}
            cs={i++}
          ></ClusterCard>
        ))}
        </div>*/
  );
};
export default ClusterTable;
