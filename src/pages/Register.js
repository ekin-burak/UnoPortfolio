import React, { useState } from "react";
import background from "../images/background.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import "../styling/Register.css";
import PopUp from "../popups/PopUp";
import Authentication from "./Authentication";

const Register = () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const navigate = useNavigate();

	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	const handleSubmit = (event) => {
		event.preventDefault();
		var { uname, pass, name, surname, cash } = document.forms[0];

		fetch(`http://localhost:8080/api/customer/register`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				username: uname.value,
				name: name.value,
				surname: surname.value,
				password: pass.value,
				cash: cash.value,
			}),
		}).then((res) => {
			console.log(res.status);
			if (res.status == 201) {
				setErrorMessage("Register successful!");
				setTrigger(true);
				setTimeout(() => {
					navigate("/");
				}, 2000);
			} else {
				setErrorMessage("Something went wrong");
				setTrigger(true);
				setTimeout(() => {
					setTrigger(false);
				}, 2000);
			}
		});
	};
	return (
		<div
			className="body"
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				width: width,
				height: height,
			}}
		>
			<div className="container">
				<img className="logo" src={logo}></img>
				<form onSubmit={handleSubmit} className="loginForm">
					<input
						className="textInput"
						name="uname"
						placeholder="username"
						required
					/>

					<input className="textInput" name="name" placeholder="name" />
					<input
						className="textInput"
						name="surname"
						placeholder="surname"
						required
					/>
					<input
						type="password"
						className="textInput"
						name="pass"
						placeholder="password"
						required
					/>
					<input
						type="text"
						className="textInput"
						name="cash"
						placeholder="cash"
						required
					/>
					<input className="btn" type="submit" value="Register" />
				</form>
			</div>
			<PopUp trigger={trigger} message={errorMessage}></PopUp>
		</div>
	);
};

export default Register;
