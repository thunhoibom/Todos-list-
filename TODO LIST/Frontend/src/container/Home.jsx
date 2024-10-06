"use client";
import { useEffect, useState } from "react";
import TodoList from "../container/TodoList/TodoList";
import Form from "../container/Form/Form.jsx";
import Edit from "../components/EditForm/Edit.jsx";
import { Navigate } from "react-router-dom";
import "./Home.css";
import logoutSvg from "../assets/logout-svgrepo-com.svg"

import "../assets/people-nature-and-landscape-4k_1606595561-768x576.jpg"
function Home() {
    const [todos, setTodos] = useState([]);

    const [isOnEditting, setIsOnEditting] = useState(false);

    const [updatedTitle, setUpdatedtitle] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [idIsBeenEdittingOn, setIdIsBeenEdittingOn] = useState("");

    const [userActivating, setUserActivating] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch(`http://192.168.2.8:5000/api/todolist/`, {
                    method: "get",
                    credentials: "include",
                });
                const data = await response.json();
                if (response.status == 401) {
                    setUserActivating(false);
                }
                if (!data) {
                    setUserActivating(false);
                }
                setTodos(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTodo();
    }, [])
    // (async () => {
    //     const response = await fetch(`http://localhost:5000/api/todolist/`);
    //     const todo = await response.json();
    //     console.log(todo);
    // })()
    function handleLogout(){
        (
            async function lg(){
                try{
                    setUserActivating(false);
                    await fetch('http://192.168.2.8:5000/logout',{
                        method:'get',
                        credentials:'include'
                    });
                }catch(err){
                    console.error(err);
                }
            }
        )()
    }



    return (
        <>
            <div className="logout">
                <button onClick={handleLogout}><img src={logoutSvg} />Log out</button>
            </div>
            <div className="home_container">
                {
                    !isOnEditting && <div>
                        <Form todos={todos} setTodos={setTodos} />
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
                {!userActivating && (
                    <Navigate to="/" replace="true" />
                )}
            </div>
        </>
    )
}

export default Home;