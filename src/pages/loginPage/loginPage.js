import React from "react";
import "./loginPage.css";
import AuthBgImg from "../../assests/Gutenberg_Bible,_Lenox_Copy,_New_York_Public_Library,_2009._Pic_01.jpg";
import Navbar from "../../components/layouts/navbar/Navbar";
import AuthForm from "../../components/forms/authForm/authForm";

const Login = () => {
    return (
        <>
            <Navbar darkText={true} />
            <section className="login-container">
                <div className="login-img-container">
                    <img src={AuthBgImg} alt="authentication-background" />
                </div>
                <div className="login-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Login</h2>
                            <p>Login with email and password to continue.</p>
                            <AuthForm buttonName="Login" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
