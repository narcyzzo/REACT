import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPhotosWithDetailsByUser } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './UserPhotos.styles';
import PhotosGroup from 'PhotosGroup/PhotosGroup';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import { useNavigate } from 'react-router-dom';

const UserPhotos: FC = () => {
	const dispatch = useAppDispatch();
	const { photos, loading, user } = useAppSelector(state => state.app);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/');
		}
		dispatch(fetchPhotosWithDetailsByUser());
	}, [dispatch, user, navigate]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					<PhotosGroup photos={photos} buttonEnabled={true} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default UserPhotos;
