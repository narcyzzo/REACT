import { Album } from 'appSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
	albums: Album[];
}

const AlbumsGroup: React.FC<Props> = ({ albums }: Props) => {
	const navigate = useNavigate();

	return (
		<Row xs={1} md={2} lg={3} className='g-4'>
			{albums.map(album => (
				<Col key={album.id}>
					<Card>
						<Card.Img variant='top' src={album.photos[Math.floor(Math.random() * album.photos.length)].thumbnailUrl} />
						<Card.Body>
							<Card.Title>{album.title}</Card.Title>
							<Card.Text>Autor: {album.user.username}</Card.Text>
							<Button onClick={() => navigate(`/albums/${album.id}`)}>Przejdź do albumu</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default AlbumsGroup;
