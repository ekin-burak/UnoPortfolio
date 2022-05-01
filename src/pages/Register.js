import React from "react";
import { Link } from "react-router-dom";
import background from "../images/background.png";
import logo from "../images/logo.png";

function Register() {
	return (
		<div
			className="body"
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
			}}
		>
			<div className="container">
				<img
					style={{
						height: 300,
						width: 300,
						marginBottom: 15,
						alignSelf: "center",
					}}
					src={logo}
				></img>
				<form className="loginForm">
					<input
						style={{
							border: "1px solid green",
							borderRadius: 10,
							padding: 10,
							marginBottom: 4,
							width: 200,
						}}
						name="username"
						placeholder="username"
					/>
					<input
						style={{
							border: "1px solid green",
							borderRadius: 10,
							padding: 10,
							marginBottom: 4,
							width: 200,
						}}
						name="email"
						placeholder="email"
					/>
					<input
						style={{
							border: "1px solid green",
							borderRadius: 10,
							padding: 10,
							marginBottom: 4,
							width: 200,
							height: 20,
						}}
						name="password"
						placeholder="password"
					/>
					<input
						style={{
							border: "1px solid green",
							borderRadius: 10,
							padding: 10,
							marginBottom: 4,
							width: 200,
							height: 20,
						}}
						name="password again"
						placeholder="password again"
					/>
					<input
						style={{
							backgroundColor: "#37B4A2",
							width: 130,
							height: 40,
							borderRadius: 10,
							borderColor: "#37B4A2",
							color: "white",
							marginTop: 7,
							fontSize: 14,
						}}
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
}

export default Register;
