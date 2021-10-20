import React, { useEffect, createContext, useReducer, useContext } from 'react'
import NavBar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { productReducer } from './reducers'

type ProductType = {
  id: number
  title: string
  price: number
  count: number
  picture: string
}

type InitialStateType = {
  products: ProductType[]
}

const initialState = {
  products: []
}
const mainReducer = ({ products }, action) => ({
  products: productReducer(products, action)
})

export const userContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})

const Routing = (props) => {
  const { state, dispatch } = useContext(userContext)

  useEffect(() => {}, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/product/:productid">
        <Product />
      </Route>

      <Route exact path="/cart">
        <Cart />
      </Route>

      <Route exact path="/checkout">
        <Checkout />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(mainReducer, initialState)
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
