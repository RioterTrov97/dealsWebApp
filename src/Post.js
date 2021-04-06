import { Avatar } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import OutlinedFlagOutlinedIcon from '@material-ui/icons/OutlinedFlagOutlined';

import TextTruncate from 'react-text-truncate';

import React from 'react';
import InputOption from './inputOption';
import './Post.css';

import { useHistory, withRouter } from 'react-router-dom';

import altImage from './default_image.png';
import { useDispatch } from 'react-redux';
import { openPost } from './features/postSlice';

const Post = ({
	name,
	photoUrl,
	category,
	productUrl,
	picUrl,
	free,
	title,
	description,
	coupon,
	expiry,
	timestamp,
}) => {
	let currentTime = new Date();
	let postTime = timestamp.toDate();
	let expiri = new Date(expiry);

	const clickURLHandler = () => {
		window.open(productUrl, '_blank');
	};

	const capitalize = (string = '') =>
		[...string]
			.map((char, index) => (index ? char : char.toUpperCase()))
			.join('');

	let tag = true;
	const history = useHistory();
	const dispatch = useDispatch();

	const openPostDetail = () => {
		dispatch(
			openPost({
				name,
				photoUrl,
				category,
				productUrl,
				picUrl,
				free,
				title,
				description,
				coupon,
				expiry,
				timestamp,
			})
		);
		history.push('/post');
	};

	return (
		<div className="post" onClick={() => openPostDetail()}>
			<div className="post__header">
				<Avatar src={photoUrl}>{name[0].toUpperCase()}</Avatar>
				<div className="post__info">
					<div className="post__username">
						<div className="post__username10">
							<h2 className="post__username1">
								{capitalize(name)}
							</h2>
							<p className="post__username2">
								{'    '}. {timeCalc(postTime, currentTime)} ago
							</p>
						</div>
						<div className="post__username11">
							{expiry ? (
								<p className="post__username3">
									{timeCalc(currentTime, expiri, tag) ? (
										timeCalc(currentTime, expiri, tag)
									) : (
										<span>Expired</span>
									)}
								</p>
							) : null}
						</div>
					</div>
					<div className="post__category">
						<p>{category}</p>
					</div>
				</div>
			</div>
			<div className="post__body">
				<div className="post__body10">
					<img
						src={picUrl}
						alt=""
						onClick={clickURLHandler}
						onError={(e) => (e.target.src = altImage)}
					/>
				</div>

				<div className="post__body20">
					<h3>
						{free ? <span> Freebie</span> : null}
						{
							<TextTruncate
								line={8}
								element="span"
								truncateText="…."
								text={title}
								className="truncated-text"
							/>
						}
					</h3>
					<div
						className="descriptions"
						dangerouslySetInnerHTML={{
							__html: description,
						}}>
						{/* {description ? (
							<p>
								{
									<TextTruncate
										line={2}
										element="span"
										truncateText="…."
										text={description}
									/>
								}
							</p>
						) : null} */}
					</div>
					{coupon ? <p> Coupon: {coupon}</p> : null}
				</div>
			</div>

			<div className="post__buttons">
				<InputOption
					Icon={ThumbUpAltOutlinedIcon}
					title="Like"
					color="gray"
				/>
				<InputOption
					Icon={ChatOutlinedIcon}
					title="Comment"
					color="gray"
				/>
				<InputOption
					Icon={ShareOutlinedIcon}
					title="Share"
					color="gray"
				/>
				<InputOption
					Icon={OutlinedFlagOutlinedIcon}
					title="Report"
					color="gray"
				/>
			</div>
		</div>
	);
};

const timeCalc = (date1, date2, tag) => {
	if (tag && date1 > date2) {
		return null;
	}

	let diff, days, hrs, min, leftSec;
	diff = (date2 - date1) / 1000;
	diff = Math.abs(Math.floor(diff));

	days = Math.floor(diff / (24 * 60 * 60));
	leftSec = diff - days * 24 * 60 * 60;

	hrs = Math.floor(leftSec / (60 * 60));
	leftSec = leftSec - hrs * 60 * 60;

	min = Math.floor(leftSec / 60);
	leftSec = leftSec - min * 60;
	if (days === 0 && hrs === 0 && min === 0) {
		return String(`${leftSec}s${tag ? ' left' : ''}`);
	} else if (days === 0 && hrs === 0) {
		return String(`${min}m ${tag ? ' left' : ''}`);
	} else if (days === 0) {
		return String(`${hrs}h ${tag ? ' left' : ''}`);
	} else {
		return String(`${days}d ${tag ? ' left' : ''}`);
	}
};

export default withRouter(Post);
