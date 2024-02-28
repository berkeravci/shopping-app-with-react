
import { CartContextProvider } from './store/CartContext'
import { UserProgressContextProvider } from './store/UserProgressContext'
import './App.css'
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { queryClient } from './util/http.js';
import { QueryClientProvider } from '@tanstack/react-query';
import Shop from './Shop/Shop';
import Products from './Shop/Products';
import Cart from './Shop/Cart'
import ProductDetails from './Shop/ProductDetails'
import Checkout from './Shop/Checkout'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Shop></Shop>,
  
  },
  {
    path: "/products",
    element: <Products></Products>,

  },
  {
    path: "/products/:id",
    element: <ProductDetails></ProductDetails>
  },
  {
    path: "/cart",
    element: <Cart></Cart>
  }
])

function App() {
  

  return (
    <>
    <CartContextProvider>
      <UserProgressContextProvider>
      
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Cart></Cart>
      <Checkout></Checkout>
    </QueryClientProvider>
    
    </UserProgressContextProvider>
    </CartContextProvider>
    </>
  )
}

export default App
