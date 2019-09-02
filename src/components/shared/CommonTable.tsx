import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel
} from "@material-ui/core";

import { TableData } from "../../types/TableData.interface";
import { SortSettings } from "../../types/SortSettings.interface";

interface DispatchProps {setSortSettings: () => void}

type Props = SortSettings & //state props
            DispatchProps & // dispatch props
            TableData // own props

export function CommonTable(props: Props | any) {
  const { dataDef, data, reloadData }: TableData = props;
  
  function sort(key: string) {
    const newState = {
      ...props.sort
    }
    
    newState[key] = props.sort[key] === 'desc' ? 'asc' : 'desc'    
    props.setSortSettings(newState);    
    reloadData(data)
  }

  function renderSortLabel(key: string, direction: "asc" | "desc") {
    return (
      <TableSortLabel
        active={true}
        direction={direction}
        onClick={() => sort(key)}
      />
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {dataDef.headers.map(header => (
            <TableCell align="center" key={header.key}>
              {header.key in props.sort
                ? renderSortLabel(header.key, props.sort[header.key])
                : ""}
              {header.label}
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

export default CommonTable;