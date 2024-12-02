import React from "react";
import './css files/Login.css'

const Login = () => {
    return (
        <section className="login-section">
            <div className="login-form">
                <div className="heading">Shop Anime World</div>
                <div className="sub-heading">
                    <div className="sub-heading-1">Login</div>
                    <div className="sub-heading-2">Login with your email address and we'll send you a login mail</div>
                </div>
                <div className="form-action">
                    <div className="email-feild">
                        <input type="text" placeholder="Email" />
                    </div>
                    <div className="sign-in-button">
                        Sign in
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;