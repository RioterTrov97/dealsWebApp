import React from 'react';
import './inputOption.css';

function inputOption({ Icon, title, color }) {
	return (
		<div className="inputOption">
			<Icon className="inputOption__icon" style={{ color: color }} />
			<h4>{title}</h4>
		</div>
	);
}

export default inputOption;
