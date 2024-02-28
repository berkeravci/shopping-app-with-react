import { currencyFormatter } from '../util/formatter.js';
// each row in the cart(cart item)
export default function CartItem({
  title,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {title} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease} className='incdecbutton'>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease} className='incdecbutton'>+</button>
      </p>
    </li>
  );
}