import "../styling/Home.css";
import React, { Component } from "react";

class TradeChart extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		const scriptSrc = document.createElement("script");
		const script = document.createElement("script");
		scriptSrc.src = "https://s3.tradingview.com/tv.js";
		scriptSrc.async = true;

		script.innerHTML = new window.TradingView.widget({
			autosize: true,
			symbol: "NASDAQ:AAPL",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "1",
			locale: "tr",
			toolbar_bg: "#f1f3f6",
			enable_publishing: false,
			hide_side_toolbar: false,
			allow_symbol_change: true,
			container_id: "tradingview_54b6c",
		});
		this.myRef.current.appendChild(scriptSrc);
		this.myRef.current.appendChild(script);
	}
	render() {
		return (
			<div className="tradingview-widget-container" ref={this.myRef}>
				<div id="tradingview_7bf97"></div>
			</div>
		);
	}
}

export default TradeChart;
