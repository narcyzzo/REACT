import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchAlbumsWithDetails, filterAlbums, setLoading } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './AlbumPage.styles';
import AlbumsGroup from 'AlbumsGroup/AlbumsGroup';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import SearchInput from 'SearchInput/SearchInput';

const AlbumPage: FC = () => {
	const dispatch = useAppDispatch();
	const { albums, filteredAlbums, loading } = useAppSelector(state => state.app);
	const [searchPhrase, setSearchPhrase] = useState('');
	useEffect(() => {
		dispatch(fetchAlbumsWithDetails());
	}, [dispatch]);

	useEffect(() => {
		let timeoutId: any;
		if (searchPhrase) {
			timeoutId = setTimeout(() => {
				dispatch(setLoading());
				dispatch(filterAlbums(searchPhrase));
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
						placeholder='Wyszukaj albumy...'
						id='searchPhrase'
						value={searchPhrase}
						changeFn={setSearchPhrase}
					/>
					<AlbumsGroup albums={searchPhrase ? filteredAlbums : albums} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default AlbumPage;
