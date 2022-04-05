import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { cardActionAreaClasses } from "@mui/material";
import { columns } from "../../config/constants";
export default function Table(props) {
  let myRows = props.characters.map((char, i) => {
    return {
      id: i + 1 + (props.currentPage - 1) * 10,
      age: char.age,
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

  useEffect(() => {}, []);

  return (
    <div style={{ height: "60vw", width: "100%" }}>
      <DataGrid
        // rowsPerPageOptions="10"
        rows={myRows}
        columns={columns}
        /*   pageSize={10}
   
        disableSelectionOnClick={false}
        paginationMode="client" */
      />
    </div>
  );
}
