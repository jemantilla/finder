import React, { Component } from "react";
import { Container } from "@material-ui/core";

import logo from "./logo.svg";
import {Users} from "./components/users/Users";
import "./App.css";
import User from "./types/Users.interface";
import { SortSettings } from "./types/SortSettings.interface";
import { setSortSettings } from "./actions";
import { connect } from "react-redux";
import { keys, map, orderBy } from "lodash";

const API_URL = `https://randomapi.com/api/k4l4zuh8?key=952K-DS3V-Z87L-61RL&results=3`;

interface DispatchProps {setSortSettings: () => void}

type Props = SortSettings & //state props
            DispatchProps & // dispatch props            
            any // own props

export class App extends Component<Props, any> {
  constructor(props: Props){
    super(props);
    this.state = {
      users_data: [],
      error:false
    }
  }
  componentDidMount() {
    this.loadUsers();
  }

  sort(users_data: User[]): User[]{
    const sortables = keys(this.props.sort)
    const orders = map(sortables, (key) => this.props.sort[key])        
    const filtered_data = orderBy(users_data, sortables , orders)
    //lodash orderby doesnt seem to work properly for 2nd iteree :(

    return filtered_data
  }

  loadUsers(filtered_results: User[] = []) {

    if(!filtered_results.length){
      fetch(API_URL).then(res => {
        if (res.status !== 200) {
          this.setState({ error: true });
          return;
        } else {
          res.json().then(data => {          
            this.setState({ users_data: data.results, error: false });
          });
        }
      });
    }    
    else{
      this.setState({users_data: filtered_results, error:false})
    }

  }

  render() {
  
    const users_data = this.sort(this.state.users_data);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"></img>
          <span>Finder</span>
        </header>
        <Container fixed>
          {users_data.length > 0 ? (
            <Users
              users_data={users_data}
              refreshData={this.loadUsers.bind(this)}
              setSortSettings={this.props.setSortSettings.bind(this)}
              sort={this.props.sort}
            />
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
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
)(App);
