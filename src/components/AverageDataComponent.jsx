// components/CruxDataTable.js
import React from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TableContainerStyled = styled(TableContainer)({
  marginTop: "16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
});

const TableHeadStyled = styled(TableHead)({
  background: "#f8f8f8",
});

const TableCellHead = styled(TableCell)({
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
  padding: "12px",
});

const TableCellStyled = styled(TableCell)({
  borderBottom: "1px solid #ddd",
  padding: "12px",
});

const AverageDataComponent = ({ averageData, selectedMetric }) => {
  return (
    <TableContainerStyled component={Paper}>
      <Table>
        <TableHeadStyled>
          <TableRow>
            <TableCellHead colSpan={5} align="center">
              CrUX Report
            </TableCellHead>
          </TableRow>
          <TableRow>
            <TableCellHead>ID</TableCellHead>
            <TableCellHead>Metric Namme</TableCellHead>
            <TableCellHead>Start</TableCellHead>
            <TableCellHead>End</TableCellHead>
            <TableCellHead>Avg. Density</TableCellHead>
          </TableRow>
        </TableHeadStyled>
        <TableBody>
          {averageData.map((metric, index) =>
            selectedMetric !== "" && metric.metric !== selectedMetric ? null : (
              <TableRow key={index}>
                <TableCellStyled>{index + 1}</TableCellStyled>
                <TableCellStyled>{metric.metric}</TableCellStyled>
                <TableCellStyled>{metric.start}</TableCellStyled>
                <TableCellStyled>{metric.end}</TableCellStyled>
                <TableCellStyled>{metric.density}</TableCellStyled>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainerStyled>
  );
};

export default AverageDataComponent;
