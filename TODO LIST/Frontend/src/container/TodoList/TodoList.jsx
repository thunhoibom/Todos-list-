import Item from "../../components/Item/Item"

function TodoList({todos, setTodos, setIsOnEditting, updatedTitle, isSubmitted, setIsSubmitted,idIsBeenEdittingOn,setIdIsBeenEdittingOn}){

    return(
        <ol>
            {
               todos.length > 0 ? todos?.map((item,index) => <Item key={index} 
                                                                   item={item} 
                                                                   setTodos={setTodos} 
                                                                   setIsOnEditting={setIsOnEditting}
                                                                   updatedTitle ={updatedTitle}
                                                                   isSubmitted={isSubmitted}
                                                                   setIsSubmitted={setIsSubmitted}
                                                                   
                                                                   idIsBeenEdittingOn={idIsBeenEdittingOn}
                                                                   setIdIsBeenEdittingOn={setIdIsBeenEdittingOn}
                                                                   />) : <p>No todos yet. Add some using the form!</p>
            }
        </ol>
    )
}

export default TodoList;