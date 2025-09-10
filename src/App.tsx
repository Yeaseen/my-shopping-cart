// App.tsx
import React, {
  useEffect,
  createContext,
  useReducer,
  useContext
} from 'react'
import NavBar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { productReducer } from './reducers'

require('dotenv').config()

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

const STORAGE_KEY = 'my-shopping-cart:state:v1'

const initialState: InitialStateType = {
  products: []
}

const mainReducer = ({ products }: InitialStateType, action: any): InitialStateType => ({
  products: productReducer(products, action)
})

export const userContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})

const Routing = () => {
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

// Rehydrate state from sessionStorage
function init(saved: InitialStateType): InitialStateType {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return saved
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.products)) return saved
    return { products: parsed.products }
  } catch {
    return saved
  }
}

function App() {
  const [state, dispatch] = useReducer(mainReducer, initialState, init)

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore write errors
    }
  }, [state])

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter basename="/my-shopping-cart">
        <NavBar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
