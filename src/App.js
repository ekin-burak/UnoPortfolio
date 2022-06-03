import { React, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useNavigate,
} from "react-router-dom";
import background from "./images/background.png";
import logo from "./images/logo.png";

import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./styling/App.css";

function App() {
	const us = "mert";
	const psw = "1";

	const Root = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const navigate = useNavigate();
		return (
			<div
				className="root"
				style={{
					// backgroundImage: `url(${background})`,
					// backgroundSize: "cover",
					width: width,
					height: height,
				}}
			>
				<div className="container">
					<img className="unoLogo" src={logo}></img>
					<form className="loginForm">
						<input
							className="textInput"
							name="username"
							placeholder="username"
						/>
						<input
							className="textInput"
							name="password"
							placeholder="password"
						/>

						<input
							onClick={() => {
								navigate("/Dashboard");
							}}
							className="btn"
							type="submit"
							value="Login"
						/>

						<button
							onClick={() => navigate("/Register")}
							style={{
								color: "white",
								fontSize: 13,
								marginTop: 13,
								backgroundColor: "#606363",
							}}
						>
							Don't have an account yet? Register Now!
						</button>
					</form>
				</div>
			</div>
		);
	};
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root></Root>}></Route>
				<Route path="/Register" element={<Register />}></Route>
				<Route path="/Dashboard" element={<Dashboard />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
