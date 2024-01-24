import { configureStore } from '@reduxjs/toolkit';
import appSlice from 'appSlice';

export const store = configureStore({
	reducer: {
		app: appSlice
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
