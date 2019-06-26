import React, {Component} from 'react';
import AppPreLoader from "../components/AppPreLoader";
import {StyleSheet, FlatList, View} from 'react-native';
import * as firebase from 'firebase';
import CommentEmpty from "./CommentEmpty";
import CommentList from "../components/CommentList";

export default class PostComments extends Component {
	constructor () {
		super();
		this.state = {
			comments: [],
			loaded: false
		};
	}

	componentDidMount () {
		firebase.database().ref(`postComments/${this.props.postId}`).on('value', snapshot => {
			let comments = [];
			snapshot.forEach(row => {
				comments.push({
					id: row.key,
					rating: row.val().rating,
					comment: row.val().comment,
					user: row.val().user,

				});
			});
			this.setState({
				comments,
				loaded: true
			});
		})
	}

	render () {
		const {comments, loaded} = this.state;

		if( ! loaded) {
			return(<AppPreLoader/>);
		}

		if( ! comments.length) {
			return <CommentEmpty/>
		}

		return (
			<View style={{marginTop: 25, marginBottom: 25}}>
				<FlatList
						data={comments}
						renderItem={(data) => this.renderComment(data.item)}
						keyExtractor={(data) => data.id}
					/>
			</View>
		);
	}

	renderComment(comment) {
		return (
			<CommentList comment={comment} />
		)
	}
}