import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styling/RecordTrade.css";

function RecordTrade() {
	const navigate = useNavigate();
	const width = window.innerWidth;
	const height = window.innerHeight;

	const coins = ["BTC", "ETH", "AVAX", "FTT", "XRP", "BNB"];
	const coinComponents = [];
	const [renderState, setRenderState] = useState();
	const [trade, setTrade] = useState("Purchase");
	const [search, setSearch] = useState([]);

	async function setCoinComponents() {
		for (var i = 0; i < coins.length; i++) {
			coinComponents.push(
				<div className="list-item">
					{coins[i]}
					<button style={{ width: "10%", height: "80%", borderWidth: 1 }}>
						trade
					</button>
				</div>
			);
		}
		return coinComponents;
	}

	useEffect(() => {
		setCoinComponents().then((coinComponents) => {
			setRenderState(coinComponents);
		});
	}, []);

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
				<button className="navbar-btn">Change Capital</button>
				<button className="navbar-btn">Record Trade Activity</button>
				<button
					onClick={() => navigate("/AddNotes")}
					className="navbar-btn"
				>
					Add Notes
				</button>
				<button onClick={() => navigate("/Graphs")} className="navbar-btn">
					Graphs
				</button>
				<button className="navbar-btn">My Account</button>
			</nav>
			<div className="table-head">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "33%",
						height: "100%",
						alignItems: "center",
					}}
				>
					<div
						onClick={() => {
							setTrade("Purchase");
						}}
						style={{
							backgroundColor: trade == "Purchase" ? "#22ae29" : "white",
							color: trade == "Purchase" ? "white" : "#37b4a2",
							cursor: "pointer",
						}}
						className="trade-btn"
					>
						Purchase
					</div>
					<div
						onClick={() => {
							setTrade("Sale");
						}}
						style={{
							backgroundColor: trade == "Sale" ? "#D30D0D" : "white",
							color: trade == "Sale" ? "white" : "#37b4a2",
							cursor: "pointer",
						}}
						className="trade-btn"
					>
						Sale
					</div>
				</div>
				<div className="asset-type"> Cryptocurrency </div>
				<input
					type="text"
					// onChange={handleChange}
					className="search-input"
					placeholder="Search"
				></input>
			</div>
			<div className="table-body">{renderState}</div>
		</div>
	);
}

export default RecordTrade;
