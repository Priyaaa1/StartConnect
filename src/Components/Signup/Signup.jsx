import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Signup.css";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        console.log("Signing up with email:", email, "and password:", password);
    };

    return (
        <div className="signup-outerContainer">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up</button>
                <p>
                    Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                            const credentialDecoded = jwtDecode(credentialResponse.credential);
                            console.log(credentialDecoded);

                    }}
                    onError={() => {
                        console.log("Sign-Up Failed");
                    }}
                />
            </div>
        </div>
    );
};

export default Signup;
