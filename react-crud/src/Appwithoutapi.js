import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListItem from "./ListItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "Add a new todo",
      editing: false,
      editingIndex: null,
      notificaton: null,
      todos: [
        { id: 1, name: "play some games" },
        { id: 2, name: "buy some clothes" },
        { id: 3, name: "get some computer books" }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    //this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.generateTodoId = this.generateTodoId.bind(this);
    this.alert = this.alert.bind(this);
  }

  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  addTodo() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    const todos = this.state.todos;

    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ""
    });

    this.alert("Todo added successfully");
  }

  generateTodoId() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];

    if (lastTodo) {
      return lastTodo.id + 1;
    }

    return 1;
  }

  deleteTodo(index) {
    const todos = this.state.todos;

    delete todos[index];

    this.setState({ todos });

    this.alert("Todo deleted successfully");
  }

  editTodo(index) {
    this.setState({ editing: true });
    this.setState({
      newTodo: this.state.todos[index].name,
      editingIndex: index
    });
  }

  updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;

    this.setState({ todos, editing: false, editingIndex: null, newTodo: "" });

    this.alert("Todo updated successfully");
  }

  alert(notificaton) {
    this.setState({ notificaton });

    setTimeout(() => {
      this.setState({ notificaton: null });
    }, 2000);
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container">
          {this.state.notificaton && (
            <div className="alert mt-3 alert-success">
              <p className="text-center pt-2">{this.state.notificaton}</p>
            </div>
          )}

          <h2 className="text-center p-4">Todos App</h2>

          <h3>
            Add new Todo:
            <input
              type="text"
              name="todo"
              onChange={this.handleChange}
              value={this.state.newTodo}
            />
          </h3>

          <button
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTodo.length < 5}
            className="btn-success mb-3 form-control"
          >
            {this.state.editing ? "Update todo" : "Add todo"}
          </button>

          {!this.state.editing && (
            <ul className="list-group">
              {todos.map((todo, index) => {
                return (
                  <ListItem
                    item={todo}
                    editTodo={() => {
                      this.editTodo(index);
                    }}
                    deleteTodo={() => {
                      this.deleteTodo(index);
                    }}
                    key={todo.id}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
