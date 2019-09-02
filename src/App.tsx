import React, { Component } from "react";
import { Container } from "@material-ui/core";

import logo from "./logo.svg";
import Users from "./components/users/Users";
import "./App.css";
import User from "./types/Users.interface";

const API_URL = `https://randomapi.com/api/k4l4zuh8?key=952K-DS3V-Z87L-61RL&results=3`;

interface FinderState {
  users_data: User[];
  error: boolean;
}

export class App extends Component<any, FinderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users_data: [],
      error: false
    };
  }
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    fetch(API_URL).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      } else {
        res.json().then(data => {
          console.log("GOT DATA", data.results);
          this.setState({ users_data: data.results, error: false });
        });
      }
    });
  }

  render() {
    const users_data = this.state.users_data;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"></img>
          <span>Finder</span>
        </header>
        <Container fixed>
          {users_data.length > 0 ? (
            <Users
              users_data={this.state.users_data}
              refreshData={this.loadUsers.bind(this)}
            />
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default App;
