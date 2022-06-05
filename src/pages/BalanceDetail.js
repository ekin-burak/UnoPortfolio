import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";

import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";

function BalanceDetail() {
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
			<TradingViewWidget symbol="BINANCE:BTCUSDT" />
		</div>
	);
}

export default BalanceDetail;
