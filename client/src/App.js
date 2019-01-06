import React, { Component } from 'react';
import './App.css';
import './stylesheets/sass/common.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./body/login/Login";
import MainPage from "./body/admin/MainPage";
import AdminHome from "./body/admin/AdminHome";
import ErrorPage from "./body/other/handleErrors/Error";
import UserMainPage from "./body/user/mainpage/UserMainPage";
import AdminItems from './body/admin/AdminItems';
import Users from './body/admin/Users';
import SelectedItem from "./body/user/selectedItem/SelectedItem";
import SelectedCategory from "./body/user/selectedcategory/SelectedCategory";
import News from "./body/user/news/News";


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
                      <Route path="/produktai/:category/" component={ SelectedCategory } exact />
                      <Route path="/produktai/:category/:name" component={ SelectedItem } exact />
                      <Route path="/naujienos" component={ News } exact />
                      <Route path="/login" component={ Login } exact/>
                      <Route path="/admin/" component={ AdminHome } exact/>
                      <Route path="/admin/pagrindinis" component={ MainPage } exact/>
                      <Route path="/admin/vartotojai" component={ Users } exact/>
                      <Route path="/admin/prekes" component={ AdminItems } exact/>
                      <Route component={ ErrorPage } />
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
