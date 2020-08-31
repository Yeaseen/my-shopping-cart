
import React, { createContext, useReducer } from 'react';
import { productReducer } from './reducers';
type ProductType = {
    id: number
    title: string
    price: number
    count: number
    picture: string
  }

  type InitialStateType = {
    products: ProductType[];
  }

  const initialState = {
    products: []
  }


  const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });

  const mainReducer = ({ products }, action) => ({
    products: productReducer(products, action),
  });

  const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
  
    return (
      <AppContext.Provider value={{state, dispatch}}>
        {children}
      </AppContext.Provider>
    )
  }
  
  export { AppProvider, AppContext };