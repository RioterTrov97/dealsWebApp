import React from 'react';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebase';

import { NavLink } from 'react-router-dom';

import { ReactComponent as HomeOutlinedIcon } from './icons/HomeOutlined.svg';
import { ReactComponent as HomeFilledIcon } from './icons/HomeFilled.svg';
import { ReactComponent as FreebiesOutlinedIcon } from './icons/FreebiesOutlined.svg';
import { ReactComponent as NotificationOutlinedIcon } from './icons/NotificationOutlined.svg';
import { ReactComponent as SubmitOutlinedIcon } from './icons/SubmitOutlined.svg';
import { ReactComponent as SubmitFilledIcon } from './icons/SubmitFilled.svg';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';

import SideMenuOption from './SideMenuOption';
import './SideMenu.css';

function SideMenu() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const logoutOfApp = () => {
		dispatch(logout());
		auth.signOut();
	};

	return (
		<div className="sideMenu">
			<div className="sideMenu__top">
				<NavLink
					to="/"
					exact
					className="side-link"
					activeClassName="active-link">
					<SideMenuOption
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
					<SideMenuOption
						CustomIcon={FreebiesOutlinedIcon}
						title="Freebies"
					/>
				</NavLink>
				<NavLink
					to="/submit"
					exact
					className="side-link"
					activeClassName="active-link">
					<SideMenuOption
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
					<SideMenuOption
						CustomIcon={NotificationOutlinedIcon}
						title="Notifications"
					/>
				</NavLink>
				<NavLink
					to="/my-account"
					exact
					className="side-link"
					activeClassName="active-link">
					<SideMenuOption
						avatar={user?.photoUrl}
						title="My Account"
					/>
				</NavLink>
				<SideMenuOption
					Icon={ExitToAppRoundedIcon}
					title="Log Out"
					onClick={logoutOfApp}
				/>
				<SideMenuOption Icon={MenuOpenRoundedIcon} title="More" />
			</div>

			<div className="sideMenu__follow">
				<div className="sideMenu__title">
					<p>Follow us at:</p>
				</div>
				<div className="sideMenu__socialMedia"></div>
			</div>
		</div>
	);
}

export default SideMenu;
