import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/checkout/Checkout";
import { Route, Switch } from "react-router-dom";
//import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { withRouter } from "react-router";
import asynchComponent from './hoc/asychComponent/aysnchComponent';

const asychCheckout = asynchComponent(() => {
  return import("./containers/checkout/Checkout");
});

const asynchOrders = asynchComponent(() => {
  return import("./containers/Orders/Orders");
});

const asychAuth = asynchComponent(() => {
  return import("./containers/Auth/Auth");
});


class App extends Component {


  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asychAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asychCheckout} />
          <Route path="/orders" component={asynchOrders} />
          <Route path="/auth" component={asychAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
