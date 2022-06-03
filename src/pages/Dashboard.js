import React, { useEffect, useState } from "react";
import "./Dashboard_style.css";
import logo from "../images/logo.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
function Dashboard() {
	const [coin1, setCoin1] = useState(0);
	const [coin2, setCoin2] = useState(0);
	const [coin3, setCoin3] = useState(0);
	const coins = [
		"BTC",
		"ETH",
		"SOL",
		"FTT",
		"AVAX",
		"PSG",
		"HNT",
		"XRP",
		"BNB",
	];
	const key =
		"965d62502f766e4fa833508437b0503b1eee778d4c31f947215fc5216e287aa1";

	const [timeLeft, setTimeLeft] = useState(3);

	useEffect(() => {
		coins.forEach((coin) => {
			fetch(
				`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=${key}`
			)
				.then((response) => response.json())
				.then((response) => {
					if (coin == "BTC") {
						setCoin1(response.USD);
					} else if (coin == "ETH") {
						setCoin2(response.USD);
					} else if (coin == "SOL") {
						setCoin3(response.USD);
					}
					console.log(response.USD);
				})
				.catch((err) => console.error(err));
		});
		if (!timeLeft) return;
		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);
		return () => clearInterval(intervalId);
	}, [5]);
	return (
		<div className="body">
			{/* <TradingViewWidget
				symbol="NASDAQ:AAPL"
				theme={Themes.DARK}
				
			/> */}
			<PieChart
				data={[
					{ title: "One", value: 50, color: "#E38627" },
					{ title: "Two", value: 15, color: "#C13C37" },
					{ title: "Three", value: 20, color: "#6A2135" },
				]}
				radius={10}
			/>
			;
			<img
				style={{ height: 61, width: 80, position: "absolute", left: 10 }}
				src={logo}
			></img>
			<nav>
				<button>
					<a href="#home">Change Capital</a>
				</button>
				<button>
					<a href="#news">Record Trade Activity</a>
				</button>
				<button>
					<a href="#contact">Add Notes</a>
				</button>
				<button>
					<a href="#about">My Account</a>
				</button>
			</nav>
			<div className="rightSide">
				<p style={{ color: "#6064C6", fontSize: 22, marginBottom: 6 }}>
					Your Top Returning Assets Today
				</p>
				<div className="box">
					<p style={{ padding: 10 }}>BTC/USD</p>
					<p style={{ padding: 10 }}>${coin1}</p>
					<p style={{ padding: 10, color: "green" }}>+%4.2</p>
				</div>
				<div className="box">
					<p style={{ padding: 10 }}>ETH</p>
					<p style={{ padding: 10 }}>${coin2} </p>
					<p style={{ padding: 10, color: "green" }}>+%2.2</p>
				</div>
				<div className="box">
					<p style={{ padding: 10 }}>SOL</p>
					<p style={{ padding: 10 }}>${coin3}</p>
					<p style={{ padding: 10, color: "green" }}>+%1.2</p>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
