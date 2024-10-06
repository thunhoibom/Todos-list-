import { useEffect, useState } from "react";
import './Login.css';
import { Navigate } from "react-router-dom";
import svg from "../../assets/to-do-list-svgrepo-com.svg"
function Login() {
    const [valid, setValid] = useState(false);
    useEffect(() => {
        async function loggedIn() {
            const response = await fetch("http://192.168.2.8:5000/authorization", {
                method: "get",
                credentials: "include",
            })
            const data = await response.json();
            // window.sessionStorage.setItem(data.username, data.password);
            console.log(data)
            if (data) {
                setValid(true);
            }
        }
        loggedIn();
    }, [])
    async function handleSubmit(event) {
        event.preventDefault();
        const userLogin = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        try {
            const response = await fetch("http://192.168.2.8:5000/authorization", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLogin),
                credentials: "include",
            })
            const data = await response.json();
            // window.sessionStorage.setItem(data.username, data.password);

            if (!data) {
                console.log("wrong credentials");
            } else {
                event.target.reset();
                setValid(true)
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="login">
            {valid && (
                <Navigate to="/home" replace={true} />
            )}
            <div className="login_container">
                <div className="login_user_state">
                    <div className="login_user_state_nav">
                        <div id="svg">
                            <img src={svg} alt="logo"></img>
                            <p>todos</p>
                        </div>
                        <div className="login_user_state_nav-reg">
                            <p>Don't have an acount yet?<a href="http://192.168.56.1:5173/register"> Create now</a></p>
                        </div>
                    </div>
                    <div className="login_user_state-container">
                        <p>START YOUR PERSONAL EXPERIENCE</p>
                        <h2>Login your account</h2>
                        <form className="user_state" onSubmit={(e) => handleSubmit(e)}>
                            <div className="login_user_state-container--input">
                                <label htmlFor="username">USERNAME</label>
                                <input name="username"></input>
                            </div>
                            <div className="login_user_state-container--input">
                                <label htmlFor="password">PASSWORD</label>
                                <input name="password" type="password"></input>
                            </div>
                            <div className="submit_bar">
                                <p>Forgot password?</p>
                                <input id="login_sm" type="submit" value="Login"></input>
                            </div>
                        </form>
                    </div>
                    <div className="login_user_state-footer">
                        <p>Term and conditions</p>
                        <p>English</p>
                    </div>
                </div>
                <div className="login_sideBackground">
                    <div className="login_sideBackground-switch">
                    </div>
                    <div className="login_sideBackground-footer">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;