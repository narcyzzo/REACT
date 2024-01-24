import Navigation from 'Navigation/Navigation';
import { ChildWrapper, Wrapper } from './MainTemplate.styles';

interface Props {
	children: React.ReactElement;
}

const MainTemplate: React.FC<Props> = (props: Props) => (
	<Wrapper>
		<Navigation />
		<ChildWrapper>{props.children}</ChildWrapper>
	</Wrapper>
);

export default MainTemplate;
