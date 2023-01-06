import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8888";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [boxActive, setBoxActive] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API_URL + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("An error has oocured" + err));
  };

  const doneTodo = async (id) => {
    const data = await fetch(API_URL + "/todos/done/" + id).then((res) =>
      res.json()
    );
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id){
        todo.done = data.done;
      }
      return todo;
    }))
  }

  const delTodo = async id => {
    const data = await fetch(API_URL + "/todos/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(API_URL + "/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setBoxActive(false);
    setNewTodo("");
  };


  return (
    <div className="app">
      <h1>Welcome to Todo App</h1>

      <div className="todo-list">
        {todos.length > 0 ? todos.map((todo) => (
          <div
            className="todo-box"
            key={todo._id}
            onClick={() => doneTodo(todo._id)}
          >
            <p
              className={
                "inline-block" +
                (todo.done ? " check-box-true" : " check-box-false")
              }
            >
              {todo.done ? "✓" : "✘"}
            </p>

            <p className={"inline-block" + (todo.done ? " done" : "")}>
              {todo.text}
            </p>

            <p
              className="delete-box inline-block"
              onClick={() => delTodo(todo._id)}
            >
              🗑️
            </p>
          </div>
        )) : (<div>You don't have any todos right now!</div>)}
      </div>

      <div className="add-todo-btn" onClick={() => setBoxActive(true)}>
        +
      </div>

      {boxActive ? (<div className="add-todo-box">
        <div className="close-box" onClick={() => setBoxActive(false)}>
          ✘
        </div>

        <div className="content-section">
          <h3>
            Add New Todo
          </h3>

          <input type="text" className="add-todo-input"   onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
          <br />
          <button onClick={addTodo}>
              Add
          </button>
        </div>
      </div>) : ""}
    </div>
  );
}

export default App;
