import React, { useContext } from "react";
import "./navbar.styles.css";

import { Link, useNavigate } from "react-router-dom";
import { UserContext  } from "../../../App";
import { ReactComponent as Cart} from "../../../assests/cart.svg";
import { getAuth, signOut } from "firebase/auth";
import  app  from "../../../firebase/Firebase";

const Navbar = ( {darkTheme, darkText}) => {

    const user = useContext(UserContext);

    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const showLoginAndSignup = (
                <nav className="nav-links-container">

                    <Link to="/" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Home</Link>
                    <Link to="/books" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Books</Link>
                    <Link to="/login" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Login</Link>
                    <Link to="/signup" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>SignUp</Link>
                </nav>
    )

    const showLogoutAndCart = (
                <nav className="nav-links-container">

                    <Link to="/" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Home</Link>
                    <Link to="/books" className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Books</Link>
                    <button    onClick={handleLogout} className={`${darkText ? "nav-links-dark" : "nav-links"}`}>Logout</button>
                    <Link to="/cart" className="cart-link"><Cart /></Link>
                </nav>
    )

    return (
        <section className={`navbar-container ${ darkTheme ? 'background-dark relative' : 'background-transperent'}`}>
            <div className="container flex align-center justify-between">
                <button className="logo">Book<span className="text-primary">Store</span></button>
                
                {user ? showLogoutAndCart : showLoginAndSignup}

            </div>
        </section>
    )
}

export default Navbar;