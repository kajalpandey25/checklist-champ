import { useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos();

    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");
    console.log("🚀 ~ file: todos.tsx:10 ~ Todos ~ todos̥Data:", todosData)
    
    
    let filterData = todos;

    if(todosData === "active"){
        filterData = filterData.filter((task) => !task.completed)
    }

    if(todosData === "completed"){
        filterData = filterData.filter((task) => task.completed)
    }
  return (
    <ul className="main-task">
        {
            filterData.map((todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`todo-${todo.id}`} 
                       checked={todo.completed}
                       onChange={() => toggleTodoAsCompleted(todo.id)}
                    />
                    <label htmlFor={`todo-${todo.id}`} > {todo.task} </label>
                    {
                        todo.completed && (
                            <button type='button' 
                            onClick={()=> handleDeleteTodo(todo.id)}>Delete</button>
                        )
                    }
                </li>
            })
        }
    </ul>
  )
}

export default Todos
