import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';
import LoadingScreen from './LoadingScreen';

import { auth } from './firebase';

import Submit from './Submit';
import Feed from './Feed';
import Heading from './Heading';
import SideMenu from './SideMenu';
import Login from './Login';

import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from 'react-router-dom';
import FooterMenu from './FooterMenu';
import PostDetail from './PostDetail';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth.uid,
						displayName: userAuth.displayName,
						photoUrl: userAuth.photoURL,
					})
				);
				setLoading(false);
			} else {
				dispatch(logout());
				setLoading(false);
			}
		});
	}, [dispatch]);

	const appBody = () => {
		return (
			<div className="app">
				{!user ? (
					<Login />
				) : (
					<div className="app__body">
						<Feed />
					</div>
				)}
			</div>
		);
	};

	let routes = (
		<Router>
			<Switch>
				<Route path="/" exact component={appBody} />
				<Redirect to="/" />
			</Switch>
		</Router>
	);

	if (user) {
		routes = (
			<Router>
				<Heading />
				<div className="app__mainBody">
					<SideMenu />
					<Switch>
						<Route exact path="/submit" component={Submit} />
						<Route exact path="/post" component={PostDetail} />
						<Route exact path="/" component={appBody} />
						<Redirect to="/" />
					</Switch>
				</div>
				<div className="footerMenu">
					<FooterMenu />
				</div>
			</Router>
		);
	}

	return <div>{loading ? <LoadingScreen /> : routes}</div>;
}

export default App;
