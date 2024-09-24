import { useState } from "react";
import './Login.css';
function Login(){

    return(
        <div className="login">
            <h1>One more step to create your own todos list ❤️</h1>
            <form className="user_field">
                <div className="user_field-username">
                    <h1>Login</h1>
                        <label htmlFor="username">Username</label>
                        <input id="username"></input>
                </div>
                <div className="user_field-password">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password"></input>
                </div>
            </form>
            <p href="">Still don't have account yet? <a href="http://192.168.56.1:5173/register">Click here to sign up</a></p>
        </div>
    )
}
export default Login;