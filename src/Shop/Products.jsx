import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { Outlet } from 'react-router-dom';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ProductItem from './ProductItem.jsx';
import Button from '../UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { useContext } from 'react';
import Cart from "./Cart.jsx"
import Modal from '../UI/Modal.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Products = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
// opens cart
  function handleShowCart() {
    userProgressCtx.showCart();
    
    setIsCartModalOpen(true);
    // content = <Cart></Cart>;
  }
  function handleCloseCart() {
    userProgressCtx.hideCart(); // Update user progress context
    setIsCartModalOpen(false); // Close the cart modal
  }
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: ({ signal }) => fetchProducts({ signal }),
        staleTime: 1000,
        // gcTime: 1000
    });

    let content;

    if (isPending) {
        content = <LoadingIndicator />;
    }

    if (isError) {
        content = (
            <ErrorBlock
                title="An error occurred"
                message={error.info?.message || 'Failed to fetch events.'}
            />
        );
    }
// products mapping
    if (data) {
        content = (
            <ul className="products-list">
                {data.map((product) => (
                    <li key={product.id}>
                        <ProductItem product={product} />
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <>
            <h1 style={{marginLeft: "300px", position:"absolute"}}>Products</h1>
            <Button textOnly onClick={handleShowCart} style={{marginLeft: "1000px",marginTop: "40px",backgroundColor:"transparent",border:"none",color:"white",fontFamily:"'Lato', sans-serif",fontSize:"20px"}}>
                Cart ({totalCartItems})
            </Button>

            
            
            
            <section className='content-section'>
                {content}
            </section>
        </>

    );
}

export default Products;
