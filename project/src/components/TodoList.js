import { ListGroup, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import trash from "../svg/trash.svg";
import edit from "../svg/edit.svg";

function TodoList(props) {
  const [lists, setList] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch("http://3.0.103.3:3003/api/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((e) => {
        setList(e.data);
      });
  }, [render]);

  const addList = (e) => {
    e.preventDefault()
    fetch('http://3.0.103.3:3003/api/createList', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value
      })
    })
    .then((res)=>res.json())
    .then((data) => setRender(!render));

  }

  const editList = (e) => {
    e.preventDefault();

    console.log(props.lists._id);
    fetch(`http://3.0.103.3:3003/api/updateList/${props.lists._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        date: e.target[1].value,
      })
    })
    .then((res)=> console.log(res.json()))
    //       .then((data) => {
    //   handleClose();
    // })
    .then((data) => setRender(!render));

  }
  const [remove, setRemove] = useState(false);
  const deleteList = (id) => {
 
    setRemove(true)
    fetch(`http://3.0.103.3:3003/api/deleteList/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then((data) => {
            setRemove(false)
        }).finally(()=> setRender(!render))
}
  return (
    <div>
       <div className="head my-3">
      <div className="d-flex justify-content-between px-4 my-4">
        <p className="my-3">My ToDo List</p>
        <div className="count my-3">
     
            <p className="number d-flex my-2 px-3">0/</p>

            
        </div>
      </div>
    </div>
  
    <div className="List">
      <ListGroup variant="flush">
        {lists.map((data, i) => {
          return (
            <ListGroup.Item className="d-flex justify-content-between tColor" key={i}>
              <Form className="d-flex justify-content-between">
                <Form.Check type="radio" className=""/>
                </Form>
              {data.name}
              <div className="icons d-flex justify-content-between gap-3">
              <div className="edit" onSubmit={editList}>
                  <img src={edit} alt="" className="edit d-flex align-items-center"/>
              </div>
              <div className="trash" onClick={() => deleteList(data._id)}>         
                  <img src={trash} alt="" className="edit d-flex align-items-center"/>
              </div>
              </div>
             
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <form action="" onSubmit={addList} className="d-flex flex-column">
          <input type="text" placeholder="what's next?" className="todoInput"/>
          <button className="button" type="submit">Add Task</button>
      </form>
      
    </div>
    </div>
  );
}

export default TodoList;
