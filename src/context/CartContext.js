import { createContext, useContext, useReducer } from "react";
import { CartReducer } from "../reducer/CartReducer";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  cartList: [],
  total: 0,
};

const CardContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };

  const removeFromCart = (product) => {
    const updatedCartList = state.cartList.filter(
      (current) => current.id !== product.id,
    );
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        product: updatedCartList,
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
