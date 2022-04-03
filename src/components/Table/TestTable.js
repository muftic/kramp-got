import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { cardActionAreaClasses } from "@mui/material";
import { columns } from "../../config/constants";
export default function DataGridDemo(props) {
  const [age, setAge] = useState(0);
  const fetchAges = async () => {
    try {
      /* const response = await axios.get(`https://api.agify.io?${stringAddon()}`);
      // https://api.agify.io/?name[]=michael&name[]=matthew&name[]=jane
      console.log(response.data.age);
      setAge(response.data.age);
      return response.data.age; */
    } catch (e) {
      console.log(e);
    }
  };
  let setPage = props.setPage;
  function handlePageChange() {}

  let namesObj = {};
  const getNames = () => {
    let bookNumbers;
    for (let i = 0; i < props.characters.length; i++) {
      //key=index    value=name
      if (props.characters[i].name.length > 1) {
        namesObj[i] = props.characters[i].name;
      }
      //let bookNumber = book.slice(-1);
      //find names of books and change data accordingly
      if (props.characters[i].books.length > 0) {
        for (let j = 0; j < props.characters[i].books.length; j++) {
          let book = props.characters[i].books[j];
          if (book == undefined) {
            return;
          } else {
            /*    console.log(props.setCharacters);
            console.log(`index:${i} book number${book.slice(-1)}`);
            console.log(props.characters); */
          }
        }
      }
    }

    //console.log(bookNumbers);
  };
  const setBookNames = () => {
    for (let i = 0; i < props.characters.length; i++) {
      if (props.characters[i].name.length > 1) {
        namesObj[i] = props.characters[i].name;
      }
    }
  };

  getNames();

  let myRows = props.characters.map((char, i) => {
    return {
      id: i + 1,
      //age: fetchAge(char.name) || fetchAge(char.aliases),
      gender: char.gender,
      aliases: char.aliases,
      allegiances: char.allegiances,
      books: char.books,
      born: char.born,
      culture: char.culture,
      died: char.died,
      father: char.father,
      mother: char.mother,
      name: char.name,
      playedBy: char.playedBy,
      povBooks: char.povBooks,
      spouse: char.spouse,
      titles: char.titles,
      tvSeries: char.tvSeries,
      url: char.url,
    };
  });

  useEffect(() => {
    fetchAges();
  }, []);

  let stringAddon = () => {
    let str = "";
    /*  for (let i = 0; i < names.length; i++) {
      console.log();
      if (names[i].split(" ") > 1) {
        let addOn = names[i].join(" ");
        console.log(addOn);
      }
      str += `name[]=${names[i]}&`;
    } */

    /*  */
  };
  return (
    <div style={{ height: "60vw", width: "100%" }}>
      <DataGrid
        //  rowCount={rowCountState}
        initialState={{
          pagination: {
            pageSize: 10,
            page: props.currentPage,
          },
        }}
        rows={myRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick={false}
        paginationMode="client"
      />
    </div>
  );
}
