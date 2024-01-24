import Card from 'react-bootstrap/Card';
import { Comment } from 'appSlice';

interface Props {
	comments: Comment[];
}

const Comments: React.FC<Props> = ({ comments }: Props) => {
	return (
		<>
			{comments.map(comment => (
				<Card key={comment.id} className='m-3'>
					<Card.Header>{comment.email}</Card.Header>
					<Card.Body>
						<Card.Title>{comment.name}</Card.Title>
						<Card.Text>{comment.body}</Card.Text>
					</Card.Body>
				</Card>
			))}
		</>
	);
};

export default Comments;
