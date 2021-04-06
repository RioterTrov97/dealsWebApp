import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		post: null,
	},
	reducers: {
		openPost: (state, action) => {
			state.post = action.payload;
		},
	},
});

export const { openPost } = postSlice.actions;
export const selectPost = (state) => state.post.post;

export default postSlice.reducer;
