import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../../firebase/Firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { motion } from "framer-motion";

const AuthForm = ({ buttonName }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? "" : "Invalid email format");
    };

    const validatePassword = (value) => {
        setPasswordError(
            value.length < 6 ? "Password must be at least 6 characters" : ""
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        if (emailError || passwordError) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (buttonName === "Login") {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: username });
            }

            navigate("/");
        } catch (err) {
            setError(
                buttonName === "Login"
                    ? "Invalid email or password. Please try again."
                    : "Error creating account. Please try again."
            );
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {buttonName === "SignUp" && (
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
            )}

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    required
                />
                {emailError && <p className="form-error">{emailError}</p>}
            </div>

            <div className="form-group">
                <label>Password</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-input"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
                    />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                {passwordError && <p className="form-error">{passwordError}</p>}
            </div>

            {error && <div className="error-message"><p>{error}</p></div>}

            <div className="form-group">
                <input
                    type="submit"
                    className="button-primary button-width"
                    value={isSubmitting ? "Please wait..." : buttonName}
                    disabled={isSubmitting}
                />
            </div>
        </motion.form>
    );
};

export default AuthForm;
