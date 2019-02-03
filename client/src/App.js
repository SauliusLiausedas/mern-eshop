import React, { Component } from 'react';
import './App.css';
import './stylesheets/sass/common.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from "./body/admin/MainPage";
import AdminHome from "./body/admin/AdminHome";
import ErrorPage from "./body/other/handleErrors/Error";
import UserMainPage from "./body/user/mainpage/UserMainPage";
import AdminItems from './body/admin/AdminItems';
import Users from './body/admin/Users';
import SelectedItem from "./body/user/selectedItem/SelectedItem";
import SelectedCategory from "./body/user/selectedcategory/SelectedCategory";
import News from "./body/user/news/News";
import { connect } from 'react-redux';
import {actions} from './actions/actions';
import ShoppingCart from "./body/user/shopping-cart/ShoppingCart";
import Login from "./body/login/Login";
import Confirmed from "./body/login/Confirmed";
import AlreadyConfirmed from "./body/login/AlreadyConfirmed";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routerItems: ''
        }
    }

    // async componentWillMount() {
    //     const items = await navigationActions.getNavItems();
    //     const routerItems = [];
    //     items.forEach(item => routerItems.push(item.href));
    //     this.setState({routerItems: routerItems})
    // }

    render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <ShoppingCart/>
                  <Switch>
                      <Route path="/" component={ UserMainPage } exact />
                      <Route path="/produktai/:category/" component={ SelectedCategory } exact />
                      <Route path="/produktai/:category/:name" component={ SelectedItem } exact />
                      <Route path="/naujienos" component={ News } exact />
                      <Route path="/prisijungti" component={ Login } exact />
                      <Route path="/patvirtinimas" component={ Confirmed } exact />
                      <Route path="/patvirtinta" component={ AlreadyConfirmed } exact />
                      <Route path="/admin" component={ MainPage } exact />
                      <Route path="/admin/pagrindinis" component={ AdminHome } exact />
                      <Route path="/admin/vartotojai" component={ Users } exact />
                      <Route path="/admin/prekes" component={ AdminItems } exact />
                      <Route component={ ErrorPage } />
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(App);
