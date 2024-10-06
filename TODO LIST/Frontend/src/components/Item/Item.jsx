import './Item.css'
import { useEffect } from 'react';
function Item({ item, setTodos, setIsOnEditting, updatedTitle, isSubmitted, setIsSubmitted, idIsBeenEdittingOn, setIdIsBeenEdittingOn }) {
    //retrieve this item id
    //    console.log(item.id);
    const completeTodo = () => {
        async function getData() {
            try {
                await fetch(`http://192.168.2.8:5000/api/todolist/iscompleted/${item.id}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        is_completed: !item.is_completed,
                    })
                })
            } catch (err) {
                console.error(err);
            }
        }
        getData();
        setTodos(prevTodos => prevTodos.map(
            (todo) => {
                return todo?.id === item.id ? { ...todo, is_completed: !item.is_completed } : todo;
            }
        ));
    }


    const deleteTodo = async () => {
        try {
            await fetch(`http://192.168.2.8:5000/api/todolist/${item.id}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json" },
            })
        } catch (error) {
            console.log(error);
        }
        setTodos(pevTodos => pevTodos.filter(todo => todo.id !== item.id));
    }
    //1
    const editTodos = () => {
        setIsOnEditting(true);
        setIdIsBeenEdittingOn(item.id);
    }
    useEffect(() => {
        if (isSubmitted && item.id === idIsBeenEdittingOn) {
            try {
                (async () => {
                    await fetch(`http://192.168.2.8:5000/api/todolist/${item.id}`, {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            title: updatedTitle,
                        })
                    });
                    setIsSubmitted(false);
                })()
            } catch (err) {
                console.log(err);
            }
            setTodos(prevTodos => prevTodos.map(todo => {
                return todo.id === idIsBeenEdittingOn ? { ...todo, title: updatedTitle } : todo;
            }));

        }
    }, [])
    return (
        <li className='todo_item' id={item?.id}>
            <div className='todo_item-left'>
                <input type="button" onClick={completeTodo} style={item?.is_completed ? { backgroundColor: "red" } : {}}></input>
                <div className='todos_space'></div>
                <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
            </div>
            <div className='todo_item-right'>
                <button id="delete" onClick={deleteTodo} >Delete</button>
                <button id="edit" onClick={editTodos} style={{ backgroundColor: "yellow" }}>Edit</button>
            </div>
        </li>
    )
}

export default Item;