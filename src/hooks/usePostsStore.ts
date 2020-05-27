import React from 'react';
import { PostsStore } from '../stores/PostsStore';
import { StoreContext } from '../stores/StoreProvider';

export function usePostsStore(): PostsStore {
	const rootStore = React.useContext(StoreContext);

	if (!rootStore) {
		throw new Error('Brak root store!');
	}

	return rootStore.postsStore;
}