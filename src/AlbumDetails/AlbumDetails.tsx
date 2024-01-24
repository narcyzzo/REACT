import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPhotosWithDetailsByAlbumId } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './AlbumDetails.styles';
import PhotosGroup from 'PhotosGroup/PhotosGroup';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import { useParams } from 'react-router-dom';

const AlbumDetails: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { photos, loading } = useAppSelector(state => state.app);

	useEffect(() => {
		if (id) dispatch(fetchPhotosWithDetailsByAlbumId(id));
	}, [dispatch, id]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					<h2>Wyświetlasz album o numerze id: {photos[0].albumId}</h2>
					<h3>Autor albumu: {photos[0].username}</h3>
					<PhotosGroup photos={photos} buttonEnabled={false} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default AlbumDetails;
