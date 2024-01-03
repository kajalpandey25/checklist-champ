import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id:string;
    task:string;
    completed:boolean
    createdAt:Date;
}

export type TodosContext = {
    todos:Todo[];
    handleAddTodo:(task:string) => void; //Call signature
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

export const todosContext = createContext<TodosContext | null >(null)

export const TodosProvider = ({children}: TodosProviderProps) => {

    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
             const newTodos = localStorage.getItem("todos") || "[]";
             return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return[]
        }
    })
    const  handleAddTodo = (task:string) => {
          setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()
                },
                ...prev
            ]
            // console.log("My Previous Data" + prev);
            // console.log(newTodos);
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
          })

    }

    // Mark completed
    const toggleTodoAsCompleted = (id:string) =>{
        setTodos((prev) =>{
            let newTodos = prev.map((todo) =>{
             if(todo.id === id){
                return {...todo, completed: !todo.completed}
             }
             return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
        })
    }

    // delete the indivisal data
    const handleDeleteTodo = (id:string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
        })
    }

   return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
    {children}
   </todosContext.Provider>
}

// consumer
export const useTodos = () =>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("UseTodos used outside of Provider"); 
    }
    return todosConsumer;
}