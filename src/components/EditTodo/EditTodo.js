import React from "react";

export default function EditTodo({
  todo,
  handleChangeTodo,
  handleEditSubmit,
  editTodoName,
}) {
  function onHandleChange(e) {
    handleChangeTodo(e);
  }
  function onHandleSubmit(e) {
    handleEditSubmit(e, todo.id);
  }

  return (
    <>
      <form className="TODO__Form" onSubmit={onHandleSubmit}>
        <input
          type="text"
          placeholder="Create task"
          className="TODO__Form__New"
          id={todo.todoName}
          name={todo.todoName}
          value={editTodoName}
          onChange={onHandleChange}
        />
      </form>
    </>
  );
}
