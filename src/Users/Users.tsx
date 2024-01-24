import MainTemplate from 'MainTemplate/MainTemplate';
import SearchInput from 'SearchInput/SearchInput';
import SpinnerWithText from 'SpinnerWithText/SpinnerWithText';
import UsersGroup from 'UsersGroup/UsersGroup';
import { Wrapper } from './Users.styles';
import { fetchUsers, filterUsers, setLoading } from 'appSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FC, useEffect, useState } from 'react';

const Users: FC = () => {
	const dispatch = useAppDispatch();
	const { users, loading, filteredUsers } = useAppSelector(state => state.app);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		let timeoutId: any;
		if (searchPhrase) {
			timeoutId = setTimeout(() => {
				dispatch(setLoading());
				dispatch(filterUsers(searchPhrase));
			}, 500);
		}
		return () => clearTimeout(timeoutId);
	}, [searchPhrase, dispatch]);

	return (
		<MainTemplate>
			{loading ? (
				<SpinnerWithText />
			) : (
				<Wrapper>
					<SearchInput
						placeholder='Wyszukaj użytkownika...'
						id='searchPhrase'
						value={searchPhrase}
						changeFn={setSearchPhrase}
					/>
					<UsersGroup users={searchPhrase ? filteredUsers : users} />
				</Wrapper>
			)}
		</MainTemplate>
	);
};

export default Users;
