import React from "react";
import { Button } from "@mui/material";

const MetricFilter = ({ handleApplyMetric }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleApplyMetric}
      style={{ marginLeft: "16px" }}
    >
      Apply Metric Filter
    </Button>
  );
};

export default MetricFilter;
