import { User } from 'appSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Props {
	users: User[];
}

const UsersGroup: React.FC<Props> = ({ users }: Props) => {
	return (
		<Row xs={1} md={2} lg={3} className='g-4'>
			{users.map(user => (
				<Col key={user.id}>
					<Card>
						<Card.Img
							variant='top'
							src='https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg'
						/>
						<Card.Body>
							<Card.Title>{user.name}</Card.Title>
							<Card.Text>Username: {user.username}</Card.Text>
							<Card.Text>Email: {user.email}</Card.Text>
							<Card.Text>
								Adres: {`${user.address.street} ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`}
							</Card.Text>
							<Card.Text>Telefon: {user.phone}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default UsersGroup;
