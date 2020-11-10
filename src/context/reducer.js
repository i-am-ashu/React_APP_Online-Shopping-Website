
const localData = localStorage.getItem("cart");
export const initialState = {
  basket: localData? JSON.parse(localData) : [],
  search: ""
};

export const getTotal = (basket) =>
  // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
  basket?.reduce((total, item) => item.price * item.quantity + total, 0);

const reducer = (state, action) => {
  console.log(action);
  console.log("basket>>", state.basket);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_CART":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newCart = [...state.basket];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `cant remove product with id : ${action.id} as its not is cart`
        );
      }
      return {
        ...state,
        basket: newCart,
      };

    case "REFRESH_CART":
      return {
        ...state,
        basket: [],
      };

    case "SEARCH":
      return {
        ...state,
        search: action.search,
      };

    default:
      return state;
  }
};

export default reducer;
