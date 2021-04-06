import React from 'react';
import './SideMenuOption.css';
import { Avatar } from '@material-ui/core';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

function SideMenuOption({
	avatar,
	CustomIcon,
	CustomIcon2,
	Icon,
	title,
	onClick,
}) {
	const user = useSelector(selectUser);
	return (
		<div onClick={onClick} className="sideMenuOption">
			{Icon && <Icon className="sideMenuOption__icon" />}
			{CustomIcon && <CustomIcon className="sideMenuOption__svg" />}
			{CustomIcon2 && <CustomIcon2 className="sideMenuOption__svg2" />}
			{avatar && (
				<Avatar src={user.photoUrl} className="sideMenuOption__icon1">
					{!user.photoUrl ? user?.email[0].toUpperCase() : null}
				</Avatar>
			)}
			<h3 className="sideMenuOption__title">{title}</h3>
		</div>
	);
}

export default SideMenuOption;
