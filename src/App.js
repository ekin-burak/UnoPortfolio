import { React, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import background from "./images/background.png";
import logo from "./images/logo.png";

import Register from "./pages/Register";
import Home from "./pages/Home";
import "./styling/App.css";
import AddNotes from "./pages/AddNotes.js";
import Graphs from "./pages/Graphs.js";
import BalanceDetail from "./pages/BalanceDetail";
import RecordTrade from "./pages/RecordTrade";

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
								navigate("/Home");
							}}
							className="btn"
							type="submit"
							value="LOGIN"
						/>

						<a
							className="link"
							href="/Register"
							style={{
								fontSize: 15,
								marginTop: 13,
								color: "white",
								backgroundColor: "#606163",
							}}
						>
							Don't have an account yet? Register Now!
						</a>
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
				<Route path="/Home" element={<Home />}></Route>
				<Route path="/AddNotes" element={<AddNotes />}></Route>
				<Route path="/Graphs" element={<Graphs />}></Route>
				<Route path="/BalanceDetail" element={<BalanceDetail />}></Route>
				<Route path="/RecordTrade" element={<RecordTrade />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
