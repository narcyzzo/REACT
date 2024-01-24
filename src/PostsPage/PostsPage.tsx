import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPosts, filterPosts, setLoading } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './PostsPage.styles';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import SearchInput from 'SearchInput/SearchInput';
import PostsGroup from 'PostsGroup/PostsGroup';

const PostsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { posts, filteredPosts, loading } = useAppSelector(state => state.app);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	useEffect(() => {
		let timeoutId: any;
		if (searchPhrase) {
			timeoutId = setTimeout(() => {
				dispatch(setLoading());
				dispatch(filterPosts(searchPhrase));
			}, 500);
		}
		return () => clearTimeout(timeoutId);
	}, [searchPhrase, dispatch]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					<SearchInput
						placeholder='Wyszukaj post...'
						id='searchPhrase'
						value={searchPhrase}
						changeFn={setSearchPhrase}
					/>
					<PostsGroup posts={searchPhrase ? filteredPosts : posts} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default PostsPage;
