import "./App.css";
import axios from "axios";
import Table from "./components/Table/Table.js";
import { useState, useEffect } from "react";
import { APIurl, agifyURL, books } from ".//config/constants.js";
import { Button } from "@mui/material";

let cache = {}; // initialize cache
function mock_ages(length) {
  //for testing if api is broken
  return Array(length)
    .fill()
    .map(() => ({ age: 25 }));
}
console.log(books);
function App() {
  const [isLoading, setLoading] = useState(false);
  const [pageToGo, setPageToGo] = useState(1);
  const [currentPage, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const currentPageData = cache[currentPage]; //
    let agifyQuery = "";
    const fetchData = async (currentPage) => {
      // For testing purposes

      /////// Find current page in data, if it doesn't exist, fetch new one
      if (!currentPageData) {
        try {
          const response = await axios.get(`${APIurl}page=${currentPage}`, {});
          // Getting names for agify

          for (let i = 0; i < response.data.length; i++) {
            /*  for (let j = 0; j < response.data[i]["books"].length; j++) {
              response.data[i]["books"] =
                books[
                  response.data[i].books[
                    response.data[i].books[j].length - 1
                  ].slice(-1)
                ];
            } */
            //  console.log(response.data[0].books);
            for (let j = 0; j < response.data[i].books.length; j++) {
              console.log(response.data[i].books.length);
              /* response.data[i].books[j] =
                books[
                  response.data[i].books[
                    response.data[i].books[j].length - 1
                  ].slice(-1)
                ]; */
              /* 
              console.log(
                books[
                  response.data[i].books[
                    response.data[i].books[j].length - 1
                  ].slice(-1)
                ]
              ); */
            }

            if (response.data[i].name) {
              agifyQuery += `name[]=${response.data[i].name
                .split(" ")
                .join("")}&`;
            }
          }
          // FOR TESTING
          const ages_response = { data: mock_ages(response.data.length) };
          // Fetching ages          DON'T DELETE
          /* const ages_response = await axios.get(
            `${agifyURL}?${agifyQuery}`,
            {}
          ); */

          // Mapping ages
          for (let i = 0; i < ages_response.data.length; i++) {
            response.data[i].age = ages_response.data[i].age;
          }

          // Save the results for caching
          cache[`${currentPage}`] = response.data;

          // Add ids (needed for MUI DataGrid)
          for (const key of Object.keys(cache)) {
            for (let i = 0; i < cache[key].length; i++) {
              cache[key][i]["id"] = i + 1 + (key - 1) * 10;
            }
          }
          // Make the table show the new data
          setRows(cache[`${currentPage}`]);
        } catch (e) {
          console.log(e);
        }
      } else {
        // Get from cache
        setRows(cache[`${currentPage}`]);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <div>
        <p>
          Go to page:{" "}
          <input
            min={1}
            max={214}
            onChange={(event) => {
              if (event.target.value) {
                setPageToGo(event.target.value);
              }
            }}
            type="number"
          ></input>{" "}
          <Button onClick={() => setPage(pageToGo)} variant="outlined">
            Go!
          </Button>
        </p>
        <Button
          variant="outlined"
          onClick={() => {
            setPage(1);
          }}
        >
          1
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            if (currentPage === 1) {
              setPage(214);
            } else {
              setPage(currentPage - 1);
            }
          }}
        >
          Previous
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            if (currentPage === 214) {
              setPage(1);
            } else {
              setPage(currentPage + 1);
            }
          }}
        >
          Next
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            setPage(214);
          }}
        >
          214
        </Button>{" "}
      </div>
      <p> {currentPage} of 214</p>
      {!isLoading ? (
        <div>
          <Table
            //   isLoading={isLoading}
            rows={rows}
            data={cache}
            currentPage={currentPage}
          ></Table>
        </div>
      ) : null}
    </div>
  );
}

export default App;
