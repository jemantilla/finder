import { find } from "lodash";
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
import { setSortSettings } from "../../actions";
import { connect } from "react-redux";

interface setSortSettings {
  setSortSettings?: () => void;
}

type Props = TableData & SortSettings;

export function CommonTable(props: Partial<Props> | any) {
  const { dataDef, data }: TableData = props;

  console.log("GOT PROPS", props);

  function sort(key: string) {
    props.setSortSettings({
      sort: []
    });
    console.log("clicked to sort", key);
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

const mapStateToProps = (state: SortSettings) => ({
  sort: state
});

const mapDispatchToProps = (dispatch: any) => ({
  setSortSettings: (data: SortSettings) => dispatch(setSortSettings(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonTable);
