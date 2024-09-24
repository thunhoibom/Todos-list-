import "./Register.css"

function Register(){

    return(
        <div className="register">
            <h1>Create your own account!</h1>
            <div className="register__container">
                <table>
                    <tbody>
                        <tr>
                            <label>Username</label>
                            <input></input>
                        </tr>
                        <tr>
                            <label>Password</label>
                            <input type="password"></input>
                        </tr>
                        <tr>
                            <label>Repeat your password</label>
                            <input type="password"></input>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Register;