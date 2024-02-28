import { Link } from 'react-router-dom';
import { currencyFormatter } from '../util/formatter';
import Button from '../UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
export default function ProductItem({ product }) {
    const cartCtx = useContext(CartContext);
    function handleAddProducttoCart(){
        cartCtx.addItem(product)
    };
// each product in the products.jsx
    return (
        <article className="product-item">
             <img src={`http://localhost:3000/${product.image}`} alt={product.title} />
            <div className="product-item-content">
                
                    <div>
                        <h2>{product.title}</h2>
                    </div>

                    <p className="product-item-price">{currencyFormatter.format(product.price)}</p>
                    
                    <p>
                        <Link to={`${product.id}`} className="button">
                            View Details
                        </Link>

                        <Button onClick={handleAddProducttoCart} style={{marginLeft:"10px"}}>Add to Cart</Button>
                        
                        
                    </p>
                
            </div>

        </article>
    );
}