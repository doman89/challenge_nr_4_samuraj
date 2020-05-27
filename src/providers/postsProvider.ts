import { request } from '../helpers/axios';

interface PostRequest {
	found: number;
	post: unknown;
}

export const fetchPosts = async (): Promise<PostRequest> =>
	(await request.get('/posts/')).data;