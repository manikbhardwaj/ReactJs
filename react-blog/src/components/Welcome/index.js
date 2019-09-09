import React from 'react';
import Articles from './Articles';
//import Navbar from './../Navbar';
//import Footer from './../Footer';


class Welcome extends React.Component {

	constructor() {
		super();

		this.state = {
			articles: {},
		};

	};

	async componentWillMount() {

		const articles = await this.props.getArticles();
		//console.log(articles);
		this.setState({	articles });

		this.props.setArticles(articles.data);

	};

	handlePagination = async (url) => {
		const articles = await this.props.getArticles(url);
		this.setState({ articles });
		this.props.setArticles(articles.data);
	};

	render() {
		return (
					<Articles
						articles={this.state.articles.data}
						nextUrl={this.state.articles.next_page_url}
						prevUrl={this.state.articles.prev_page_url}
						handlePagination={this.handlePagination}
					/>)
				};
};

// const Welcome = () => {

// 	return (
// <div>

// <header className="header header-inverse" style={{backgroundImage: 'url(assets/img/bg-gift.jpg)'}} data-overlay={8}>
//   <div className="container text-center">
//     <div className="row">
//       <div className="col-12 col-lg-8 offset-lg-2">
//         <h1>Latest Blog Posts</h1>
//         <p className="fs-20 opacity-70">Read and get updated on how we progress.</p>
//       </div>
//     </div>
//   </div>
// </header>

// <main className="main-content bg-gray">
// 	<div className="row">
//       <div className="col-12 col-lg-6 offset-lg-3">
// 		<Article />
//       </div>
//      </div>

// </main>
// </div>

// )


// };


export default Welcome;
