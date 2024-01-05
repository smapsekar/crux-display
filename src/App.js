import React, { useState, useEffect } from "react";
import { Paper, Typography, styled } from "@mui/material";
import SearchForm from "./components/SearchForm";
import CruxDataTable from "./components/CruxDataTable";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import AverageDataComponent from "./components/AverageDataComponent";

const RootContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const InputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
});

const App = () => {
  const theme = useTheme();
  const [urls, setUrls] = useState();
  const [curxData, setCruxData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [metricOption, setMetricOption] = useState([]);
  const [error, setError] = useState(null);
  const [typeOfRequest, setTypeOfRequest] = useState();
  const [averageData, setAverageData] = useState(null);

  useEffect(() => {
    if (curxData) {
      setMetricOption(Object.keys(curxData));
      setSelectedMetric("");
      setAverageData(null);
    }
  }, [curxData]);

  useEffect(() => {
    if (averageData) {
      setCruxData(null);
      let metricKey = [...new Set(averageData.map((x) => x.metric))];
      setMetricOption(metricKey);
      setSelectedMetric("");
      console.log("averageData", averageData, metricKey);
    }
  }, [averageData]);

  const createApiUrl = (url, typeOfRequest) => {
    return `http://localhost:3007/crux-report?urlParam=${url}&requestType=${typeOfRequest}`;
  };

  const fetchData = async (url, typeOfRequest) => {
    try {
      if (!url) {
        throw new Error("URL is missing");
      }

      const apiUrl = createApiUrl(url, typeOfRequest);

      setTypeOfRequest(typeOfRequest);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setCruxData(result.record.metrics);

      setError(null); // Clear any previous errors
    } catch (error) {
      setCruxData(null);
      if (error.message === "URL is missing") {
        setError("URL is missing. Please enter a valid URL.");
      } else {
        setError(`Error fetching data: ${error.message}`);
      }
      console.error("Error fetching data:", error.message, curxData);
    }
  };

  const fetchMultiUrlDataset = async (urlsToFetch, typeOfRequest) => {
    let dataSets = [];

    //const baseURL = "http://localhost:3007/crux-report";
    for (const url of urlsToFetch) {
      try {
        const apiUrl = createApiUrl(url, typeOfRequest);

        if (!url) {
          throw new Error("URL is missing");
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        dataSets.push(data);
      } catch (error) {
        setAverageData(null);
        //console.error(`Error fetching data for URL ${url}:`, error.message);
        if (error.message === "URL is missing") {
          setError("URL is missing. Please enter a valid URL.");
        } else {
          setError(`Error fetching data: ${error.message}`);
        }
        // Handle error as needed
      }
    }

    return dataSets;
  };

  const calculateAverageOfDataSets = async (urlsToFetch, typeOfRequest) => {
    const dataSets = await fetchMultiUrlDataset(urlsToFetch, typeOfRequest);
    const averageData = averageHistograms(dataSets);
    setAverageData(averageData);
  };

  const averageHistograms = (dataSets) => {
    if (!dataSets || dataSets.length === 0) {
      return null; // Return null or handle as needed for no data
    }

    // Create an object to store the sum of densities for each histogram item
    const sumHistograms = {};

    // Iterate through each data set
    dataSets.forEach((dataSet) => {
      // Iterate through each metric in the data set
      Object.keys(dataSet.record.metrics).forEach((metric) => {
        const histogram = dataSet.record.metrics[metric].histogram;
        let identifier = { metric: metric };

        // Iterate through each items in the histogram
        histogram.forEach((item) => {
          const key = JSON.stringify({ ...item, ...identifier });

          // If the item exists in sumHistograms, add the density, otherwise, initialize it
          sumHistograms[key] = (sumHistograms[key] || 0) + item.density;
        });
      });
    });

    // Calculate the average
    const averageHistogram = Object.keys(sumHistograms).map((key) => {
      const element = JSON.parse(key);
      return {
        start: element.start,
        end: element.end,
        density: sumHistograms[key] / dataSets.length,
        metric: element.metric,
      };
    });
    //console.log("averageHistogram", averageHistogram);
    return averageHistogram;
  };
  return (
    <RootContainer>
      <InputContainer>
        <SearchForm
          urls={urls}
          setUrls={setUrls}
          fetchData={fetchData}
          setCruxData={setCruxData}
          metricOption={metricOption}
          setMetricOption={setMetricOption}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          calculateAverageOfDataSets={calculateAverageOfDataSets}
        />
      </InputContainer>
      {error && (
        <Alert severity="error" sx={{ marginBottom: theme.spacing(2) }}>
          {error}
        </Alert>
      )}

      {!error && !curxData && !averageData && (
        <Typography variant="h6">
          No data available. Please perform a search.
        </Typography>
      )}

      {curxData && (
        <CruxDataTable
          curxData={curxData}
          selectedMetric={selectedMetric}
          typeOfRequest={typeOfRequest}
        />
      )}

      {averageData && (
        <>
          <Typography variant="h6">Average Data of orgin </Typography>
          <AverageDataComponent
            averageData={averageData}
            selectedMetric={selectedMetric}
          />
        </>
      )}
    </RootContainer>
  );
};

export default App;
