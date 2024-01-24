import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchUsers, login } from 'appSlice';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import Alert from 'react-bootstrap/Alert';

interface Props {
	handleClose: () => void;
	show: boolean;
}

const LoginPage: FC<Props> = ({ show, handleClose }) => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState('');
	const { error, loading, user } = useAppSelector(state => state.app);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			handleClose();
		}
	}, [user, handleClose]);
	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	const handleLogin = () => {
		dispatch(login(value));
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Zaloguj</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{loading ? (
						<SpinnerWithText />
					) : (
						<Form>
							<Form.Group className='mb-3' controlId='email'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='name@example.com'
									value={value}
									onChange={e => handleChange(e)}
								/>
							</Form.Group>
							{error && <Alert variant='danger'>{error}</Alert>}
						</Form>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='success' onClick={() => handleLogin()}>
						Zaloguj
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default LoginPage;
