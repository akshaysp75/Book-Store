import React, { useState, useEffect, createContext } from "react"; 
import {  Route, Routes } from "react-router-dom";
import app from "./firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BookPage";
import CartPage from "./pages/CartPage/cartPage";
import BookDetails from "./pages/bookdetailpage/BookDetails";
import Login from "./pages/loginPage/loginPage";
import SignUp from "./pages/signupPage/signupPage";
import ScrollToTop from "./components/util/scrollToTop";
import SearchPage from "./pages/searchPage/searchPage";

export const UserContext = createContext({});
export const CartContext = createContext({
    cartItems: [],
    totalAmount: 0,
    setCartItems: () => {},
  });
  

const App = () => {
  const auth = getAuth(app);

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle user authentication state change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
  }, [auth]);  

   // Load cart from localStorage on mount
   useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Recalculate the total amount when cart items change
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseInt(item.price) * item.quantity;
    });
    setTotalAmount(total);
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (bookData) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === bookData.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === bookData.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...bookData, quantity: 1 }];
      }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (bookId) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <ScrollToTop>
      <UserContext.Provider value={authenticatedUser}>
      <CartContext.Provider value={{ cartItems, setCartItems, totalAmount, addToCart, removeFromCart }}>
      
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book-details/:id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          
        </CartContext.Provider>
      </UserContext.Provider>
    </ScrollToTop>
  );
};

export default App;
