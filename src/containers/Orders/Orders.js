import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import {connect} from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHadler";
// import { fetchOrders } from "../../store/actions";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  ordersMethod = () => {
    return Object.entries(this.props.orders).map(order => {
      return (
        <Order
          key={order[0]}
          price={order[1].price}
          ingredients={order[1].ingredients}
        />
      );
    });
  };

  render() {

    let orders = <Spinner />
    if(!this.props.loading) {
      orders = (  <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            orderDelete={() => this.props.onDeleteOrder(order.id)}
          />
        ))}
        {/* {this.ordersMethod()} */}
      </div>)
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId)),
    onDeleteOrder: (id) => dispatch(actions.deleteOrder(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
