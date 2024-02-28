import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchProducts({ signal }) {
    let url = 'http://localhost:3000/products';
  
    const response = await fetch(url, { signal: signal });
    
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the products');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { products } = await response.json();
    
    return products;
  }


  export async function fetchProduct({ id, signal }) {
    const response = await fetch(`http://localhost:3000/products/${id}`, { signal });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { product } = await response.json();
  
    return product;
  }

  export async function createNewOrder(orderData) {
    console.log(orderData)
    const response = await fetch(`http://localhost:3000/products`, {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
  
    if (!response.ok) {
      const error = new Error('An error occurred while creating the product');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { order } = await response.json();
    console.log(order);
  
    return order;
  }