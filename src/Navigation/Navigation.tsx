import { useAppSelector } from 'hooks';
import LoginPage from 'LoginPage/LoginPage';
import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

const Navigation: FC = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector(state => state.app);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<LoginPage show={show} handleClose={handleClose} />
			<Navbar bg='dark' data-bs-theme='dark'>
				<Container>
					<Navbar.Brand>Aplikacja</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
							<NavDropdown title='Zdjęcia' id='basic-nav-dropdown'>
								<NavDropdown.Item onClick={() => navigate('/')}>Wszystkie</NavDropdown.Item>
								<NavDropdown.Item onClick={() => navigate('/albums')}>Albumy</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link onClick={() => navigate('/users')}>Użytkownicy</Nav.Link>
							<Nav.Link onClick={() => navigate('/posts')}>Posty</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>
							{user ? (
								<>
									Signed in as:
									<NavDropdown title={user.email} id='basic-nav-dropdown'>
										<NavDropdown.Item onClick={() => navigate('/user/photos')}>Moje zdjęcia</NavDropdown.Item>
										<NavDropdown.Item onClick={() => navigate('/user/posts')}>Moje posty</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<Button onClick={handleShow}>Zaloguj</Button>
							)}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
