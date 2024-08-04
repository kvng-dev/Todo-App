import React, { useEffect, useRef, useState } from "react";

const TODOList = ({ todos, setTodos }) => {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos.map((item) => (
          <Item key={item.id} item={item} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
};

function Item({ item, setTodos }) {
  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const handleEdit = () => {
    setEditing(true);
  };
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };
  const handleInputBlur = () => {
    setEditing(false);
  };
  const handleInputChange = (e) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodo) => {
      const updatedTodos = prevTodo.filter((todo) => todo.id !== item.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <li id={item?.id} className="todo_item" onClick={completeTodo}>
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-form">
            <input
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={item.is_completed ? "#22c55e" : "#0d0d0d"}
            >
              <circle cx="12" cy="12" r="10" fillRule="nonzero" />
            </svg>
            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M21 7.24a1 1 0 0 0 0-1.42l-3.83-3.83a1 1 0 0 0-1.42 0l-1.44 1.44 5.25 5.25 1.44-1.44zm-7.1 1.44l-11 11V21h2.32l11-11-2.32-2.32zm8.1-4.64L18.9 1.76a1.99 1.99 0 0 0-2.82 0L14.64 3.2l5.25 5.25 1.44-1.44c.39-.39.39-1.03 0-1.42zm-7.52 5.24l-11 11a1.007 1.007 0 0 0-.21.33H1v1.8c0 .55.45 1 1 1h1.8c.13 0 .26-.05.35-.15l11-11-2.32-2.32zm-4.76 11.44H3v-3.94L16.94 4.06l3.94 3.94L11.82 20.28z" />
              </svg>
            </button>
            <button onClick={handleDelete}>
              <span className="visually-hidden">Delete</span>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm2 2h14l-1 12H6L5 8zm5 0v12h2V8h-2zm4 0v12h2V8h-2z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TODOList;
