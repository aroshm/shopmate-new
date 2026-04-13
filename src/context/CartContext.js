import { createContext, useContext, useReducer } from "react";
import { CartReducer } from "../reducer/CartReducer";

const initialState = {
  cartList: [],
  total: 0,
};

const CardContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    updateTotal(updatedCartList);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };

  const removeFromCart = (product) => {
    const productIndex = state.cartList.findIndex(
      (current) => current.id === product.id,
    );
    const updatedCartList = state.cartList.filter(
      (_, index) => index !== productIndex,
    );

    updateTotal(updatedCartList);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };

  const updateTotal = (products) => {
    const total = products.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    dispatch({
      type: "UPDATE_TOTAL",
      payload: {
        total,
      },
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CardContext);
  return context;
};
