import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const InfoTabs = (props) => {
  const handleButtonClick = (ev, value) => {
    props.setTabValue(props.tabValue.replace("District Plan", "Cluster"));
    props.clickClusterButton();
  };
  const handleChange = (event, newValue) => {
    props.setTabValue(newValue);
  };
  return (
    <Box className="flex justify-between items-center" sx={{ width: "100%" }}>
      <Tabs
        value={props.tabValue}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {props.tabList.map((elem, index) => (
          <Tab value={elem} label={elem} key={index} />
        ))}
      </Tabs>
      {props.cluster ? (
        <Button className="" variant="text" onClick={handleButtonClick}>
          View Clusters
        </Button>
      ) : null}
    </Box>
  );
};
export default InfoTabs;
