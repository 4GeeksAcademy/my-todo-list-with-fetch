import React, { useState } from "react";

function Home() {

    const [toDoArr, setToDoArr] = useState (["Do work"])
    const [input, setInput] = useState("")

    function addItem () {
        let result = input.trim()
        if (!result) {
            alert("You need to enter valid text!")
        } else {
            setToDoArr(toDoArr.concat([result]))
            setInput("")
        }

    }

    const listItems = toDoArr.map((item, index) => 
        <li className="d-flex justify-content-between hoverParent">
        <p className="m-2" >{item}</p>
        <button className="btn btn-danger hoverButton" 
        onClick={ () => setToDoArr(toDoArr.filter((x, i) => {return index != i}))}
        ><i class="fa-solid fa-x"></i></button>
        </li>
        )
    return (
        <div className="container">
            <h1 className="text-center">To Do List</h1>
            <ul>
                <li className="d-flex">
                     <input 
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                addItem()
                                }
                                }}
                            value={input} placeholder="What needs to be done?"/>
                            <button className="btn btn-primary" onClick={addItem}>Submit</button>
                </li>
                {listItems.length === 0 ? <li><p className="m-2" >No tasks, add a task.</p></li> : ""}
                {listItems}
            </ul>
            <p>{listItems.length} item{listItems.length != 1 ? "s" : ""} left</p>
            
        </div>
    )
}

export default Home;