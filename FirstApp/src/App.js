import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';
import PersonalInformation from './Personal_information';
import Loading from './Loading';

const App = () => {

  const[users, setUsers] = useState([])

  const[loading, setLoading] = useState(false)

  const[location, setLocation] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers();
    setLocation("chandigarh")
  };

  const getUsers = () => {
    setLoading(true);
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => (setUsers([...users, ...response.data.results]), setLoading(false))
    )
  };

  const submitButton = () => (
     <form onSubmit={handleSubmit}>
      <input type="submit" value="Load users" />
      </form>
    );

    const fetchUsers = () => (
       !loading ? users.map(user =>
        <div key={user.id.value}>
          <h4 className="firstnameheading">Name: {user.name.first}</h4>
          <h5 style={{color:'#d4d4d4'}}>Cell: {user.cell}</h5>
          <h6>{location}</h6>
          <hr/>
        </div>
        ): <Loading msg="Loading data" />
    );

  return (

       <div className="App"><header className="App-header">
      {submitButton()}
      {fetchUsers()}
        </header>
        <PersonalInformation userlist={users}/>
        </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       users:[],
//       loading:false,
//       author: "Manik Bhardwaj",
//       title: "Import component",
//       education: "",
//       location: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.getUsers();
//     this.setState({location:"chandigarh"})
//   };

//   getUsers() {
//     this.setState({loading:true});
//     axios('https://api.randomuser.me/?nat=US&results=5')
//     .then(response => this.setState({
//       users: [...this.state.users, ...response.data.results],
//       loading: false
//     }))
//     //this.setState({loading:false});

//   };

//   componentWillMount() {
//     //this.getUsers(); //automatically load data when component is loaded
//   }
//   render() {
//     const {loading, users, location} = this.state
//     return (
//       <div className="App"><header className="App-header">
//       <form onSubmit={this.handleSubmit}>
//       <input type="submit" value="Load users" />
//       </form>
//       { !loading ? users.map(user =>
//         <div key={user.id.value}>
//           <h4 style={{color:'red'}}>Name: {user.name.first}</h4>
//           <h5>Cell: {user.cell}</h5>
//           <h6>{location}</h6>
//           <hr/>
//         </div>
//         ): <Loading msg="data is loading" /> }
//         </header>
//         <PersonalInformation />
//         </div>

//         );

//   }
// }

export default App;
