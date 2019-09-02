import React from "react";
import { filter } from "lodash";
import { TextField } from "@material-ui/core";

import User from "../../types/Users.interface";

export function Search(props: {
  name: string;
  data: User[];
  reloadData: Function;
}) {
  function onChange(event: any) {
    const searchQuery = event.target.value;
    let newData: User[] = [];

    if (!!searchQuery) {
      newData = filter(props.data, function(rowData: User) {
        const nameMatched =
          rowData.name.toLocaleLowerCase().indexOf(searchQuery) !== -1;
        const addressMatched =
          rowData.address.toLocaleLowerCase().indexOf(searchQuery) !== -1;
        const genderMatched =
          rowData.gender.toLocaleLowerCase().indexOf(searchQuery) !== -1;
        const countryMatched =
          rowData.country.toLocaleLowerCase().indexOf(searchQuery) !== -1;
        return nameMatched || addressMatched || genderMatched || countryMatched;
      });
    }

    props.reloadData(newData);
  }

  return (
    <TextField
      onChange={onChange}
      id="outlined-search"
      label="Search field"
      className={props.name}
      type="search"
      margin="normal"
      variant="outlined"
    />
  );
}
