import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import loader from './bx_loader.gif';

class App extends Component {

  constructor() {
    super();
    this.state = {
      newTodo: 'Add a new todo',
      editing: false,
      editingIndex: null,
      notificaton: null,
      todos: [],
      loading:true
    }

    this.apiUrl = 'https://5ce66b0c0adb8e0014a6f011.mockapi.io';
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    //this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    //this.generateTodoId = this.generateTodoId.bind(this);
    this.alert = this.alert.bind(this);
  };

    async componentDidMount() {

    const response = await axios.get(`${this.apiUrl}/todos`);

    //console.log(response);
    setTimeout(() => {
      this.setState({
      todos: response.data,
      loading:false
    });
    }, 1000)
  };

  handleChange(e) {
    this.setState({newTodo: e.target.value})
  }

  async addTodo() {

   const newTodo = {
    name: this.state.newTodo,
    //id: this.generateTodoId()
   };

   await axios.post(`${this.apiUrl}/todos`, {
    name: this.state.newTodo
   })

   //console.log(response)

   const todos = this.state.todos;

   todos.push(newTodo);

   this.setState({
    todos: todos,
    newTodo: ''
   })

   this.alert('Todo added successfully');

  };


  async deleteTodo(index) {
    const todos = this.state.todos;

    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`)

    delete todos[index];

    //console.log(todos);

    this.setState({todos});

    this.alert('Todo deleted successfully');
  };

  editTodo(index) {
    this.setState({editing:true})
    this.setState({
      newTodo: this.state.todos[index].name,
      editingIndex: index
    })
  };

  async updateTodo() {

    const todo = this.state.todos[this.state.editingIndex];

    await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    })

    //console.log(response);

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;

    this.setState({todos, editing:false, editingIndex:null, newTodo:''})

    this.alert('Todo updated successfully');

  };

  alert(notificaton) {
      this.setState({notificaton})

      setTimeout(() => {
        this.setState({notificaton:null})
      },2000)
  };

  render() {
    const{todos} = this.state

  return (
    <div className="App">

      <div className="container">
      { this.state.notificaton &&
        <div className="alert mt-3 alert-success">
      <p className="text-center pt-2">{this.state.notificaton}</p>
      </div>
       }

      <img src={logo} alt="" width="100"/>
      <h2 className="text-center p-4">Todos App</h2>
      <h3>Add new Todo: <input type="text" name="todo" onChange={this.handleChange} value={this.state.newTodo}/></h3>

      <button onClick={this.state.editing ? this.updateTodo : this.addTodo} disabled={this.state.newTodo.length < 5} className="btn-success mb-3 form-control">
      {this.state.editing ? "Update todo" : "Add todo"}
      </button>

      { this.state.loading &&

        <img src={loader} alt="" />
      }

      {
        (!this.state.editing || this.state.loading) &&
          <ul className="list-group">
        {todos.map((item, index) => {
            return <ListItem

            item = {item}

            editTodo = {() => {this.editTodo(index);}}

            deleteTodo = {() => {this.deleteTodo(index);}}

            key = {item.id}

            />
        })}
      </ul>
      }



      </div>
    </div>
  );
}
}

export default App;
