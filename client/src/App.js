import React, { Component } from 'react';
import './App.css';
import './stylesheets/sass/common.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from "./body/login/Login";
import MainPage from "./body/admin/MainPage";


class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route path="/login" component={ Login } exact/>
                      <Route path="/admin" component={ MainPage } exact/>
                      {/*<Route component={ Error } />*/}
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
