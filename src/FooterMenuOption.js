import React from 'react';
import './FooterMenuOption.css';
import { Avatar } from '@material-ui/core';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

function FooterMenuOption({
	avatar,
	CustomIcon,
	CustomIcon2,
	Icon,
	title,
	onClick,
}) {
	const user = useSelector(selectUser);
	return (
		<div onClick={onClick} className="footerMenuOption">
			{Icon && <Icon className="footerMenuOption__icon" />}
			{CustomIcon && <CustomIcon className="footerMenuOption__svg" />}
			{CustomIcon2 && <CustomIcon2 className="footerMenuOption__svg2" />}
			{avatar && (
				<Avatar src={user.photoUrl} className="footerMenuOption__icon1">
					{!user.photoUrl ? user?.email[0].toUpperCase() : null}
				</Avatar>
			)}
			<h3 className="footerMenuOption__title">{title}</h3>
		</div>
	);
}

export default FooterMenuOption;
