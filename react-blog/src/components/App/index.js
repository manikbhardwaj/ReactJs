import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Welcome from '../Welcome';
import CreateArticle from '../CreateArticle';
import SingleArticle from '../SingleArticle';
import Login from '../Login';
import Signup from '../Signup';
import PropTypes from 'prop-types';
import Auth from '../Auth';
import RedirectIfAuth from '../RedirectIfAuth';
import UserArticles from '../UserArticles';

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			authUser: null,
      articles:[],
		};
	};

	componentDidMount() {
		const user = localStorage.getItem('user'); // get user information from local storage

		if(user) {
			this.setState({
				authUser: JSON.parse(user),
			});
		}
	}

setAuthUser = (authUser) => {
this.setState({
authUser
}, () => {
  localStorage.setItem('user', JSON.stringify(authUser));
  this.props.notyService.success('Successfully logged in');
  this.props.history.push('/');
});
};

setArticles = (articles) => {
    this.setState({ articles });
}

removeAuthUser = () => {
  localStorage.removeItem('user');
  this.props.notyService.alert('Successfully logged out');
  this.setState({ authUser: null })
}

		render() {
			const { location } = this.props
			return(
				<div>
				{

					(location.pathname !=="/login" && location.pathname !== "/register") &&
					<Navbar authUser={this.state.authUser} removeAuthUser={this.removeAuthUser}/>

				}
				 <Route exact path='/'
          render={
              props => (
                <Welcome
                {...props}
                getArticles={this.props.articlesService.getArticles}
                setArticles={this.setArticles}
                />
              )
         }
         />

				 <Route path='/article/:slug' exact
            render={
              props => (
                <SingleArticle
                  {...props}
                  getArticle={this.props.articlesService.getArticle}
                  articles={this.state.articles}
                />
              )
            }
         />
         <Auth
         path='/articles/create'
         component={CreateArticle}
         props={{
           getArticlesCategories: this.props.articlesService.getArticlesCategories,
           createArticle: this.props.articlesService.createArticle,
           token: this.state.authUser ? this.state.authUser.token : null,
           notyService: this.props.notyService,
         }}
         isAuthenticated={this.state.authUser !== null}

         />

         <Auth
         path="/user/articles"
         component={UserArticles}
         props={{
           getUserArticles: this.props.articlesService.getUserArticles,
           setArticles: this.setArticles,
           deleteArticle: this.props.articlesService.deleteArticle,
           token: this.state.authUser ? this.state.authUser.token : null,
         }}
         isAuthenticated={this.state.authUser !== null}

         />

         <Auth
         path="/article/edit/:slug"
         component={CreateArticle}
         props={{
           getArticlesCategories: this.props.articlesService.getArticlesCategories,
           createArticle: this.props.articlesService.createArticle,
           token: this.state.authUser ? this.state.authUser.token : null,
           articles: this.state.articles,
           updateArticle: this.props.articlesService.updateArticle,
           notyService: this.props.notyService,
         }}
         isAuthenticated={this.state.authUser !== null}

         />

         <RedirectIfAuth
          path="/login"
          component={Login}
          props={{
            setAuthUser: this.setAuthUser,
            loginUser: this.props.authService.loginUser,
          }}
          isAuthenticated={this.state.authUser !== null}
         />

         <RedirectIfAuth
          path="/register"
          component={Signup}
          props={{
            setAuthUser: this.setAuthUser,
            registerUser: this.props.authService.registerUser,
          }}
          isAuthenticated={this.state.authUser !== null}
         />



				 {

		 			(location.pathname !== "/login" && location.pathname !== "/register") && <Footer />

		 		}
				</div>
			);
		}
};

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default App;
