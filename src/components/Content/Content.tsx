import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { default as bemCssModules } from 'bem-css-modules';
import { PostsList } from '../PostsList/PostsList';
import { default as ContentStyles } from './Content.module.scss';
import { usePostsStore } from '../../hooks/usePostsStore';

const style = bemCssModules(ContentStyles);

export const Content: React.FC = () => {
	const { loadMorePosts } = usePostsStore();

	useEffect(
		() => {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			loadMorePosts();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return (
		<section className={style()}>
			<Switch>
				<Route component={PostsList} path="/" />
			</Switch>
		</section>
	);
};
