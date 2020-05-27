import React from 'react';
import { RootStore } from './RootStore';

export const StoreContext = React.createContext<RootStore | null>(null);

StoreContext.displayName = 'RootStore';

export const StoreProvider: React.FC = ({ children }) => (
	<StoreContext.Provider value={new RootStore()}>
		{children}
	</StoreContext.Provider>
);