import "./App.css";
import axios from "axios";
import Table from "./components/Table/Table.js";
import { useState, useEffect } from "react";
import { APIurl, agifyURL } from ".//config/constants.js";
let cache = {};
function App() {
  const [loader, setLoader] = useState(false);
  const [newData, setNewData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setPage] = useState(1);

  // namesObj-->array,
  useEffect(() => {
    /////// Find current page in data, if it doesn't exist, fetch new one

    const currentPageData = newData.find(
      (page) => page.pageNumber === currentPage
    );

    const fetchData = async (currentPage) => {
      cache[currentPage] = "a";
      console.log(cache);
      function mock_ages(length) {
        return Array(length)
          .fill()
          .map(() => ({ age: 25 }));
      }

      let agifyQuery = "";
      if (!currentPageData) {
        try {
          const response = await axios.get(`${APIurl}page=${currentPage}`, {});
          // Getting names for agify
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].name) {
              agifyQuery += `name[]=${response.data[i].name
                .split(" ")
                .join("")}&`;
            }
          }
          // testing
          const ages_response = { data: mock_ages(response.data.length) };
          // Fetching ages
          /*  const ages_response = await axios.get(
            `${agifyURL}?${agifyQuery}`,
            {}
          ); */
          for (let i = 0; i < ages_response.data.length; i++) {
            response.data[i].age = ages_response.data[i].age;
          }
          console.log(response.data);
          //fetchAges();
          // Save the results for caching
          setNewData([
            ...newData,
            { pageNumber: currentPage, data: response.data },
          ]);
          // Make the table show the new data

          setCharacters(response.data);

          setLoader(true);

          // Store names in array for batch query
          let array = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].name.length > 0) {
              array.push(response.data[i].name);
            }
          }
        } catch (e) {
          //alert()
          console.log(e);
        } finally {
        }
      } else {
        setCharacters(currentPageData.data);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setPage(currentPage - 1);
          }}
        >
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            setPage(currentPage + 1);
          }}
        >
          Next Page
        </button>{" "}
      </div>

      {loader ? (
        <div>
          <Table
            //ages={namesObject}
            characters={characters}
            currentPage={currentPage}
            setCharacters={setCharacters}
          ></Table>
        </div>
      ) : null}
    </div>
  );
}

export default App;
