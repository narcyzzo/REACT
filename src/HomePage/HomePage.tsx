import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPhotosWithDetails, fetchUsers, filterPhotos, setLoading } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './HomePage.styles';
import PhotosGroup from 'PhotosGroup/PhotosGroup';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import SearchInput from 'SearchInput/SearchInput';
const HomePage: FC = () => {
	const dispatch = useAppDispatch();
	const { photos, filteredPhotos, loading } = useAppSelector(state => state.app);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		dispatch(fetchPhotosWithDetails());
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		let timeoutId: any;
		if (searchPhrase) {
			timeoutId = setTimeout(() => {
				dispatch(setLoading());
				dispatch(filterPhotos(searchPhrase));
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
						placeholder='Wyszukaj zdjęcia...'
						id='searchPhrase'
						value={searchPhrase}
						changeFn={setSearchPhrase}
					/>
					<PhotosGroup photos={searchPhrase ? filteredPhotos : photos} buttonEnabled={true} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default HomePage;
