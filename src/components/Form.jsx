"use client";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.todo.value;
    setTodos((prevTodo) => [
      ...prevTodo,
      { title: value, id: self.crypto.randomUUID(), is_completed: false },
    ]);
    e.target.reset();
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>
      <button>
        <span className="visually-hidden">Submit</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 11V5h-2v6H5v2h6v6h2v-6h6v-2h-6z" />
        </svg>
      </button>
    </form>
  );
};
export default Form;
