import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import TradeChart from "./Chart";

function Home() {
	const navigate = useNavigate();
	const width = window.innerWidth;
	const height = window.innerHeight;

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
				<button
					onClick={() => {
						navigate("/RecordTrade");
					}}
					className="navbar-btn"
				>
					Record Trade Activity
				</button>
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
			{/* <TradingViewWidget symbol="BINANCE:BTCUSDT" /> */}
			<TradeChart></TradeChart>
		</div>
	);
}

export default Home;
