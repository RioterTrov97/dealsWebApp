import React from 'react';
import './FooterMenu.css';

import { ReactComponent as HomeOutlinedIcon } from './icons/HomeOutlined.svg';
import { ReactComponent as HomeFilledIcon } from './icons/HomeFilled.svg';
import { ReactComponent as FreebiesOutlinedIcon } from './icons/FreebiesOutlined.svg';
import { ReactComponent as NotificationOutlinedIcon } from './icons/NotificationOutlined.svg';
import { ReactComponent as SubmitOutlinedIcon } from './icons/SubmitOutlined.svg';
import { ReactComponent as SubmitFilledIcon } from './icons/SubmitFilled.svg';

import { NavLink } from 'react-router-dom';
import FooterMenuOption from './FooterMenuOption';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function FooterMenu() {
	const user = useSelector(selectUser);
	return (
		<div className="footerMenu">
			<NavLink
				to="/"
				exact
				className="side-link"
				activeClassName="active-link">
				<FooterMenuOption
					CustomIcon={HomeOutlinedIcon}
					CustomIcon2={HomeFilledIcon}
					title="Home"
				/>
			</NavLink>
			<NavLink
				to="/freebies"
				exact
				className="side-link"
				activeClassName="active-link">
				<FooterMenuOption
					CustomIcon={FreebiesOutlinedIcon}
					title="Freebies"
				/>
			</NavLink>
			<NavLink
				to="/submit"
				exact
				className="side-link"
				activeClassName="active-link">
				<FooterMenuOption
					CustomIcon={SubmitOutlinedIcon}
					CustomIcon2={SubmitFilledIcon}
					title="Submit"
				/>
			</NavLink>
			<NavLink
				to="/notifications"
				exact
				className="side-link"
				activeClassName="active-link">
				<FooterMenuOption
					CustomIcon={NotificationOutlinedIcon}
					title="Notifications"
				/>
			</NavLink>
			<NavLink
				to="/my-account"
				exact
				className="side-link"
				activeClassName="active-link">
				<FooterMenuOption avatar={user?.photoUrl} title="My Account" />
			</NavLink>
		</div>
	);
}

export default FooterMenu;
