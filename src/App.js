import React, { Component } from "react";
import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TodoList from "./components/TodoList";
import Checkbox from "./components/Checkbox";

import hero from "./img/hero.jpg";
import { HOME, ACTIVE, COMPLETED } from "./constatnts/routes";

import "./header.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, name: "Brahim Benalia Casas", edit: false, complete: false },
        { id: 2, name: "Marc Solá Crack", edit: false, complete: false },
        { id: 3, name: "Brahim Benalia Casas", edit: false, complete: false },
        { id: 4, name: "Marc Solá Crack", edit: false, complete: false },
      ],
      todoName: "",
      editTodoName: "",
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleAddTodo({ todos, todoName }) {
    const newTodo = {
      id: uuidv4(),
      name: todoName,
      complete: false,
    };

    this.setState({ todos: [...todos, newTodo], todoName: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleAddTodo(this.state);
  }

  handleChange(e) {
    this.setState({ todoName: e.target.value });
  }

  handleRemove(id) {
    const { todos } = this.state;
    const arr = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: arr });
  }

  handleChangeCheck(id) {
    const { todos } = this.state;
    const arr = todos.map((todo) => {
      const obj = todo.id === id ? { ...todo, complete: !todo.complete } : todo;
      return obj;
    });

    this.setState({ todos: arr });
  }

  handleEdit(id) {
    const { todos } = this.state;
    const todoToEdit = todos.map((todo) => {
      return todo.id === id ? { ...todo, edit: true } : todo;
    });
    this.setState({ todos: todoToEdit });
  }

  handleChangeTodo(e) {
    // const { todos } = this.state;
    this.setState({ editTodoName: e.target.value });
    // const todoToEdit = todos.map((todo) => {
    //   return todo.id === id ? { ...todo, name: e.target.value } : todo;
    // });
    // this.setState({ todos: todoToEdit });
  }

  handleEditSubmit(e, id) {
    const { todos, editTodoName } = this.state;
    const todoToEdit = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, name: editTodoName, edit: false }
        : todo;
    });
    this.setState({ todos: todoToEdit });
  }

  render() {
    const { todos, todoName, editTodoName } = this.state;
    return (
      <>
        <header>
          <div className="heroImg" alt="hero" src={hero}>
            <h1 className="TODO__Header">TODO</h1>
            <form className="TODO__Form" onSubmit={this.handleSubmit}>
              <Checkbox handleChange={() => {}} />
              <input
                type="text"
                placeholder="Create task"
                className="TODO__Form__New"
                id={todoName}
                name={todoName}
                value={todoName}
                onChange={this.handleChange}
              />
            </form>
          </div>
        </header>

        <Route
          path={ACTIVE}
          exact
          render={(routeProps) => (
            <TodoList
              {...routeProps}
              handleChangeCheck={this.handleChangeCheck}
              handleRemove={this.handleRemove}
              todos={todos.filter((todo) => !todo.complete)}
            />
          )}
        />

        <Route
          path={COMPLETED}
          exact
          render={(routeProps) => (
            <TodoList
              {...routeProps}
              handleChangeCheck={this.handleChangeCheck}
              handleRemove={this.handleRemove}
              todos={todos.filter((todo) => todo.complete)}
            />
          )}
        />

        <Route
          path={HOME}
          exact
          render={(routeProps) => (
            <TodoList
              {...routeProps}
              handleChangeCheck={this.handleChangeCheck}
              handleRemove={this.handleRemove}
              handleEdit={this.handleEdit}
              handleChangeTodo={this.handleChangeTodo}
              handleEditSubmit={this.handleEditSubmit}
              editTodoName={editTodoName}
              todos={todos}
            />
          )}
        />
      </>
    );
  }
}

export default App;
