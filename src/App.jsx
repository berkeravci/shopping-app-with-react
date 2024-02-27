import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Shop></Shop>,
    // children: [
    //   {
    //     path: '/products',
    //     element: <Products></Products>
    //   }
    // ]
  },
  {
    path: "/products",
    element: <Products></Products>,
    // children:[
    //   {
    //     path: "/cart",
    //     element: <Cart></Cart>
    //   }
    // ]
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
    </QueryClientProvider>
    
    </UserProgressContextProvider>
    </CartContextProvider>
    </>
  )
}

export default App
