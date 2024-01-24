import { FC } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
	placeholder: string;
	id: string;
	value: string;
	changeFn: (value: string) => void;
}

const SearchInput: FC<Props> = ({ placeholder, id, value, changeFn }: Props) => (
	<div>
		<Form.Group className='mb-3' controlId={id}>
			<Form.Control type='text' placeholder={placeholder} value={value} onChange={e => changeFn(e.target.value)} />
		</Form.Group>
	</div>
);

export default SearchInput;
