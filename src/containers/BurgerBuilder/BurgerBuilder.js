import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHadler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";
// import * as actionTypes from "../../store/actions/actionTypes";
export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    // error: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchasableState(updatedIngredients);
  // };
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice - priceDeduction;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchasableState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
  };

  render() {
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      const disabledInfo = Object.entries(this.props.ings).reduce(
        (result, [key, value]) => {
          result[key] = value <= 0;
          return result;
        },
        {}
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasableState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onInitialIngredientHandler: initialIngredients =>
    //   dispatch({
    //     type: actionTypes.INITIAL_INGREDIENTS,
    //     initialIngredients: initialIngredients
    //   }),
    onInitIngredients: () =>
      dispatch(burgerBuilderActions.initIngredients()),
    onAddIngredient: igName =>
      dispatch(burgerBuilderActions.addIngredient(igName)),
    onRemoveIngredient: igName =>
      dispatch(burgerBuilderActions.removeIngredient(igName)),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
