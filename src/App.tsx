import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage/HomePage';
import AlbumPage from 'AlbumPage/AlbumPage';
import AlbumDetails from 'AlbumDetails/AlbumDetails';
import Users from 'Users/Users';
import PostsPage from 'PostsPage/PostsPage';
import PostDetails from 'PostDetails/PostDetails';
import UserPhotos from 'UserPhotos/UserPhotos';
import UserPostsPage from 'UserPostsPage/UserPostsPage';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/albums' element={<AlbumPage />} />
				<Route path='/albums/:id' element={<AlbumDetails />} />
				<Route path='/users' element={<Users />} />
				<Route path='/posts' element={<PostsPage />} />
				<Route path='/posts/:id' element={<PostDetails />} />
				<Route path='/user/photos' element={<UserPhotos />} />
				<Route path='/user/posts' element={<UserPostsPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
