/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { observable, runInAction, action } from 'mobx';
import { request } from '../helpers/axios';

export interface Post {
	ID: number;
	site_ID: number;
	author: PostAuthor;
	date: string;
	modified: string;
	title: string;
	URL: string;
	excerpt: string;
	featured_image: string;
}

interface PostAuthor {
	ID: number;
	first_name: string;
	last_name: string;
	URL: string;
	avatar_URL: string;
	profile_URL: string;
}

interface PostRequest {
	found: number;
	posts: Post[];
}

const CHUNK_SIZE = 6;

export class PostsStore {
	private readonly axiosProvider = request;

	@observable
	public postsList: Post[] = [];

	private postsCounter = 0;

	@action
	public loadMorePosts = async (): Promise<void> => {
		try {
			const postsResponse = await this.fetchChunkPosts();
			const posts = postsResponse.posts.map(post => ({
				ID: post.ID,
				site_ID: post.site_ID,
				author: {
					ID: post.author.ID,
					first_name: post.author.first_name,
					last_name: post.author.last_name,
					URL: post.author.URL,
					avatar_URL: post.author.avatar_URL,
					profile_URL: post.author.profile_URL,
				},
				date: post.date,
				modified: post.modified,
				title: post.title,
				URL: post.URL,
				excerpt: post.excerpt,
				featured_image: post.featured_image,
			}));

			runInAction(() => {
				this.postsList = [...this.postsList, ...posts];
				this.postsCounter = this.postsList.length;
			});

		} catch(error) {
			console.warn(error);
			runInAction(() => {
				this.postsList = [...this.postsList];
				this.postsCounter = this.postsList.length;
			});
		}
	};

	private async fetchChunkPosts(): Promise<PostRequest> {
		const offset = this.postsCounter * CHUNK_SIZE;
		const params = {
			offset,
			number: CHUNK_SIZE, 
		};
		const { data } = await this.axiosProvider.get('/posts', { params });

		return data;
	}
}