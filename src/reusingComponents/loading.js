import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingComponent = () => {
  return (
    <Box sx={{ mt:15, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};
export default LoadingComponent;
