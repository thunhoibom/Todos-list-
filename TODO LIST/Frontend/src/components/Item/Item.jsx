import './Item.css'
import { useEffect } from 'react';
import { useRef } from 'react';
function Item({item,setTodos, setIsOnEditting, updatedTitle, isSubmitted, setIsSubmitted,idIsBeenEdittingOn,setIdIsBeenEdittingOn}){
    //retrieve this item id
    //    console.log(item.id);
    const completeTodo = ()=>{
        setTodos(prevTodos => prevTodos.map(
            (todo) => {
                return todo?.id === item?.id?{...todo,is_completed: !todo.is_completed}:todo;
            }
        ))
    }

    const deleteTodo = async () => {
        try{
            await fetch(`http://localhost:5000/api/todolist/${item.id}`,{
                method: "DELETE",
                headers: {"Content-type":"application/json"},
            })
        }catch(error){
            console.log(error);
        }
        setTodos(pevTodos => pevTodos.filter(todo => todo.id !== item.id));
    }
//1
    const editTodos = () =>{
        setIsOnEditting(true);
       setIdIsBeenEdittingOn(item.id);
    }
    useEffect(()=>{
        if(isSubmitted && item.id === idIsBeenEdittingOn){
            try{
                (async () =>{
                    await fetch(`http://localhost:5000/api/todolist/${item.id}`,{
                        method: "PUT",
                        headers: {"Content-type":"application/json"},
                        body: JSON.stringify({
                            id: item.id,
                            title: updatedTitle,
                            is_completed: false,
                        })
                    });
                    setIsSubmitted(false);
                })()
            }catch(err){
                console.log(err);
            }
            setTodos(prevTodos => prevTodos.map(todo => {
                return todo.id === idIsBeenEdittingOn?{...todo,title: updatedTitle}:todo;
            }));
            
        } 
    },[])
    return(
        <li className='todo_item' id={item?.id}>
            <div className='todo_item-left'>
            <button onClick={completeTodo} style={item?.is_completed?{backgroundColor:"red"}:{}}></button>
            <div className='todos_space'></div>
            <p style={item.is_completed?{textDecoration: "line-through"}:{}}>{item?.title}</p>
            </div>
            <div className='todo_item-right'>
                <button onClick={deleteTodo} style={{backgroundColor:"transparent"}}>🗑️</button>
                <button onClick={editTodos}>📝</button>
            </div>
        </li>
    )
}

export default Item;