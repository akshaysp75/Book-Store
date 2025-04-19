import React from "react";
import "./signupPage.css";
import AuthBgImg from "../../assests/Gutenberg_Bible,_Lenox_Copy,_New_York_Public_Library,_2009._Pic_01.jpg";
import Navbar from "../../components/layouts/navbar/Navbar";
import AuthForm from "../../components/forms/authForm/authForm";

const SignUp = () => {
    return (
        <>
            <Navbar darkText={true} />
            <section className="signup-container">
                <div className="signup-img-container">
                    <img src={AuthBgImg} alt="authentication-background" />
                </div>
                <div className="signup-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Sign Up</h2>
                            <p>Create a new account with email and password.</p>
                            <AuthForm buttonName="SignUp" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
