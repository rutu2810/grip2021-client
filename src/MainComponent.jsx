import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home/Home";
import Transactions from "./Transactions/Transactions";
import Customer from "./Customer/Customer";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

const MainComponent = (props) => {
  return (
    <div className="main">
      <Header />
      <Switch location={props.location}>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} exact />
        <Route path="/transactions" component={Transactions} />
        <Route path="/customer" component={Customer} />
      </Switch>
      <Footer />
    </div>
  );
};

export default MainComponent;
