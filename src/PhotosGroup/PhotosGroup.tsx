import { PhotoDetails } from 'appSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
	photos: PhotoDetails[];
	buttonEnabled: boolean;
}

const PhotosGroup: React.FC<Props> = ({ photos, buttonEnabled }: Props) => {
	const navigate = useNavigate();

	return (
		<Row xs={1} md={2} lg={3} className='g-4'>
			{photos.map(photo => (
				<Col key={photo.id}>
					<Card>
						<Card.Img variant='top' src={photo.thumbnailUrl} />
						<Card.Body>
							<Card.Title>{photo.title}</Card.Title>
							<Card.Text>Autor: {photo.username}</Card.Text>
							{buttonEnabled ? (
								<Button onClick={() => navigate(`/albums/${photo.albumId}`)}>Przejdź do albumu</Button>
							) : null}
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default PhotosGroup;
