import { PostsStore } from './PostsStore';

export interface AppStore {
	rootStore: RootStore;
}

export class RootStore {
	public readonly postsStore: PostsStore;

	public constructor() {
		this.postsStore = new PostsStore();
	}
}