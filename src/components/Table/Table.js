import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../../config/constants";
export default function Table(props) {
  return (
    <div style={{ height: "60vw", width: "100%" }}>
      <DataGrid
        //  loading={props.isLoading}

        autoHeight
        pageSize={10}
        rows={props.rows}
        columns={columns}
      />
    </div>
  );
}
