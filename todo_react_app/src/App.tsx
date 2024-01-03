import AddTodo from "./components/addtodo"
import Navbar from "./components/navbar"
import Todos from "./components/todos"
import "./App.css"

const App = () => {
  return (
   <main>
    <h1>TODO REACT + TYPESCRIPT </h1>
    <Navbar />
     <AddTodo/>
     <Todos />
   </main>
  )
}

export default App
