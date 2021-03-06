import { h, Fragment } from 'preact'
import { Route } from 'react-router-dom'
import Loader from '../components/loader'
import Header from '../components/header'
import SVGFilter from '../components/svg-filter'
import Home from '../pages/home'
import Cart from '../pages/cart'

const App = () => {
  return (
    <>
      <Header />
      <Route path='/' exact component={Home}/>
      <Route path='/cart' component={Cart}/>
      <SVGFilter />
    </>
  )
}

export default App
