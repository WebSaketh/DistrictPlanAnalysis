import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const InfoTabs = (props) => {
  const handleChange = (event, newValue) => {
    props.setTabValue(newValue);
  };
  console.log("hey");
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={props.tabValue}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {props.tabList.map((elem, index) => (
          <Tab value={elem} label={elem} key={index} />
        ))}
      </Tabs>
    </Box>
  );
};
export default InfoTabs;
