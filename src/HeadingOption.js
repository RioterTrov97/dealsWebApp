import React from 'react';
import './HeadingOption.css';

function HeadingOption({ title, CustomIcon }) {
	return (
		<div className="headingOption">
			{CustomIcon && <CustomIcon className="headingMenuOption__svg" />}
			<h3 className="headingOption__title">{title}</h3>
		</div>
	);
}

export default HeadingOption;
