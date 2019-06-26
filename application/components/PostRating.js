import React, {Component} from 'react';
import * as firebase from 'firebase';
import {View} from "react-native";
import StarRating from 'react-native-star-rating';


const starImage = require('../../assets/images/star.png')

export default class PostRating extends Component {
	constructor (props) {
		super(props);
		this.state = {
			rating: 0
		};
		const {postId} = props;
		this.commentsRef = firebase.database().ref(`postComments/${postId}`);
	}

	componentDidMount () {
		this.commentsRef.on("child_added", snapshot => {
			this.commentsRef.on("value", snap => {
				let comments = [];
				snap.forEach(row => {
					comments.push(parseInt(row.val().rating));
				});

				this.setState({
					rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
				});

				/*this.refs.rating.setCurrentRating(
					comments.reduce((previous, current) => previous + current, 0) / comments.length
				);*/
			})
		});
	}

	render () {
		const {rating} = this.state;
		return (
<View>
      <StarRating
		ref="rating"
          disabled={true}
          maxStars={5}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          rating={rating}
          containerStyle={{width: 100}}
          starSize={20}
          starStyle={{color: '#f39c12'}}
          />
</View>
		)
	}
}