"use client";
import { useEffect, useState } from "react";
import TodoList from "../container/TodoList/TodoList";
import Form from "../container/Form/Form.jsx";
import Edit from "../components/EditForm/Edit.jsx";
function Home(){
    const [todos,setTodos] = useState([]);

    const [isOnEditting,setIsOnEditting]=useState(false);
    
    const [updatedTitle,setUpdatedtitle]=useState("");
    const [isSubmitted, setIsSubmitted]=useState(false);
    
    const [idIsBeenEdittingOn,setIdIsBeenEdittingOn]=useState("");



    useEffect(()=>{
        const fetchTodo = async () =>{
            try{
                const response = await fetch(`http://192.168.2.8:5000/api/todolist/`);
                // console.log("re-rendering completed");
                const data = await response.json();
                console.log("Data"+data);
                setTodos(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchTodo();
        console.log(todos);
    },[])
    // (async () => {
    //     const response = await fetch(`http://localhost:5000/api/todolist/`);
    //     const todo = await response.json();
    //     console.log(todo);
    // })()
    
    


    return(
    <div>
        {
            !isOnEditting && <div>
                                <Form todos={todos}setTodos={setTodos}/>
                                <TodoList todos={todos} 
                                          setTodos={setTodos} 
                                          setIsOnEditting={setIsOnEditting} 
                                          updatedTitle={updatedTitle}
                                          isSubmitted={isSubmitted}
                                          setIsSubmitted={setIsSubmitted}
                                          
                                          idIsBeenEdittingOn={idIsBeenEdittingOn}
                                          setIdIsBeenEdittingOn={setIdIsBeenEdittingOn}
                                          />
                            </div>
        }
        {
            isOnEditting && <Edit 
                            setUpdatedTitle={setUpdatedtitle} 
                            setIsOnEditting={setIsOnEditting}
                            setIsSubmitted={setIsSubmitted}
                            />
        }
    </div>
    )
}

export default Home;