import { React, useEffect, useState } from "react";
import Authentication from "./pages/Authentication";
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
import PopUp from "./popups/PopUp";

function App() {
	const us = "mert";
	const psw = "1";

	const Root = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const navigate = useNavigate();

		const [trigger, setTrigger] = useState(false);
		const [errorMessage, setErrorMessage] = useState("Default error message");

		const handleSubmit = (event) => {
			event.preventDefault();
			var { uname, pass } = document.forms[0];

			fetch(
				`http://localhost:8080/api/customer/login/${uname.value}/${pass.value}`,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({}),
				}
			).then((res) => {
				console.log(res.status);
				if (res.status == 202) {
					Authentication.registerSuccessfull(uname.value);
					navigate("/Home");
				} else {
					setErrorMessage("Invalid credentials");
					setTrigger(true);
					setTimeout(() => {
						setTrigger(false);
					}, 2000);
				}
			});
		};

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
					<form onSubmit={handleSubmit} className="loginForm">
						<input
							className="textInput"
							name="uname"
							placeholder="username"
							required
						/>
						<input
							className="textInput"
							name="pass"
							placeholder="password"
							required
						/>

						<input className="btn" type="submit" value="LOGIN" />

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
				<PopUp trigger={trigger} message={errorMessage}></PopUp>
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
