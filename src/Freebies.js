import React, { useState, useEffect } from 'react';
import './Freebies.css';
import Post from './Post';
import { db } from './firebase';

function Feed() {
	const [deals, setDeals] = useState([]);

	useEffect(() => {
		db.collection('deals')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setDeals(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
	}, []);

	return (
		<div className="feed">
			{deals.map(
				({
					id,
					data: {
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
					},
				}) => (
					<Post
						key={id}
						name={name ? name : 'None'}
						photoUrl={photoUrl ? photoUrl : 'None'}
						category={category}
						productUrl={productUrl}
						picUrl={picUrl}
						free={free}
						title={title}
						description={description}
						coupon={coupon}
						expiry={expiry}
						timestamp={timestamp}
					/>
				)
			)}
		</div>
	);
}

export default Feed;
