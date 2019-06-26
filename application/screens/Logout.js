import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class Logout extends Component {
	componentDidMount () {
		firebase.auth().signOut()
			.then(() => {
				
			})
			.catch(error => {
				
			})
	}

	render () {
		return null;
	}
}