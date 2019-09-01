import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { Container } from '@material-ui/core';

import logo from './logo.svg';
import  Users  from './components/users/Users';
import { userData } from './reducers';
import './App.css';

const store = createStore(userData,{users_data:[]});

export class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"></img>
            <span>
            Finder
            </span>          
          </header>
          <Container fixed>
            <Users />
          </Container>
        </div>
      </Provider>
    );
  } 
}

export default App;