import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styling/RecordTrade.css";
import Authentication from "./Authentication";
import PopUp from "../popups/PopUp";

function RecordTrade() {
	const username = Authentication.getUserName();
	const handleSubmit = (event) => {
		event.preventDefault();
		var { asset, price, amount, asset } = document.forms[0];
		const date = 1654484001;

		if (trade == "Purchase") {
			fetch(
				`http://localhost:8080/api/balance/add/${username}/${price.value}/${amount.value}/${date}/${asset.value}`,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({}),
				}
			).then((res) => {
				console.log(res);
				setErrorMessage("Record succesfull");
				setTrigger(true);
				setTimeout(() => {
					setTrigger(false);
				}, 2000);
			});
		} else {
			fetch(
				`http://localhost:8080/api/balance/sell/${username}/${price.value}/${amount.value}/${date}/${asset.value}`,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "DELETE",
					body: JSON.stringify({}),
				}
			).then((res) => {
				console.log(res);
				setErrorMessage("Record succesfull");
				setTrigger(true);
				setTimeout(() => {
					setTrigger(false);
				}, 2000);
			});
		}
	};

	const navigate = useNavigate();
	const width = window.innerWidth;
	const height = window.innerHeight;

	const [trade, setTrade] = useState("Purchase");
	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	return (
		<div
			className="body"
			style={{
				width: width,
				height: height,
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<img
				style={{
					height: 91,
					width: 120,
					position: "absolute",
					left: 10,
					top: -12,
				}}
				src={logo2}
			></img>
			<nav>
				<FaHome
					onClick={() => {
						navigate("/Home");
					}}
					className="home-btn"
					size={40}
					style={{ position: "absolute", left: "5%", color: "white" }}
				></FaHome>
				<button onClick={() => navigate("/Home")} className="navbar-btn">
					{Authentication.getUserName()}
				</button>
				<button className="navbar-btn">Change Capital</button>
				<button className="navbar-btn">Record Trade Activity</button>

				<button onClick={() => navigate("/Graphs")} className="navbar-btn">
					Graphs
				</button>
				<button
					onClick={() => {
						Authentication.logout();
						navigate("/");
					}}
					className="navbar-btn"
				>
					Log out
				</button>
			</nav>
			<div
				style={{
					height: 60,
					width: 600,
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div
					onClick={() => {
						setTrade("Purchase");
					}}
					className="trade-btn"
					style={{
						fontSize: 20,
						borderTopLeftRadius: 20,
						backgroundColor: trade == "Purchase" ? "#37b4a2" : "white",
						color: trade == "Purchase" ? "white" : "black",
					}}
				>
					Purchase
				</div>
				<div
					onClick={() => {
						setTrade("Sale");
					}}
					className="trade-btn"
					style={{
						fontSize: 20,
						borderTopRightRadius: 20,
						backgroundColor: trade == "Sale" ? "#37b4a2" : "white",
						color: trade == "Sale" ? "white" : "black",
					}}
				>
					Sale
				</div>
			</div>
			<form
				style={{ display: "flex", flexDirection: "column" }}
				onSubmit={handleSubmit}
			>
				<input
					className="record-input"
					style={{
						height: 70,
						width: 600,
						textAlign: "center",
						fontSize: 19,
					}}
					type="text"
					placeholder="asset name"
					name="asset"
				></input>
				<input
					className="record-input"
					style={{
						height: 70,
						width: 600,
						textAlign: "center",
						fontSize: 19,
					}}
					type="text"
					placeholder="amount"
					name="amount"
				></input>
				<input
					className="record-input"
					style={{
						height: 70,
						width: 600,
						textAlign: "center",
						fontSize: 19,
					}}
					type="text"
					placeholder="price"
					name="price"
				></input>

				<input
					className="record-btn"
					style={{
						height: 70,
						width: 600,
						backgroundColor: "#37b4a2",
						color: "white",
						fontSize: 19,
						cursor: "pointer",
					}}
					type="submit"
					value="Save"
				></input>
			</form>
			<PopUp trigger={trigger} message={errorMessage}></PopUp>
		</div>
	);
}

export default RecordTrade;
