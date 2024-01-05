import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const NestedTableQueryRecord = ({ histogramTimeseries }) => {
  return (
    <div>
      {histogramTimeseries.length === 0 ? (
        <TableRow>
          <TableCell colSpan={3} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        histogramTimeseries.map((histogram, idx) => (
          // Render table rows as before
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>Time Start</TableCell>
                    <TableCell>Time End</TableCell>
                    <TableCell>Density</TableCell>
                  </TableRow>
                </TableHead>
              </TableHead>
              <TableBody>
                {histogramTimeseries.map((histogram, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{histogram.start}</TableCell>
                      <TableCell>{histogram.end}</TableCell>
                      <TableCell>{histogram.density}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ))
      )}
    </div>
  );
};

export default NestedTableQueryRecord;
