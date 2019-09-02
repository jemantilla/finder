import { Component } from "react";
import React from "react";
import { isEmpty } from "lodash";
import moment from "moment";
import { Button } from "@material-ui/core";

import CommonTable from "../shared/CommonTable";
import { Search } from "../shared/Search";
import User from "../../types/Users.interface";
import "./Users.css";
import { SortSettings } from "../../types/SortSettings.interface";
;

interface DispatchProps {setSortSettings: () => void}
interface FinderType {
  users_data: User[];
  refreshData?: () => void;
}

type Props = SortSettings & DispatchProps & FinderType

export class Users extends Component<Props | any, any> {  
  constructor(props: Props){
    super(props);
    this.state = {
      filtered_users_data: []
    }
  }
  loadUsers(filtered_users_data: User[] = []) {
    if (!isEmpty(filtered_users_data)) {
      this.setState({
        filtered_users_data: filtered_users_data
      });
      return;
    } else {
      this.setState({
        filtered_users_data: []
      });
    }
  }  

  render() {
    const users = !!this.state.filtered_users_data.length
      ? this.state.filtered_users_data
      : this.props.users_data;    


    const dataDef = {
      headers: [
        { label: "Name", key: "name" },
        { label: "Address", key: "address" },
        { label: "Date of birth", key: "date_of_birth" },
        { label: "Gender", key: "gender" },
        { label: "Country", key: "country" }
      ],
      columns: ["name", "address", "date_of_birth", "gender", "country"],
      override: {
        date_of_birth: (date: Date) => {
          return moment(date).fromNow();
        }
      }
    };

    return (
      <div className="page-section">
        <div className="table-menu">

          <Button
            variant="contained"
            className="refresh"
            onClick={this.props.refreshData.bind(this,[])}
          >
            Refresh
          </Button>

          <Search
            name="search-field"
            data={users}
            reloadData={this.loadUsers.bind(this)}
          />

        </div>
        
        {this.state.error ? (

          <p>No results found</p>

        ) : (

          <CommonTable 
            dataDef={dataDef} 
            data={users} 
            reloadData={this.props.refreshData} 
            setSortSettings={this.props.setSortSettings}
            sort={this.props.sort}
            />            
        )}
      </div>
    );
  }
}

export default Users;
