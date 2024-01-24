import { Post } from 'appSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
	posts: Post[];
}

const PostsGroup: React.FC<Props> = ({ posts }: Props) => {
	const navigate = useNavigate();

	return (
		<Row xs={1} md={2} lg={3} className='g-4'>
			{posts.map(post => (
				<Col key={post.id}>
					<Card>
						<Card.Body>
							<Card.Title>{post.title}</Card.Title>
							<Card.Text>{post.body}</Card.Text>
							<Card.Text>Autor: {post.user.username}</Card.Text>
							<Button onClick={() => navigate(`/posts/${post.id}`)}>Komenatrze</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default PostsGroup;
