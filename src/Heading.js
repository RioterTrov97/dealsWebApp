import React from 'react';
import './Heading.css';

import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactComponent as TrendingOutlinedIcon } from './icons/TrendingOutlined.svg';
import { ReactComponent as DealOutlinedIcon } from './icons/DealOutlined.svg';
import { ReactComponent as DiscussOutlinedIcon } from './icons/DiscussOutlined.svg';

import logo from './MulyaMitraLogo.png';
import HeadingOption from './HeadingOption';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { NavLink, useHistory } from 'react-router-dom';

function Heading() {
	const [openHam, setOpenHam] = React.useState(false);

	const toggleHam = () => {
		setOpenHam(!openHam);
	};

	let history = useHistory();

	return (
		<div className="heading">
			<div className="heading__left">
				<div className="heading__leftEl">
					<div className="hamburger">
						<button onClick={toggleHam}>
							<MenuIcon
								className="MUIcon"
								style={{ cursor: 'pointer' }}
							/>
						</button>
						<div
							className={openHam ? 'backDrop' : null}
							onClick={toggleHam}>
							<div
								className={`slidingMenu ${
									openHam
										? 'slidingMenuShow'
										: 'slidingMenuHide'
								}`}>
								<div className="IndiMenu">
									<CancelOutlinedIcon
										onClick={toggleHam}
										style={{
											height: '30px',
											width: '30px',
											color: 'rgb(109, 109, 109)',
										}}
									/>
								</div>
								<div
									className="IndiMenu"
									onClick={() => history.push('/submit')}>
									<img
										src={logo}
										alt=""
										style={{ cursor: 'pointer' }}
									/>
									<p>MulyaMitra</p>
								</div>
								<div className="IndiMenu">
									<ExitToAppRoundedIcon
										style={{
											height: '30px',
											width: '30px',
											color: 'rgb(109, 109, 109)',
										}}
									/>
									<p>Log Out</p>
								</div>
							</div>
						</div>
					</div>
					<img
						src={logo}
						alt=""
						style={{ cursor: 'pointer' }}
						onClick={() => history.push('/')}
					/>
				</div>

				<div className="heading__search">
					<SearchIcon />
					<input type="text" placeholder="Search" />
				</div>
			</div>
			<div className="heading__right">
				<NavLink to="/" exact className="link" activeClassName="active">
					<HeadingOption
						CustomIcon={TrendingOutlinedIcon}
						title="Trending"
					/>
				</NavLink>

				<NavLink
					to="/deal"
					exact
					className="link"
					activeClassName="active">
					<HeadingOption CustomIcon={DealOutlinedIcon} title="Deal" />
				</NavLink>

				<NavLink
					to="/discuss"
					exact
					className="link"
					activeClassName="active">
					<HeadingOption
						CustomIcon={DiscussOutlinedIcon}
						title="Discuss"
					/>
				</NavLink>
			</div>
		</div>
	);
}

export default Heading;
