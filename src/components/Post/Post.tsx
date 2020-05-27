/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Post as IPost } from '../../stores/PostsStore';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			maxWidth: 345,
			marginBottom: 40,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		content: {
			flexGrow: 1,
		}
	}),
);

export const Post: React.FC<IPost> = (props) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar alt={props.author.first_name} aria-label="recipe" src={props.author.avatar_URL} />
				}
				subheader={new Date(props.date).toDateString()}
				title={props.title}
			/>
			<CardMedia
				className={classes.media}
				image={props.featured_image}
				title={props.title}
			/>
			<CardContent className={classes.content}>
				<Typography
					color="textSecondary"
					component="p"
					dangerouslySetInnerHTML={{__html: props.excerpt}}
					variant="body2"
				/>
			</CardContent>
			<CardActions disableSpacing>
				<Button
					color="primary"
					size="small"
					variant="contained"
				>
					<Link color="inherit" href={props.URL}>
						Idź do artykułu
					</Link>
				</Button>
				<Button
					color="secondary"
					size="small"
					variant="contained"
				>
					<Link color="inherit" href={props.author.profile_URL}>
						O autorze
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
};