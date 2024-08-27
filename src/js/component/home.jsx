import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("diegoggg");
  const apiUrl = 'https://playground.4geeks.com/todo/';

  useEffect(() => {
    createdUser();
    getTodos();
  }, []);

  const createdUser = () => {
    fetch(`${apiUrl}users/${user}`, {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  const getTodos = () => {
    fetch(`${apiUrl}users/${user}`, {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          createdTodoList();
          throw new Error("La lista no existe");
        }
        return response.json();
      })
      .then(data => setItems(data.todos))
      .catch(err => console.error(err));
  }

  const createdTodoList = () => {
    fetch(`${apiUrl}todos/${user}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => getTodos())
      .catch(err => console.error(err));
  }

  const addTask = (taskEntry) => {
    const newTask = { label: taskEntry, is_done: false };
    fetch(`${apiUrl}todos/${user}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => {
        if (response.ok) {
          getTodos();
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error adding task:', error));
  };

  const taskDelete = (id) => {
    fetch(`${apiUrl}todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          getTodos();
          return response.json();
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input !== "") {
      addTask(input);
      setInput("");
    }
  };

  return (
    <div className="mx-auto" style={{ width: "35vw" }}>
      <h1 className="text-center">To Do List</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="What needs to be done?"
          id="I1"
        />
      </form>
      <ul className="list-group list-group-flush" id="task">
        {items.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            {item.label}
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => taskDelete(item.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="card-footer">
        <p>
          {items.length > 0 ? `${items.length} Items left` : "No items left"}
        </p>
        <span
          onClick={() => {
            setItems([]);
            addTask("#");
          }}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Home;