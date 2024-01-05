/* eslint-disable no-undef */
// Import necessary dependencies and the component
import { shallow, render, mount } from "enzyme";
import React from "react";
import SearchForm from "../components/SearchForm";
import { ErrorBoundary } from "react-error-boundary";
// Mock the function that is passed as a prop
const mockFetchData = jest.fn();
const QUERY_HISTORY_RECORD = "queryHistoryRecord";
// Create a dummy metricOption array for testing
const dummyMetricOption = ["metric1", "metric2", "metric3"];

// test("renders SearchForm component", () => {
//   // Render the component
//   const { getByLabelText, getByText } = render(
//     <ErrorBoundary>
//       <SearchForm
//         url=""
//         setUrl={() => {}}
//         fetchData={mockFetchData}
//         setCruxData={() => {}}
//         metricOption={dummyMetricOption}
//         setMetricOption={() => {}}
//       />
//     </ErrorBoundary>
//   );

//   // Check if the input and button are rendered
//   <ErrorBoundary>
//     const urlInput = getByLabelText("Enter URL"); const searchButton =
//     getByText("Search"); expect(urlInput).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   </ErrorBoundary>;
// });

test("calls fetchData function when Search button is clicked", async () => {
  // Render the component
  // const { getByLabelText, getByText } = render(
  //   <SearchForm
  //     url=""
  //     setUrl={() => {}}
  //     fetchData={mockFetchData}
  //     setCruxData={() => {}}
  //     metricOption={dummyMetricOption}
  //     setMetricOption={() => {}}
  //   />
  // );
  // // Trigger a change in the input field
  // const urlInput = getByLabelText("Enter URL");
  // fireEvent.change(urlInput, { target: { value: "https://example.com" } });
  // // Trigger a click on the Search button
  // const searchButton = getByText("Search");
  // fireEvent.click(searchButton);
  // // Wait for the fetchData function to be called
  // await waitFor(() => expect(mockFetchData).toHaveBeenCalled());
});

it("should fetch data for a single URL", async () => {
  const mockFetch = jest.fn();
  const mockSetCruxData = jest.fn();
  const wrapper = shallow(
    <SearchForm fetchData={mockFetch} setCruxData={mockSetCruxData} />
  );
  wrapper.instance().handleSearch("https://example.com");
  await Promise.resolve(); // Wait for async operations
  expect(mockFetch).toHaveBeenCalledWith(
    "https://example.com",
    QUERY_HISTORY_RECORD
  );
  expect(mockSetCruxData).toHaveBeenCalled();
});
// Add more tests based on your component's functionality
