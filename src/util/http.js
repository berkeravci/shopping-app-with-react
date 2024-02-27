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