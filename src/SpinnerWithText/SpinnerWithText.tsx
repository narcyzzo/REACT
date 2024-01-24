import { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Wrapper } from './SpinnerWithText.styles';

const SpinnerWithText: FC = () => (
	<Wrapper>
		<Spinner animation='border' role='status' />
		<span>Proszę czekać</span>
	</Wrapper>
);

export default SpinnerWithText;
