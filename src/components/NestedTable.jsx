import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
} from "@mui/material";

const NestedTable = ({ histogramTimeseries }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [threshold, setThreshold] = useState(0); // Initial threshold value

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleThresholdChange = (event) => {
    const newThreshold = parseFloat(event.target.value);
    setThreshold(isNaN(newThreshold) ? 0 : newThreshold);
  };

  const sortedHistograms = Object.values(histogramTimeseries).sort((a, b) =>
    sortOrder === "asc"
      ? a.densities[a.densities.length - 1] -
        b.densities[b.densities.length - 1]
      : b.densities[b.densities.length - 1] -
        a.densities[a.densities.length - 1]
  );

  // Example: Display only histograms with a maximum density above the threshold
  const filteredHistograms = sortedHistograms.filter(
    (histogram) => Math.max(...histogram.densities) > threshold
  );

  return (
    <div>
      <TextField
        label="Filter Threshold"
        type="number"
        value={threshold}
        onChange={handleThresholdChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={handleSort}
                >
                  Densities
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistograms.map((histogram, idx) => {
              // Sort the array numerically
              const sortedDensities = histogram.densities
                .slice()
                .sort((a, b) => (sortOrder === "asc" ? a - b : b - a));

              return (
                <TableRow key={idx}>
                  <TableCell>{histogram.start}</TableCell>
                  <TableCell>{histogram.end}</TableCell>
                  <TableCell>{sortedDensities.join(", ")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NestedTable;
