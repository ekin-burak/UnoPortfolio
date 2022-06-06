import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import { PieChart } from "react-minimal-pie-chart";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Authentication from "./Authentication";

import ReactDOM from "react-dom";
import Modal from "react-modal";
import PopUp from "../popups/PopUp";

function makeid(length) {
	var result = "";
	var characters = "ABCDEF0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

console.log(makeid(5));

const customStyles = {
	content: {
		top: "21%",
		left: "40%",
		height: "20%",
		width: "15%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const key = "965d62502f766e4fa833508437b0503b1eee778d4c31f947215fc5216e287aa1";

function Home() {
	let balancee = 0;
	let newBalance = 0;
	const [balance, setBalance] = useState(0);
	const [trigger, setTrigger] = useState(false);
	const [cashh, setCashh] = useState(0);
	const [realizedPnl, setRealizedPnl] = useState(0);
	const [errorMessage, setErrorMessage] = useState("Default error message");
	const [pieCoins, setPieCoins] = useState([]);
	let pie = [];

	useEffect(() => {
		const username = Authentication.getUserName();
		fetch(`http://localhost:8080/api/customer/users/${username}`)
			.then((res) => res.json())
			.then((json) => {
				setRealizedPnl(json.realized_pnl);
				// console.log("a", json);
				// setBalance(json.cash);
				// console.log(balance);
				balancee += json.cash;
				setCashh(json.cash);
				let color = "#" + makeid(6);
				pie.push({
					title: "USD",
					value: json.cash,
					color: color,
				});
			});
		setTimeout(() => {
			fetch(`http://localhost:8080/api/balance/${username}`)
				.then((res) => res.json())
				.then((json) => {
					if (json.length == 0) {
						setBalance(balancee);
					} else {
						json.forEach((coin) => {
							console.log(coin);
							console.log(coin.amount);
							fetch(
								`https://min-api.cryptocompare.com/data/price?fsym=${coin.pk.asset}&tsyms=USD&api_key=${key}`
							)
								.then((res) => res.json())
								.then((res) => {
									newBalance += res.USD * coin.amount;
									console.log(newBalance);
									let color = "#" + makeid(6);
									console.log(color);
									pie.push({
										title: coin.pk.asset,
										value: res.USD * coin.amount,
										color: color,
									});
								})
								.catch((err) => console.error(err));
						});
					}
				});
		}, 100);
		setTimeout(() => {
			//console.log("tesst");
			console.log(balancee + newBalance);
			setBalance(balancee + newBalance);
			console.log(balance);
			setPieCoins(pie);
		}, 1000);
	}, []);

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

	useEffect(() => {
		// console.log(Authentication.getUserName());
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
					// console.log(response.USD);
				})
				.catch((err) => console.error(err));
		});
	}, []);

	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		var { amount } = document.forms[0];
		const username = Authentication.getUserName();

		fetch(
			`http://localhost:8080/api/customer/change/capital/${username}/${amount.value}`,
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "PUT",
				body: JSON.stringify({}),
			}
		).then((res) => {
			console.log(res.status);
			setErrorMessage("Capital updated");
			setTrigger(true);
			setTimeout(() => {
				setTrigger(false);
			}, 1500);
			window.location.reload();
		});
	};

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
				<button onClick={() => navigate("/Home")} className="navbar-btn">
					{Authentication.getUserName()}
				</button>
				<button className="navbar-btn" onClick={openModal}>
					Change Capital
				</button>

				<FaHome
					onClick={() => {
						navigate("/Home");
					}}
					className="home-btn"
					size={40}
					style={{ position: "absolute", left: "5%", color: "white" }}
				></FaHome>

				<button
					onClick={() => {
						navigate("/RecordTrade");
					}}
					className="navbar-btn"
				>
					Record Trade Activity
				</button>

				<button onClick={() => navigate("/Graphs")} className="navbar-btn">
					Graphs
				</button>
				<button
					className="navbar-btn"
					onClick={() => {
						Authentication.logout();
						navigate("/");
					}}
				>
					Log out
				</button>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "100%",
							position: "relative",
						}}
					>
						<button
							style={{
								width: "12%",
								height: "15%",
								position: "absolute",
								right: "0%",
								top: "0%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								backgroundColor: "#37b4a2",
							}}
							onClick={closeModal}
						>
							X
						</button>
						<form
							onSubmit={handleSubmit}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								height: "100%",
							}}
						>
							<input
								className="form-inp"
								placeholder="usd amount"
								type="text"
								name="amount"
							></input>

							<input
								className="form-btn-save"
								type="submit"
								value="Save"
							></input>
						</form>
					</div>
				</Modal>
			</nav>

			<div style={{ position: "absolute", left: "25%", top: "18%" }}>
				<PieChart data={pieCoins} radius={45} />
			</div>
			<span
				className="spans"
				style={{
					position: "absolute",
					top: "60%",
					left: "22%",
					fontSize: 20,
				}}
			>
				<b style={{ color: "#37b4a2" }}>Balance:</b>&nbsp; $
				{balance.toFixed(2)}
			</span>
			<span
				className="spans"
				style={{
					position: "absolute",
					top: "67%",
					left: "22%",
					fontSize: 20,
				}}
			>
				<b style={{ color: "#37b4a2" }}>Total Realized Pnl:</b>&nbsp; $
				{realizedPnl.toFixed(2)}
			</span>
			<span
				className="spans"
				style={{
					position: "absolute",
					top: "74%",
					left: "22%",
					fontSize: 20,
				}}
			>
				<b style={{ color: "#37b4a2" }}>Cash Amount:</b>&nbsp; ${cashh}
			</span>
			<button
				onClick={() => {
					navigate("/BalanceDetail");
				}}
				style={{
					height: "7%",
					width: 400,
					backgroundColor: "#37b4a2",
					borderWidth: 1,
					position: "absolute",
					top: "79%",
					left: "22%",
					fontSize: 20,
					marginTop: "2%",
					color: "white",
					transition: "transform 125ms ease-in",
				}}
			>
				Balance Detail
			</button>

			<div className="rightSide">
				<p style={{ color: "#6064C6", fontSize: 22, marginBottom: 6 }}>
					Most Trending Assets Today
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
			<PopUp trigger={trigger} message={errorMessage}></PopUp>
		</div>
	);
}

export default Home;
