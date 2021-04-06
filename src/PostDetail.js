import React from 'react';
import { useSelector } from 'react-redux';
import { selectPost } from './features/postSlice';
import altImage from './default_image.png';

import './PostDetail.css';

function PostDetail() {
	const selectedPost = useSelector(selectPost);
	return (
		<div className="postDetail">
			<div className="innerDetails">
				<h3>{selectedPost?.title}</h3>
				<img
					src={selectedPost?.picUrl}
					alt=""
					onError={(e) => (e.target.src = altImage)}
				/>
				<div
					className="descriptions"
					dangerouslySetInnerHTML={{
						__html: selectedPost?.description,
					}}></div>
			</div>
		</div>
	);
}

export default PostDetail;
