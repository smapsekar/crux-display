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
import NestedTable from "./NestedTable";
import NestedTableQueryRecord from "./NestedTableQueryRecord";

const QUERY_HISTORY_RECORD = "queryHistoryRecord";

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

const CruxDataTable = ({ curxData, selectedMetric, typeOfRequest }) => {
  return (
    <TableContainerStyled component={Paper}>
      <Table>
        <TableHeadStyled>
          <TableRow>
            <TableCellHead colSpan={4} align="center">
              CrUX Report
            </TableCellHead>
          </TableRow>
          <TableRow>
            <TableCellHead>ID</TableCellHead>
            <TableCellHead>Metric</TableCellHead>
            <TableCellHead>Value</TableCellHead>
            <TableCellHead>Percentile</TableCellHead>
          </TableRow>
        </TableHeadStyled>
        <TableBody>
          {Object.keys(curxData).map((metric, index) =>
            selectedMetric !== "" && metric !== selectedMetric ? null : (
              <TableRow key={index}>
                <TableCellStyled>{index + 1}</TableCellStyled>
                <TableCellStyled>{metric}</TableCellStyled>
                <TableCellStyled>
                  {typeOfRequest === QUERY_HISTORY_RECORD ? (
                    <>
                      <NestedTable
                        histogramTimeseries={
                          curxData[metric]?.histogramTimeseries
                        }
                      />
                    </>
                  ) : (
                    <>
                      <NestedTableQueryRecord
                        histogramTimeseries={curxData[metric]?.histogram}
                      />
                    </>
                  )}
                </TableCellStyled>
                <TableCellStyled>
                  {curxData[metric]?.percentiles?.p75}
                </TableCellStyled>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainerStyled>
  );
};

export default CruxDataTable;
