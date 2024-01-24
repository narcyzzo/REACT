import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPost } from 'appSlice';
import MainTemplate from 'MainTemplate/MainTemplate';
import { Wrapper } from './PostDetails.styles';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Comments from 'Comments/Comments';

const PostDetails: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { post, loading } = useAppSelector(state => state.app);

	useEffect(() => {
		if (id) dispatch(fetchPost(id));
	}, [dispatch, id]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					{post && (
						<>
							<Card>
								<Card.Body>
									<Card.Title>{post.title}</Card.Title>
									<Card.Subtitle>{post.user.name}</Card.Subtitle>
									<Card.Text>{post.body}</Card.Text>
									<h3 className='text-center'>
										<Badge bg='secondary'>Komenatrze</Badge>
									</h3>
									<Comments comments={post.comments} />
								</Card.Body>
							</Card>
						</>
					)}
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default PostDetails;
