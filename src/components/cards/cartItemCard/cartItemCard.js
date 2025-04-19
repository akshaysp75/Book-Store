import React, { useContext } from "react";
import "./cartItemCard.css";
import { CartContext } from "../../../App";

const CartItemCard = ({ bookData }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <section className="cart-item">
      <div className="cart-item-img-container">
        <img src={bookData.book_url} alt="cart-item-img" className="cart-item-img" />
      </div>
      <div className="cart-item-content-container">
        <h2>{bookData.book_name}</h2>
        <p>{bookData.author_name}</p>
        <h3 className="cart-item-price">&#8377;{bookData.price}</h3>
        <p>Quantity: {bookData.quantity}</p>

        <button onClick={() => removeFromCart(bookData.id)} className="delete-button">
          {bookData.quantity > 1 ? "Remove 1 from Cart" : "Remove from Cart"}
        </button>
      </div>
    </section>
  );
};

export default CartItemCard;
