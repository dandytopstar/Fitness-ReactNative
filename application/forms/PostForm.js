import React, {Component} from 'react';
import {options, Comment} from './Comment';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import {View} from "react-native";
import {Button, Text} from 'native-base';
import * as firebase from 'firebase';

var styles = require('../../assets/files/Styles');

export default class PostForm extends Component {
	constructor() {
		super();
		var user = firebase.auth().currentUser;
		this.state = {
			comment: {
				comment: '',
				rating: 1,
				user: user.displayName,
			}
		};
	}

	addComment () {
		var user = firebase.auth().currentUser;
		const validate = this.refs.form.getValue();
		if(validate) {
			let data = {};
			let comment = Object.assign({}, validate);
			let ref = firebase.database().ref().child('postComments');
			const key = ref.push().key;

			data[`${this.props.postId}/${key}`] = comment;

			ref.update(data).then(() => {
				this.setState((prevState, props) => {
					return {
						comment: {
							comment: '',
							rating: 1,
							user: user.displayName,
						}
					}
				});
			})
		}
	}

	onChange (comment) {
		this.setState({comment});
	}

	render () {
		const {comment} = this.state;
		return (
					<View>
					<Form
						ref="form"
						type={Comment}
						options={options}
						value={comment}
						onChange={(v) => this.onChange(v)}
					/>
				<Button block onPress={this.addComment.bind(this)} style={styles.postCommentButton}>
				<Text style={styles.postCommentText}>Submit</Text>
				</Button>

				</View>


		)
	}
}