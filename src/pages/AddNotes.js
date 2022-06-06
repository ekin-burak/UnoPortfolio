import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import logo2 from "../images/logo2.png";
import graph from "../images/graph.png";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useNavigate } from "react-router-dom";
import "../styling/AddNotes.css";
import { FaHome } from "react-icons/fa";
import Authentication from "./Authentication";

function AddNotes() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const navigate = useNavigate();

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
				<button onClick={() => navigate("/Home")} className="navbar-btn">
					{Authentication.getUserName()}
				</button>
				<button
					onClick={() => {
						navigate("/");
					}}
					className="navbar-btn"
				>
					Change Capital
				</button>
				<button
					onClick={() => {
						navigate("/RecordTrade");
					}}
					className="navbar-btn"
				>
					Record Trade Activity
				</button>

				<button
					onClick={() => {
						navigate("/Graphs");
					}}
					className="navbar-btn"
				>
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
			{/* <TradingViewWidget symbol="NASDAQ:Old Note TitlePL" theme={Themes.DARK} /> */}

			<form
				style={{
					position: "absolute",
					top: "15%",
					left: "25%",
					width: "70%",
					height: "60%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<input
					className="textInput"
					name="password"
					placeholder="Write your note"
					style={{ width: "70%", height: "60%" }}
				></input>
				<input
					style={{
						width: "70%",
						height: "15%",
						cursor: "pointer",
						backgroundColor: "#37b4a2",
						color: "white",
						fontSize: 18,
					}}
					type="submit"
					value="SAVE"
				></input>
			</form>

			<div className="note-list-container">
				<div className="note-item">Old Note Title</div>
				<div className="note-item">Old Note Title</div>
				<div className="note-item">Old Note Title</div>
				<div className="note-item">Old Note Title</div>
				<div className="note-item">Old Note Title</div>
			</div>
		</div>
	);
}

export default AddNotes;
