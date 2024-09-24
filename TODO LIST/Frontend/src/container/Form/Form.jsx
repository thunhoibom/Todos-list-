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
            <h1>basic todo app</h1>
            <input type="text" name="todo" placeholder="Write what you do next"></input>
            <button type="submit">Create</button>
        </form>
    );
}

export default Form;