import React from 'react';


const PersonalInformation = ({ userlist }) => {

	return (
		<div className="App">
			<header className="App-header">
			{userlist.map(user =>
					<div key={user.id.value}>
						<h3>Name : {user.name.first}</h3>
						<h5>Cell : {user.cell} </h5>
					</div>
			)}
			</header>
		</div>
	)
}



// class PersonalInformation extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			users:[],
// 			//loading:false,
// 			author: "Manik Bhardwaj",
// 			title: "Import component",
// 			education: "",
// 			location: ""
// 		}
// 	}
//
// 	getPI() {
// 		this.setState({location:"Chandigarh"})
// 		this.setState({education:"MCA"})
// 		this.setState({
// 			users: this.props.userlist
// 		})
// 	}
//
// 	componentWillMount() {
// 		this.getPI()
// 		console.log(this.state.users)
// 	}
// 	render() {
//   return (
//     <div className="App">
//       <header className="App-header">
// 			{this.state.users.map(user =>
// 					<div key={user.id.value}>
// 				<h3>Name : {user.name}</h3>
// 				<h5>Cell : {user.cell} </h5>
// 				</div>
// 			)}
//
//       </header>
//     </div>
//   );
// 	}
// }

export default PersonalInformation;
