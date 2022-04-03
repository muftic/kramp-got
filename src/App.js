import "./App.css";
import axios from "axios";
import TestTable from "./components/Table/TestTable.js";
import { useState, useEffect } from "react";
import { APIurl } from ".//config/constants.js";
function App() {
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [characters, setCharacters] = useState();
  const lastPage = 214;
  const [currentPage, setPage] = useState(1);
  const fetchData = async (currentPage) => {
    try {
      /*   if (data[currentPage]) {
        console.log("first");
      } */

      const response = await axios.get(`${APIurl}page=${currentPage}`, {
        /* headers: { "If-Modified-Since": "date_here" }, */
      });
      setData(response.data);
      console.log(response.data);
      console.log(currentPage);
      ///myArray.push(response.data);

      console.log(!data || !data[currentPage - 1]);
      /*      let newData = [...data]; */
      /*       data[currentPage - 1] = response.data;
      setData = newData; */
      setLoader(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setPage(currentPage - 1);
            console.log(currentPage);
          }}
        >
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            setPage(currentPage + 1);
            console.log(currentPage);
          }}
        >
          Next Page
        </button>{" "}
      </div>
      {loader ? (
        <div>
          <TestTable
            autoHeight={true}
            characters={data}
            //currentPage={currentPage}
            setCharacters={setCharacters}
          ></TestTable>
        </div>
      ) : null}
      <div>hey hey</div>
    </div>
  );
}

export default App;
