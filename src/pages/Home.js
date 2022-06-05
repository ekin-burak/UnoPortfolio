import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Home() {
	const navigate = useNavigate();
	const width = window.innerWidth;
	const height = window.innerHeight;

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
	}, []);
	return (
		<div
			className="body"
			style={{ width: width, height: height, position: "relative" }}
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
			{/* <TradingViewWidget symbol="NASDAQ:AAPL" theme={Themes.DARK} /> */}

			<div style={{ position: "absolute", left: "25%", top: "20%" }}>
				<PieChart
					data={[
						{ title: "One", value: 10, color: "pink" },
						{ title: "Two", value: 15, color: "red" },
						{ title: "Three", value: 20, color: "darkblue" },
					]}
					radius={45}
				/>
			</div>
			<span
				style={{
					position: "absolute",
					top: "65%",
					left: "28%",
					fontSize: 25,
				}}
			>
				Total Amount: 2000 $
			</span>
			<button
				onClick={() => {
					navigate("/BalanceDetail");
				}}
				style={{
					height: "5%",
					width: "20%",
					backgroundColor: "#37b4a2",
					borderWidth: 1,
					position: "absolute",
					top: "70%",
					left: "25%",
					fontSize: 17,
					marginTop: "2%",
					color: "white",
					transition: "transform 125ms ease-in",
				}}
			>
				Balance Detail
			</button>

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
			<div className="leftSide"></div>
		</div>
	);
}

export default Home;
