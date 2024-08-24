import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("diegoggg");
  const [created, setCreated] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (input !== "") {
      items.push(input);
      document.getElementById("I1").value = "";
      setInput("");

      const put = [];
      items.forEach((e) => {
        const obj = { label: e, done: false };
        put.push(obj);
      });
      fetchPut(put);
    }
  };

  const fetchGet = () => {
    const requestOptions = {
      method: "GET",
    };

    fetch(`https://playground.4geeks.com/todo/todos/${user}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.map((item) => {
          setItems((e) => [...e, item.label]);
        });
      })
      .catch((error) => console.log("error", error));
  };

  const fetchPut = (todoPut) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(todoPut),
      redirect: "follow",
    };

    fetch(`https://playground.4geeks.com/todo/todos/${user}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const fetchDel = () => {
    setUser("");
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://playground.4geeks.com/todo/todos/${user}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setCreated(false);
  };

  const fetchPost = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify([]);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://playground.4geeks.com/todo/todos/${user}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setCreated(true);
  };

  useEffect(() => {
    fetchGet();
  }, []);

  const fTask = items.map((e, i) => (
    <li
      key={i}
      className="list-group-item d-flex justify-content-between"
      onMouseOver={() => setTaskToDelete(e)}
    >
      {e}
      {taskToDelete === e && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
            const newItems = items.filter((item) => item !== e);
            setItems(newItems);
            fetchPut(newItems.map((item) => ({ label: item, done: false })));
          }}
        >
          X
        </button>
      )}
    </li>
  ));

  return (
    <div className="mx-auto" style={{ width: "35vw" }}>
      <h1 className="text-center">To Do List</h1>
      <p>Usuario: {created ? user : "Ninguno"}</p>
      <div className="card">
        <form onSubmit={submitHandler}>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={
              items.length > 0
                ? `What needs to be done?`
                : "No tasks. Add a task"
            }
            id="I1"
          />
        </form>
        <ul className="list-group list-group-flush" id="task">
          {fTask}
        </ul>
        <div className="card-footer">
          <p>
            {items.length > 0 ? `${items.length} Items left` : "No items left"}
          </p>
          <span
            onClick={() => {
              setItems([]);
              fetchPut([{ label: "#", done: false }]);
            }}
          >
            X
          </span>
        </div>
      </div>
      <div className="container row m-auto p-2 justify-content-between futer">
        <input
          formtype="text"
          placeholder="Nombre de usuario"
          className="col-6"
          id="I2"
          onChange={(e) => setUser(e.target.value)}
        ></input>

        {created == false ? (
          <button
            type="button"
            className="btn btn-success col-4"
            onClick={() => {
              fetchPost(), (I2.value = "");
            }}
          >
            Crear usuario
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger col-4"
            onClick={() => {
              fetchDel(), setItems([]);
            }}
          >
            Borrar usuario
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;