import React, { useState, useEffect, useContext } from "react";
import "./bookDetailsSection.css";

import { useParams, useNavigate } from "react-router-dom";
import { BookData } from "../../Util/BookData";
import { CartContext, UserContext } from "../../App";

// ✅ Success Popup Component
const SuccessPopup = ({ message, onClose, onGoToCart }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <span className="popup-close" onClick={onClose}>X</span>
          <div className="success-icon">
            <span role="img" aria-label="success">✅</span>
          </div>
          <p>{message}</p>
          <div className="popup-buttons">
            <button onClick={onClose} className="popup-btn ok-btn">OK</button>
            <button onClick={onGoToCart} className="popup-btn go-cart-btn">Go to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Auth Popup Component (Login/Signup Prompt)
const AuthPopup = ({ message, onClose, onLogin }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <span className="popup-close" onClick={onClose}>X</span>
          <div className="warning-icon">
            <span role="img" aria-label="warning">⚠️</span>
          </div>
          <p>{message}</p>
          <div className="popup-buttons">
            <button onClick={onClose} className="popup-btn cancel-btn">Cancel</button>
            <button onClick={onLogin} className="popup-btn login-btn">Login / Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookDetailsSection = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const user = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const newData = BookData.filter((book) => book.id === parseInt(id));
    setBookData(newData[0]);
  }, [id]);

  const handleAddToCart = () => {
    if (user) {
      addToCart(bookData);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      setShowAuthPopup(true);
    }
  };

  const handleGoToCart = () => {
    setShowPopup(false);
    navigate("/cart");
  };

  const handleLoginRedirect = () => {
    setShowAuthPopup(false);
    navigate("/login");
  };

  return (
    <section className="detail-section-container">
      <div className="container">
        <div className="flex-container">
          <div className="book-img-container">
            <img src={bookData.book_url} alt="book" />
          </div>
          <div className="book-detail-container">
            <h2>{bookData.book_name}</h2>
            <p className="text-primary">{bookData.author_name}</p>
            <p className="book-description">{bookData.book_description}</p>
            <p><b>Language:</b> {bookData.language}</p>
            <p><b>Book Length: </b>{bookData.print_length}</p>
            <h3>&#8377;{bookData.price}</h3>
            <button onClick={handleAddToCart} className="cart-button">Add To Cart</button>
          </div>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <SuccessPopup
          message={`The Book "${bookData.book_name}" is added to the Cart`}
          onClose={() => setShowPopup(false)}
          onGoToCart={handleGoToCart}
        />
      )}

      {/* ✅ Auth/Login Popup */}
      {showAuthPopup && (
        <AuthPopup
          message="Please login or sign up to add books to your cart."
          onClose={() => setShowAuthPopup(false)}
          onLogin={handleLoginRedirect}
        />
      )}
    </section>
  );
};

export default BookDetailsSection;
