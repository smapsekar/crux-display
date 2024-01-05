import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Typography,
  TableSortLabel,
} from "@mui/material";

const DensitiesViewer = ({ densities }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const newSortOrder =
      sortBy === "density" ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortBy("density");
    setSortOrder(newSortOrder);

    densities.sort((a, b) => {
      const order = newSortOrder === "asc" ? 1 : -1;
      return order * (a - b);
    });
  };

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <Typography variant="h6" gutterBottom component="div">
          Densities
        </Typography>
        <Table size="small" aria-label="densities">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "density"}
                  direction={sortOrder}
                  onClick={handleSort}
                >
                  Density
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {densities.map((density, index) => (
              <TableRow key={index}>
                <TableCell>{density}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
};

export default DensitiesViewer;
