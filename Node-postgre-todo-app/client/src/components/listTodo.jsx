import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./editTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // delete todo function

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:9000/todos/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      console.log(result);

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getTodos() {
    const res = await fetch("http://localhost:9000/todos");
    const todoArray = await res.json();
    setTodos(todoArray);
    console.log(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;

/**
 * 
 *  {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
 */
