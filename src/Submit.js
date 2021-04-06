import React, { useState } from 'react';
import { db } from './firebase';
import firebase from 'firebase';
import './Submit.css';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function Submit() {
	const [category, setCategory] = useState('electronics');
	const [productUrl, setProductUrl] = useState('');
	const [picUrl, setPicUrl] = useState('');
	const [free, setFree] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [coupon, setCoupon] = useState('');
	const [expiry, setExpiry] = useState(30);
	const [buttonView, setButtonView] = useState(false);

	const user = useSelector(selectUser);

	const sendPost = (e) => {
		e.preventDefault();

		const myDate = String(
			new Date(new Date().getTime() + expiry * 24 * 60 * 60 * 1000)
		);

		if (productUrl && picUrl && title) {
			db.collection('deals').add({
				name: user.displayName,
				photoUrl: user.photoUrl ? user.photoUrl : null,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				category: category,
				productUrl: productUrl,
				picUrl: picUrl,
				free: free,
				title: title,
				description: description,
				coupon: coupon,
				expiry: myDate,
				likes: [],
			});
			setCategory('Electronics');
			setProductUrl('');
			setPicUrl('');
			setFree(false);
			setTitle('');
			setDescription('');
			setCoupon('');
			setExpiry(30);
			<Redirect to="/" />;
		} else {
			return alert('Please fill up productUrl, picUrl and title.');
		}
	};

	let editorConfiguration = {
		toolbar: [
			'undo',
			'redo',
			'bold',
			'italic',
			'link',
			'bulletedlist',
			'numberedlist',
			'indent',
			'outdent',
			'inserttable',
			'blockquote',
		],
		toolbarLocation: 'bottom',
	};

	const changeButtons = (e) => {
		e.preventDefault();
		setButtonView(!buttonView);
	};

	return (
		<div className="submit">
			<h1 className="title">Submit Deal</h1>
			<br />
			<form>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}>
					<option value="Electronics">Electronics</option>
					<option value="Grocery">Grocery</option>
					<option value="Fashion">Fashion</option>
					<option value="Housing">Housing</option>
					<option value="Mobile">Mobile</option>
				</select>
				<label>Link/Url</label>
				<input
					value={productUrl}
					onChange={(e) => setProductUrl(e.target.value)}
					placeholder="Add link to product page"
					type="text"
				/>
				<label>Product Picture Url</label>
				<input
					value={picUrl}
					onChange={(e) => setPicUrl(e.target.value)}
					placeholder="Product pic URL"
					type="text"
				/>
				<div className="submit__checkbox">
					<input
						type="checkbox"
						value={free}
						defaultChecked={free}
						onChange={(e) => setFree(e.target.value)}
					/>
					<p>It's free!</p>
				</div>
				<label>Details</label>
				<div className="descriptBox">
					<div className="descriptInputBox">
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Add the amazing deal title"
							type="text"
						/>
						<div className="descriptEditorBox">
							<CKEditor
								editor={Editor}
								config={editorConfiguration}
								data="<p>Brief description of the deal (Optional)</p>"
								onReady={(editor) => {
									console.log(
										'Editor is ready to use!',
										editor
									);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									setDescription(data);
									console.log({ event, editor, data });
								}}
								onBlur={(event, editor) => {
									console.log('Blur.', editor);
								}}
								onFocus={(event, editor) => {
									console.log('renderingggg on Focus');
									console.log('Focus.', editor);
								}}
							/>
						</div>
					</div>
					<div
						className={`descriptButtons ${
							buttonView ? 'descriptButts' : null
						}`}>
						<button onClick={(e) => changeButtons(e)}>
							Coupon
						</button>
						<button onClick={(e) => changeButtons(e)}>
							Expiry
						</button>
					</div>
					<div
						className={`${
							buttonView ? 'labelView' : 'nolabelView'
						}`}>
						<div>
							<label>Coupon</label>
							<input
								value={coupon}
								onChange={(e) => setCoupon(e.target.value)}
								placeholder="Enter if there is any coupon(optional)"
								type="text"
							/>
						</div>
						<div>
							<label>Expiry</label>
							<select
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}>
								<option value="1">1 day</option>
								<option value="2">2 days</option>
								<option value="5">5 days</option>
								<option value="10">10 days</option>
								<option value="30">30 days</option>
							</select>
						</div>
						<button
							className="showLess"
							onClick={(e) => changeButtons(e)}>
							Show less
						</button>
					</div>
				</div>

				<button onClick={sendPost}>Submit Deal</button>
			</form>
		</div>
	);
}

export default withRouter(Submit);
