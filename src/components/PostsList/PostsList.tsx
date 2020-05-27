import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { observer } from 'mobx-react-lite';
import { Post } from '../Post/Post';
import { usePostsStore } from '../../hooks/usePostsStore';
import { default as PostsListStyles } from './PostsList.module.scss';

const style = bemCssModules(PostsListStyles);

const PostsList: React.FC = () => {
	const {
		loadMorePosts,
		postsList,
	} = usePostsStore();

	return (
		<section className={style()}>
			{postsList.map(post => <Post key={post.ID} {...post} />)}
			<button
				className={style('load-more')}
				onClick={loadMorePosts}
				type="button"
			>
				Załaduj więcej artykułów
			</button>
		</section>
	);
};

const PostsListConsumer = observer(PostsList);

export { PostsListConsumer as PostsList };
