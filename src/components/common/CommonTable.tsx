import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

import { TableData } from "../../types/TableData.interface";

export function CommonTable(props: TableData) {
  const { dataDef, data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {dataDef.headers.map(header => (
            <TableCell align="center" key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((rowData, index) => (
          <TableRow key={index}>
            {dataDef.columns.map(key => (
              <TableCell scope="row" key={key}>
                {rowData[key]
                  ? key in dataDef.override
                    ? dataDef.override[key](rowData[key])
                    : rowData[key]
                  : ""}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
