import react, { useEffect, useState } from "react";
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

const columns = [
  {
    id: "District",
    label: "District",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "TotalPopulation",
    label: "Total Population",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Rep",
    label: "Republican %",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Dem",
    label: "Democratic %",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Black",
    label: "Black %",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Hispanic",
    label: "Hispanic %",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Asian",
    label: "Asian %",
    maxWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  District,
  TotalPopulation,
  Rep,
  Dem,
  White,
  Black,
  Hispanic,
  Asian
) {
  return {
    District,
    TotalPopulation,
    Rep,
    Dem,
    White,
    Black,
    Hispanic,
    Asian,
  };
}

const DistrictInfoTable = (props) => {
  const [districtPlanId, setDistrictPlanId] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (props.selectedDistrict !== null) {
      let index = props.selectedDistrict;

      let districtInfo = [];

      for (let key in props.districtPlanInfo[index].clusterDemographics
        .perDistrictData) {
        let json =
          props.districtPlanInfo[index].clusterDemographics.perDistrictData[
            key
          ];

        districtInfo.push(
          createData(
            parseInt(key),
            json.totPop,
            json.repPopPer,
            json.demPopPer,
            json.whitePopPer,
            json.blkPopPer,
            json.hspPopPer,
            json.asnPopPer
          )
        );
      }
      setData(districtInfo);
      setDistrictPlanId(props.districtPlanInfo[index]);
    } else {
      setData([]);
      setDistrictPlanId(null);
    }
  }, [props.selectedDistrict]);
  return (
    <div>
      {districtPlanId !== null ? (
        <div>
          <h2>District Plan Details</h2>
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
                      return (
                        <StyledTableRow
                          tabIndex={-1}
                          key={indx}
                          id={row.District}
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
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      ) : (
        <h2>Select a District Plan to view Details</h2>
      )}
    </div>
  );
};

export default DistrictInfoTable;
