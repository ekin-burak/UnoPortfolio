import React from "react";
import "./PopUp.css";

function PopUp({ trigger, message }) {
	return trigger ? (
		<div className="popRoot">
			<div className="rectangle">
				<h4 style={{ textAlign: "center" }}>{message}</h4>
			</div>
		</div>
	) : null;
}

export default PopUp;
