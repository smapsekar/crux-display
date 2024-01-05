import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const QUERY_HISTORY_RECORD = "queryHistoryRecord";
const QUERY_RECORD = "queryRecord";

const SearchForm = ({
  urls,
  setUrls,
  fetchData,
  setCruxData,
  metricOption,
  setMetricOption,
  selectedMetric,
  setSelectedMetric,
  fetchDataMultiURLS,
  calculateAverageOfDataSets,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    if (urls) {
      setErrorMessage("");
      const parsedUrls = urls?.split("\n").filter((url) => url);

      if (parsedUrls?.length === 1) {
        // Handle single URL case
        fetchData(parsedUrls[0], QUERY_HISTORY_RECORD);
      } else if (parsedUrls.length > 1) {
        calculateAverageOfDataSets(parsedUrls, QUERY_RECORD);
      }
    } else {
      setErrorMessage("Please enter at least one URL.");
      console.error("URLs are undefined or null");
      return;
    }
  };

  const handleMetricChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMetric(selectedValue);
  };

  return (
    <div>
      <TextField
        label="Enter URL"
        variant="outlined"
        multiline
        rows={4} // Set the number of rows you want to display
        value={urls} // Assuming `urls` is an array
        onChange={(e) => setUrls(e.target.value)} // Update the state as an array
        fullWidth
        style={{ width: "700px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginLeft: "16px" }}
      >
        Search
      </Button>
      <FormControl style={{ marginLeft: "16px", minWidth: "300px" }}>
        <InputLabel id="metric-select-label">Select Metric</InputLabel>
        <Select
          labelId="metric-select-label"
          id="metric-select"
          value={selectedMetric}
          onChange={handleMetricChange}
        >
          {metricOption.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={{ whiteSpace: "normal" }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default SearchForm;
