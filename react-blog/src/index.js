/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import App from './components/App';
import AuthService from './services/auth';
import ArticlesService from './services/articles';
import NotificationsService from './services/notification';

import * as serviceWorker from './serviceWorker';

// const Home = () => {
// 	return "<h1>This is the home page</h1>";
// };
//
//
// const About = () => {
// 	return "<h1>This is the About page</h1>";
// };





//change order of loading of components
const Main = withRouter(( props ) => {
	return(
		<App
		authService={new AuthService()}
		articlesService={new ArticlesService()}
		notyService={new NotificationsService()}
		{...props}
		/>
	);
});

ReactDOM.render(
	<BrowserRouter>
		<Main />
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
