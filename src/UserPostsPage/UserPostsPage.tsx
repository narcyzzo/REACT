import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPostsByUser } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './UserPostsPage.styles';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import PostsGroup from 'PostsGroup/PostsGroup';
import { useNavigate } from 'react-router-dom';

const UserPostsPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { posts, loading, user } = useAppSelector(state => state.app);

	useEffect(() => {
		if (!user) {
			navigate('/');
		}
		dispatch(fetchPostsByUser());
	}, [dispatch, user, navigate]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					<PostsGroup posts={posts} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default UserPostsPage;
