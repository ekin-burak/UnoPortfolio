import React from "react";
import background from "../images/background.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import "../styling/Register.css";

const Register = () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const navigate = useNavigate();
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
				<form className="loginForm">
					<input
						className="textInput"
						name="username"
						placeholder="username"
					/>
					<input className="textInput" name="email" placeholder="email" />
					<input
						className="textInput"
						name="password"
						placeholder="password"
					/>
					<input
						className="textInput"
						name="password again"
						placeholder="password again"
					/>
					<input
						className="btn"
						// style={{
						// 	backgroundColor: "#37B4A2",
						// 	width: 130,
						// 	height: 40,
						// 	borderRadius: 10,
						// 	borderColor: "#37B4A2",
						// 	color: "white",
						// 	marginTop: 7,
						// 	fontSize: 14,
						// }}
						type="submit"
						value="Register"
					/>
					{/* <Link style={{ color: "white", fontSize: 13, marginTop: 13 }}>
						Don't have an account yet? Register Now!
					</Link> */}
				</form>
			</div>
		</div>
	);
};

export default Register;
