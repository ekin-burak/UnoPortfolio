import React from "react";
import "./Dashboard_style.css";
import logo from "../images/logo.png";
import graph from "../images/graph.png";

function Dashboard() {
	return (
		<div className="body">
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
			<img
				style={{
					height: 420,
					width: 500,
					position: "absolute",
					top: "20%",
					left: "20%",
				}}
				src={graph}
			></img>

			<div className="rightSide">
				<p style={{ color: "#6064C6", fontSize: 22, marginBottom: 6 }}>
					Your Top Returning Assets Today
				</p>
				<div className="box">
					<p style={{ padding: 10 }}>BTC/USD</p>
					<p style={{ padding: 10 }}>$41352</p>
					<p style={{ padding: 10, color: "green" }}>+%4.2</p>
				</div>
				<div className="box">
					<p style={{ padding: 10 }}>TCELL</p>
					<p style={{ padding: 10 }}>₺22.5 </p>
					<p style={{ padding: 10, color: "green" }}>+%2.2</p>
				</div>
				<div className="box">
					<p style={{ padding: 10 }}>GOLD</p>
					<p style={{ padding: 10 }}>$1921</p>
					<p style={{ padding: 10, color: "green" }}>+%1.2</p>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
