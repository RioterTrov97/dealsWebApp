import React from 'react';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import './Sidebar.css';

function Sidebar() {
	const user = useSelector(selectUser);

	const recentItem = (topic) => (
		<div className="sidebar__recentItem">
			<span className="sidebar__hash">#</span>
			<p>{topic}</p>
		</div>
	);
	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<img
					src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/color-splash-digital-painting-art-3-hakki-arslan.jpg"
					alt=""
				/>
				<Avatar src={user.photoUrl} className="sidebar__avatar">
					{!user.photoUrl ? user?.email[0].toUpperCase() : null}
				</Avatar>
				<h2>{user.displayName}</h2>
				<h4>{user.email}</h4>
			</div>

			<div className="sidebar__stats">
				<div className="sidebar__stat">
					<p>Who viewed you</p>
					<p className="sidebar__statNumber">2,543</p>
				</div>
				<div className="sidebar__stat">
					<p>Views on post</p>
					<p className="sidebar__statNumber">2,443</p>
				</div>
			</div>

			<div className="sidebar__bottom">
				<p>Recent</p>
				{recentItem('reactjs')}
				{recentItem('coding')}
				{recentItem('dev')}
				{recentItem('software')}
			</div>
		</div>
	);
}

export default Sidebar;
