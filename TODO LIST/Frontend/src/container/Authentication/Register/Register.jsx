import "./Register.css"


function handleSubmit(event){
    event.preventDefault();
        const fdata = {
            username : event.target.name.value,
            password : event.target.pass.value,
            password_repeat : event.target.pass_repeat.value
        }
        console.log(fdata);
    event.target.reset();
}
function Register() {
    return (
        <div className="register">
            <h1>Create your own account!</h1>
            <div className="register__container">
                <form className="register__container_form" onSubmit={handleSubmit}>
                    <div className="register__container_input-field">
                        <label for="name">Username</label>
                        <input type="text" id="name" placeholder="Create your username"></input>
                    </div>
                    <div className="register__container_input-field">
                        <label for="pass">Password</label>
                        <input type="password" id="pass" placeholder="Create your password"></input>
                    </div>
                    <div className="register__container_input-field">
                        <label for="pass_repeat">Repeat your password</label>
                        <input type="password" id="pass_repeat" placeholder="Repeat your password"></input>
                    </div>
                    <input id="sm"type="submit" value="create"></input>
                </form>
            </div>
        </div>
    )
}

export default Register;