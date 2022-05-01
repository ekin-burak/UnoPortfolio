import React from "react";

export const Header = ({ title }) => {
	return (
		<div>
			<h1 style={{ color: "red", backgroundColor: "yellow" }}>
				{title} Mert{" "}
			</h1>
		</div>
	);
};

Header.defaultProps = {
	title: "Test Tracker",
};

export default Header;
