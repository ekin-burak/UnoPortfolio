import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import "../styling/BalanceDetail.css";
import { FaHome } from "react-icons/fa";
function BalanceDetail() {
	const navigate = useNavigate();
	const width = window.innerWidth;
	const height = window.innerHeight;
	let arr1 = [];
	const [renderState, setRenderState] = useState([]);
	const renderCoins = [];

	const key =
		"965d62502f766e4fa833508437b0503b1eee778d4c31f947215fc5216e287aa1";
	useEffect(() => {
		const username = Authentication.getUserName();
		fetch(`http://localhost:8080/api/balance/${username}`)
			.then((res) => res.json())
			.then((json) => {
				arr1 = json;
			});
		setTimeout(() => {
			// for (var i = 0; i < arr1.length; i++) {
			// 	fetch(
			// 		`https://min-api.cryptocompare.com/data/price?fsym=${arr1[i].pk.asset}&tsyms=USD&api_key=${key}`
			// 	)
			// 		.then((res) => res.json())
			// 		.then((apiData) => {
			// 			console.log(arr1);
			// 			console.log("girdi", apiData);
			// 			console.log("girdi2", { arr1 });
			// 			renderCoins.push(
			// 				<div className="list-item">
			// 					Name: {arr1[i]}
			// 					&nbsp;&nbsp;&nbsp; Amount
			// 					{arr1[i]}
			// 				</div>
			// 			);
			// 		})
			// 		.catch((err) => console.error(err));
			// }
			arr1.forEach((coin) => {
				console.log(coin);
				fetch(
					`https://min-api.cryptocompare.com/data/price?fsym=${coin.pk.asset}&tsyms=USD&api_key=${key}`
				)
					.then((res) => res.json())
					.then((apiData) => {
						console.log("girdi", apiData);
						console.log(coin.pk.asset);

						const PNL =
							coin.amount * apiData.USD -
							coin.average_cost * coin.amount;

						renderCoins.push(
							<div className="list-item">
								<div className="li-col">{coin.pk.asset}</div>
								<div className="li-col">${apiData.USD} </div>
								<div className="li-col">${coin.average_cost}</div>
								<div className="li-col">{coin.amount}</div>
								<div
									style={{ color: PNL > 0 ? "green" : "red" }}
									className="li-col"
								>
									${PNL.toFixed(2)}
								</div>
								<div
									style={{
										color: coin.realized_pnl > 0 ? "green" : "red",
									}}
									className="li-col"
								>
									${coin.realized_pnl}
								</div>
							</div>
						);
					})
					.catch((err) => console.error(err));
			});
			setTimeout(() => {
				setRenderState(renderCoins);
			}, 500);
		}, 600);
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
				<button onClick={() => navigate("/Home")} className="navbar-btn">
					{Authentication.getUserName()}
				</button>
				<button className="navbar-btn">Change Capital</button>
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
					onClick={() => {
						Authentication.logout();
						navigate("/");
					}}
					className="navbar-btn"
				>
					Log out
				</button>
			</nav>
			<div className="table-head">
				<div style={{ borderTopLeftRadius: 20 }} className="th-item">
					Name
				</div>
				<div className="th-item">Price</div>
				<div className="th-item">Avg Cost</div>
				<div className="th-item">Amount</div>
				<div className="th-item">Pnl</div>
				<div style={{ borderTopRightRadius: 20 }} className="th-item">
					Realized Pnl
				</div>
			</div>
			<div className="table-body">{renderState}</div>
		</div>
	);
}

export default BalanceDetail;
