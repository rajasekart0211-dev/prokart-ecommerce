import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Productsdata from './Context/Productsdata'
import Productdisplay from './Components/Productdisplay'
import ProductDetail from './Components/ProductDetail'
import CartContext from './Context/CartContext'
import Cart from './Components/Cart'
import Footer from './Components/Footer'
import Login from './Pages/Login'

const App = () => {
  return (
      <CartContext>
        <Productsdata>
          <Router>
            <Navbar/>
            <Cart/>
            <Routes>
              <Route path='/' element={<Productdisplay/>}/>
              <Route path='/product/:id' element={<ProductDetail/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
            <Footer/>
          </Router>
        </Productsdata>
    </CartContext>
       
  )
}

export default App