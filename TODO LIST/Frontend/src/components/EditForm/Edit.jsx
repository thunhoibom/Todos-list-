import {useRef} from 'react'
function Edit({setUpdatedTitle, setIsOnEditting,setIsSubmitted}){
    const applySubmit = (event) => {
        event.preventDefault();
        const value = event.target.edit_todo.value;
        setUpdatedTitle(value);
        setIsSubmitted(true);

        setIsOnEditting(false);
        event.target.reset();
    }
    return(
        <div className="todo_edit">
            <h2>Now you can edit your item</h2>
            <form onSubmit={applySubmit}>
                <input type="text" name="edit_todo" placeholder="your modifying"></input>
                <button type = "submit"></button>
            </form>
        </div>
    )
}

export default Edit;