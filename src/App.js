import React from 'react'
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';


function App() {

  document.title = "E-commerce";
  return (
    <Router>
       <div className="app">
          <Header/>
          <Switch>
              <Route path="/product">
                <ProductDetail/>
              </Route>
              <Route path="/cart">
                <Cart/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
          </Switch>
       </div>
    </Router>
  );
}

export default App;
