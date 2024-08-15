import React, { useState, useEffect } from "react";

function Home() {
  const [toDoArr, setToDoArr] = useState(["Do work"]);
  const [input, setInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userDeleted, setUserDeleted] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    getUsers();
  }, [userDeleted]);

  function getUsers() {
    fetch("https://playground.4geeks.com/todo/users")
      .then((response) => response.json())
      .then((data) => setUsersList(data.users));
  }

  function CreateUser(username) {
    fetch(`https://playground.4geeks.com/todo/users/${username}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          alert("Usuario creado con éxito");
          setUserDeleted((prev) => !prev);
        } else {
          alert("Algo salió mal");
        }
      })
      .catch((error) => console.log(error));
  }

  function deleteUser(username) {
    fetch(`https://playground.4geeks.com/todo/${username}`, {
      method: "DELETE",
    })
      .then((data) => {
        if (data.ok) {
          alert("Usuario eliminado con éxito");
          setUserDeleted((prev) => !prev);
        } else {
          alert("Algo salió mal");
        }
      });
  }

  function getTasks(username) {
    fetch(`https://playground.4geeks.com/todo/users/${username}`)
      .then((response) => response.json())
      .then((data) => setTasks(data.todos));
  }

  function addItem() {
    let result = input.trim();
    if (!result) {
      alert("You need to enter valid text!");
    } else {
      setToDoArr(toDoArr.concat([result]));
      setInput("");
    }
  }

  const listItems = toDoArr.map((item, index) => (
    <li className="d-flex justify-content-between hoverParent">
      <p className="m-2">{item}</p>
      <button
        className="btn btn-danger hoverButton"
        onClick={() => setToDoArr(toDoArr.filter((x, i) => i !== index))}
      >
        <i class="fa-solid fa-x"></i>
      </button>
    </li>
  ));

  return (
    <div className="mx-auto" style={{ width: "35vw" }}>
      <input
        type="text"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        placeholder="Select a user"
      />
      <button onClick={() => getTasks(selectedUser)}>Get tasks</button>
      <button onClick={CreateUser}>Crear usuario</button>
      <button onClick={deleteUser}>Eliminar usuario</button>

      <label htmlFor="">Lista de usuarios</label>
      {usersList.map((item, index) => (
        <h5 key={index}>{item.name}</h5>
      ))}

      <div className="container">
        <h1 className="text-center">To Do List</h1>

        <ul>
          <li className="d-flex">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem();
                }
              }}
              value={input}
              placeholder="What needs to be done?"
            />
            <button className="btn btn-primary" onClick={addItem}>
              Submit
            </button>
          </li>

          {listItems.length === 0 ? (
            <li>
              <p className="m-2">No tasks, add a task.</p>
            </li>
          ) : (
            ""
          )}
          {listItems}
        </ul>
        <p>
          {listItems.length} item{listItems.length !== 1 ? "s" : ""}
        </p>

        <h2>Tasks for {selectedUser}</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;