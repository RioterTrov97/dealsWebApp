import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice';
import './Login.css';
import logo from './MulyaMitraLogo.png';

function Login() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const dispatch = useDispatch();

	const loginToApp = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				console.log(userAuth);
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.displayName,
						profileUrl: userAuth.photoURL,
					})
				);
			})
			.catch((error) => alert(error));
	};

	const register = (e) => {
		e.preventDefault();
		if (!name) {
			return alert('Please enter your full name');
		}
		console.log('isSignUp: ', isSignUp);

		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				console.log('useAuth : ', userAuth);
				userAuth.user
					.updateProfile({
						displayName: name,
						photoURL: profilePic,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: name,
								photoURL: profilePic,
							})
						);
					});
			})
			.catch((error) => alert(error));
	};

	const clickHandler = isSignUp ? register : loginToApp;

	return (
		<div className="login">
			<img src={logo} alt="" />
			<div className="login__name">
				<h1 className="login__name1">Mulya</h1>
				<h1 className="login__name2">Mitra</h1>
			</div>
			<form>
				{isSignUp ? (
					<div className="logins">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Full name (required if registering)"
							type="text"
						/>
						<input
							value={profilePic}
							onChange={(e) => setProfilePic(e.target.value)}
							placeholder="Profile pic URL (optional)"
							type="text"
						/>
					</div>
				) : null}

				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					type="password"
				/>

				<button type="submit" onClick={clickHandler}>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</button>
			</form>
			<p>
				Not a member?{' '}
				<span
					className="login__register"
					onClick={() => setIsSignUp(!isSignUp)}>
					{isSignUp ? 'Login' : 'Register Now'}
				</span>
			</p>
		</div>
	);
}

export default Login;
