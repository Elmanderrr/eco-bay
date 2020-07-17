import React from 'react';

import '../css/index.scss'
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import { Router, Route, Switch } from "react-router-dom"
import ProductList from "./product-list/ProductList"
import history from "../history"
import ProductAdd from "./product-add/ProductAdd"
import ProductEdit from "./product-edit/ProductEdit"


function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header/>
        <div className="content">
          <Switch>
            <Route path='/' exact component={ProductList} />
            <Route path='/products/new' exact component={ProductAdd} />
            <Route path='/products/edit/:id' exact component={ProductEdit} />
            {/*<Route path='/streams/:id' exact component={StreamShow} />*/}
          </Switch>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
