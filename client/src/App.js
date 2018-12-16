import React, { Component } from 'react';
import './App.css';
import './stylesheets/sass/common.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./body/login/Login";
import MainPage from "./body/admin/MainPage";
import AdminHome from "./body/admin/AdminHome";
import ErrorPage from "./body/other/Error";
import UserMainPage from "./body/user/mainpage/UserMainPage";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routerItems: ''
        }
    }
    async componentWillMount() {
        // const items = await navigationActions.getNavItems();
        // const routerItems = [];
        // items.forEach(item => routerItems.push(item.href));
        // this.setState({routerItems: routerItems})
    }

    render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route path="/" component={ UserMainPage } exact/>
                      <Route path="/login" component={ Login } exact/>
                      <Route path="/admin/" component={ AdminHome } exact/>
                      <Route path="/admin/pagrindinis" component={ MainPage } exact/>
                      <Route path="/admin/biciuproduktai" component={ MainPage } exact/>
                      <Route component={ ErrorPage } />
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
