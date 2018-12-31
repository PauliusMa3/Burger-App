import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.5,
  bacon: 0.7,
  cheese: 0.9
};

const initialState = {
  ingredients: [],
  totalPrice: 0,
  error: false,
  building: false
};

// let initialStateBoolean = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    // case actionTypes.INITIAL_INGREDIENTS:
    //   if (initialStateBoolean) {
    //     break;
    //  }
    //  initialStateBoolean = true;
    //   let initialPrice = 3.99;

    //   for (let ingredientType in action.initialIngredients) {
    //     initialPrice =
    //       initialPrice +
    //       action.initialIngredients[ingredientType] *
    //         INGREDIENT_PRICES[ingredientType];
    //   }
    //   return {
    //     ...state,
    //     ingredients: action.initialIngredients,
    //     totalPrice: initialPrice
    //   };
    default:
      return state;
  }
};

export default reducer;
