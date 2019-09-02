import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import { Button } from "@material-ui/core";

import { CommonTable } from "../common/CommonTable";
import { Search } from "../common/Search";
import User from "../../types/Users.interface";
import { SortSettings } from "../../types/SortSettings.interface";
import { setSortSettings } from "../../actions";
import "./Users.css";

const API_URL = `https://randomapi.com/api/k4l4zuh8?key=952K-DS3V-Z87L-61RL&results=10`;

interface FinderType {
  users_data: User[];
  refreshData?: () => void;
}

export class Users extends Component<FinderType, any> {
  // refreshUsers() {
  //   fetch(API_URL).then(res => {
  //     if (res.status !== 200) {
  //       this.setState({ error: true });
  //       return;
  //     } else {
  //       res.json().then(data => {
  //         /**
  //          *  My (first)attempt to use redux for this app.
  //          *  Im sorry this was my first time to do so
  //          *  it gave me a hard time for such a small app but
  //          *  think i can utilize this more with a much larger app.
  //          */
  //         this.props.setUsersData(data.results);
  //       });
  //     }
  //   });
  // }
  constructor(props: FinderType) {
    super(props);
    this.state = {
      users_data: [],
      error: false
    };
  }

  loadUsers(searchResults: User[] = []) {
    if (!isEmpty(searchResults)) {
      this.setState({
        users_data: searchResults
      });
      return;
    } else {
      fetch(API_URL).then(res => {
        if (res.status !== 200) {
          this.setState({ error: true });
          return;
        } else {
          res.json().then(data => {
            this.setState({
              users_data: data.results
            });
          });
        }
      });
    }
  }

  render() {
    // const users = !isEmpty(this.props.users_data)
    //   ? this.props.users_data
    //   : this.state.users_data;

    const users = this.props.users_data;
    console.log("USERS DATA? ", users);
    const dataDef = {
      headers: ["Name", "Address", "Date of birth", "Gender", "Country"],
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
            onClick={this.props.refreshData.bind(this)}
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
          <CommonTable dataDef={dataDef} data={users} />
        )}
      </div>
    );
  }
}

export default Users;

// const mapStateToProps = (state: FinderType) => ({
//   sort: state.sor
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   setSortSettings: (data: SortSettings) => dispatch(setSortSettings(data))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Users);
