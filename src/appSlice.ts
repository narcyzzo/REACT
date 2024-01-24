import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Photo {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
}

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	address: Address;
}

export interface Album {
	userId: number;
	id: number;
	title: string;
	photos: Photo[];
	user: User;
}

export interface PhotoDetails {
	username: string;
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export interface Comment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
	user: User;
	comments: Comment[];
}

interface AppState {
	photos: PhotoDetails[];
	filteredPhotos: PhotoDetails[];
	albums: Album[];
	filteredAlbums: Album[];
	loading: boolean;
	error: string | null;
	users: User[];
	filteredUsers: User[];
	user: User | null;
	posts: Post[];
	filteredPosts: Post[];
	post: Post | null;
}

const initialState: AppState = {
	photos: [],
	filteredPhotos: [],
	albums: [],
	filteredAlbums: [],
	loading: false,
	error: null,
	users: [],
	filteredUsers: [],
	user: null,
	posts: [],
	filteredPosts: [],
	post: null
};

export const fetchPhotosWithDetails = createAsyncThunk('app/fetchPhotosWithDetails', async () => {
	const responsePhotos = await axios.get<Album[]>(
		'https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user'
	);
	const data = await responsePhotos.data;
	return data;
});

export const fetchPhotosWithDetailsByUser = createAsyncThunk('app/fetchPhotosWithDetailsByUser', async () => {
	const responsePhotos = await axios.get<Album[]>(
		'https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user'
	);
	const data = await responsePhotos.data;
	return data;
});

export const fetchPhotosWithDetailsByAlbumId = createAsyncThunk(
	'app/fetchPhotosWithDetailsByAlbumId',
	async (id: string) => {
		const responsePhotos = await axios.get<Album>(
			`https://jsonplaceholder.typicode.com/albums/${id}?_embed=photos&_expand=user`
		);
		const data = await responsePhotos.data;
		return data;
	}
);

export const fetchAlbumsWithDetails = createAsyncThunk('app/fetchAlbumsWithDetails', async () => {
	const responseAlbums = await axios.get<Album[]>(
		'https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user'
	);
	const data = await responseAlbums.data;
	return data;
});

export const fetchUsers = createAsyncThunk('app/fetchUsers', async () => {
	const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
	const data = await response.data;
	return data;
});

export const fetchPosts = createAsyncThunk('app/fetchPosts', async () => {
	const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_expand=user');
	const data = await response.data;
	return data;
});

export const fetchPost = createAsyncThunk('app/fetchPost', async (id: string) => {
	const response = await axios.get<Post>(
		`https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments&_expand=user`
	);
	const data = await response.data;
	return data;
});
export const fetchPostsByUser = createAsyncThunk('app/fetchPostsByUser', async () => {
	const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_expand=user');
	const data = await response.data;
	return data;
});

const filterArray = (inputArray: any[], filterValue: string): any[] => {
	return inputArray.filter(item =>
		Object.values(item).some(val => typeof val === 'string' && val.includes(filterValue))
	);
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoading: state => {
			state.loading = true;
		},
		filterPhotos: (state: AppState, action: PayloadAction<any>) => {
			state.filteredPhotos = filterArray(current(state.photos), action.payload);
			state.loading = false;
		},
		filterAlbums: (state: AppState, action: PayloadAction<any>) => {
			state.filteredAlbums = filterArray(current(state.albums), action.payload);
			state.loading = false;
		},
		filterUsers: (state: AppState, action: PayloadAction<any>) => {
			state.filteredUsers = filterArray(current(state.users), action.payload);
			state.loading = false;
		},
		filterPosts: (state: AppState, action: PayloadAction<any>) => {
			state.filteredPosts = filterArray(current(state.posts), action.payload);
			state.loading = false;
		},
		login: (state: AppState, action: PayloadAction<any>) => {
			if (action.payload) {
				const user = current(state.users).filter(item => item.email === action.payload);
				if (user.length !== 1) {
					state.error = 'Nie znaleziono podanego konta!';
				} else {
					state.error = '';
					state.user = user[0];
				}
			} else {
				state.error = 'Musisz podać email!';
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPhotosWithDetails.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPhotosWithDetails.fulfilled, (state, action) => {
				let tmp = [...action.payload];
				const photos: PhotoDetails[] = [];

				tmp.forEach(item => {
					const photosTmp = item.photos;
					photosTmp.forEach(photo => {
						const newPhoto = {
							username: item.user.username,
							albumId: item.id,
							id: photo.id,
							title: photo.title,
							url: photo.url,
							thumbnailUrl: photo.thumbnailUrl
						};
						photos.push(newPhoto);
					});
				});
				state.photos = photos;
				state.loading = false;
			})
			.addCase(fetchPhotosWithDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania zdjęć.';
			})
			.addCase(fetchAlbumsWithDetails.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAlbumsWithDetails.fulfilled, (state, action) => {
				state.albums = action.payload;
				state.loading = false;
			})
			.addCase(fetchAlbumsWithDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania albumów';
			})
			.addCase(fetchPhotosWithDetailsByAlbumId.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPhotosWithDetailsByAlbumId.fulfilled, (state, action) => {
				let item = { ...action.payload };
				const photos: PhotoDetails[] = [];

				const photosTmp = item.photos;
				photosTmp.forEach(photo => {
					const newPhoto = {
						username: item.user.username,
						albumId: item.id,
						id: photo.id,
						title: photo.title,
						url: photo.url,
						thumbnailUrl: photo.thumbnailUrl
					};
					photos.push(newPhoto);
				});
				state.photos = photos;
				state.loading = false;
			})
			.addCase(fetchPhotosWithDetailsByAlbumId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania zdjęć.';
			})
			.addCase(fetchUsers.pending, state => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.loading = false;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania userów';
			})
			.addCase(fetchPosts.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts = action.payload;
				state.loading = false;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania postów';
			})
			.addCase(fetchPost.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPost.fulfilled, (state, action) => {
				state.post = action.payload;
				state.loading = false;
			})
			.addCase(fetchPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania posta';
			})
			.addCase(fetchPhotosWithDetailsByUser.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPhotosWithDetailsByUser.fulfilled, (state, action) => {
				let tmp = [...action.payload];
				let photos: PhotoDetails[] = [];

				tmp.forEach(item => {
					const photosTmp = item.photos;
					photosTmp.forEach(photo => {
						const newPhoto = {
							username: item.user.username,
							albumId: item.id,
							id: photo.id,
							title: photo.title,
							url: photo.url,
							thumbnailUrl: photo.thumbnailUrl
						};
						photos.push(newPhoto);
					});
				});
				const user = current(state.user);
				photos = photos.filter(photo => photo.username === user?.username);
				state.photos = photos;
				state.loading = false;
			})
			.addCase(fetchPhotosWithDetailsByUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania zdjęć.';
			})
			.addCase(fetchPostsByUser.pending, state => {
				state.loading = true;
			})
			.addCase(fetchPostsByUser.fulfilled, (state, action) => {
				const tmp = [...action.payload];
				const user = current(state.user);
				state.posts = tmp.filter(post => post.userId === user?.id);
				state.loading = false;
			})
			.addCase(fetchPostsByUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Wystąpił błąd podczas pobierania postów';
			});
	}
});
export const { setLoading, filterPhotos, filterAlbums, filterUsers, filterPosts, login } = appSlice.actions;
export default appSlice.reducer;
