import React, { Component } from "react";
import classNames from "classnames";
import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TodoList from "./components/TodoList";
import * as api from "./api";
import AppHeader from "./components/AppHeader";

import { HOME, ACTIVE, COMPLETED } from "./constatnts/routes";

import "./app.scss";

const LOCAL_STORAGE_KEY = "todo-state";

function loadLocalStorageData() {
  const prevItems = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!prevItems) {
    return null;
  }

  try {
    return JSON.parse(prevItems);
  } catch (error) {
    return null;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoName: "",
      currentTheme: false,
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleResetEdit = this.handleResetEdit.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleThemeClick = this.handleThemeClick.bind(this);
  }

  componentDidMount() {
    const prevItems = loadLocalStorageData();

    if (!prevItems || !prevItems.todos.length) {
      api.getProducts().then((data) => {
        this.setState({ todos: data });
      });
      return;
    }

    this.setState({
      todos: prevItems.todos,
      currentTheme: prevItems.currentTheme,
    });
  }

  componentDidUpdate() {
    const { todos, currentTheme } = this.state;
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ todos, currentTheme }),
    );
  }

  handleAddTodo(values) {
    const { todos } = this.state;

    const newTodo = {
      id: uuidv4(),
      name: values.name,
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
      return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
      // return obj;
    });

    this.setState({ todos: arr });
  }

  handleClearCompleted() {
    const { todos } = this.state;
    const arr = todos.filter((todo) => todo.complete === false);
    this.setState({ todos: arr });
  }

  handleEdit(id) {
    const { todos } = this.state;
    const todoToEdit = todos.map((todo) => {
      return todo.id === id ? { ...todo, edit: true } : todo;
    });
    this.setState({ todos: todoToEdit });
  }

  handleEditSubmit(values, id) {
    const { todos } = this.state;
    const todoToEdit = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, name: values.name, edit: false }
        : todo;
    });
    this.setState({ todos: todoToEdit });
  }

  handleResetEdit() {
    const { todos } = this.state;
    const todoToEdit = todos.map((todo) => {
      return { ...todo, edit: false };
    });
    this.setState({ todos: todoToEdit });
  }

  handleThemeClick() {
    const { currentTheme } = this.state;
    this.setState({ currentTheme: !currentTheme });
  }

  render() {
    const { todos, currentTheme } = this.state;
    const appClasses = classNames({
      globalContainer: true,
      darkModeOpacity: currentTheme,
    });

    return (
      <div className={appClasses}>
        <AppHeader
          handleAddTodo={this.handleAddTodo}
          handleThemeClick={this.handleThemeClick}
          currentTheme={currentTheme}
        />

        <Route
          path={ACTIVE}
          exact
          render={(routeProps) => (
            <TodoList
              {...routeProps}
              handleChangeCheck={this.handleChangeCheck}
              handleRemove={this.handleRemove}
              todos={todos.filter((todo) => !todo.complete)}
              handleClearCompleted={this.handleClearCompleted}
              currentTheme={currentTheme}
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
              handleClearCompleted={this.handleClearCompleted}
              currentTheme={currentTheme}
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
              handleEditSubmit={this.handleEditSubmit}
              handleResetEdit={this.handleResetEdit}
              handleClearCompleted={this.handleClearCompleted}
              todos={todos}
              currentTheme={currentTheme}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
