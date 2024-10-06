import './Form.css';

import { v4 as uuidv4 } from 'uuid';
function Form({todos,setTodos}){
    const handleSubmit = (event) => {
        event.preventDefault();
        const value = event.target.todo.value;
        const newTodo = {
            id: uuidv4(),
            title: value,
            is_completed: false,
            user_ID:"1111"   
           };
        // const updatedTodoList = JSON.stringify([...todos,newTodo]);
        // localStorage.setItem("todos", updatedTodoList);
        (async () => {
            try{
                await fetch(`http://192.168.2.8:5000/api/todolist/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(newTodo),
                    credentials:'include',
                });
            }catch(err){
                console.error(err);
            }
        })();
        setTodos(prevTodos => [...prevTodos,newTodo])
        event.target.reset();
    }

    return(
        <form className='form_container' onSubmit={handleSubmit}>
            <input type="text" name="todo" placeholder="What you wanna do"></input>
            <div>
                <input id="form-submit" type="submit" value="Create"></input>
            </div>
        </form>
    );
}

export default Form;