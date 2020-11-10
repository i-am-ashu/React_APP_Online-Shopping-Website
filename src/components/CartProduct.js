import React from "react";
import { useStateValue } from "../context/StateProvider";
import "./CartProduct.css";

function CartProduct({ product }) {
  const { id, image, price, rating, title, quantity } = product;
  const [{ basket }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  return (
    <div className="cartProduct">
      <img className="cartProduct__image" src={image} alt={id} />
      <div className="cartProduct__info">
        <p className="cartProduct__price">
          <small>$</small>&nbsp;
          <strong>{price*quantity}</strong>
        </p>
        <p className="cartProduct__title">{title}</p>
        <small>In stock</small>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>★</p>
            ))}
        </div>
        <p className="quantity">
          Quantity of {quantity}&nbsp;
          <small>(to change quantity go back to product details page)</small>
        </p>
        <p className="total">
          Total : {quantity} × {price} = {price * quantity}
        </p>
        <button onClick={removeFromCart}>Remove</button>
      </div>
    </div>
  );
}

export default CartProduct;
