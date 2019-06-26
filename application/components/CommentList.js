import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import StarRating from 'react-native-star-rating';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import * as firebase from 'firebase';

import avatar from '../../assets/images/avatar.png';

export default class CommentList extends Component {
	render () {
		const {comment} = this.props;
    var user = firebase.auth().currentUser;
    var photoUrl;

  if (user != null) {
  photoUrl = user.photoURL;
  }
		return (

			<ListItem avatar style={{marginBottom: 15, marginLeft: 0}}>
              <Left>
                <Thumbnail source={photoUrl ? {uri: photoUrl} : avatar} />
              </Left>
              <Body>
      <StarRating
          disabled={true}
          maxStars={5}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          rating={comment.rating}
          containerStyle={{width: 80}}
          starSize={15}
          starStyle={{color: '#f39c12'}}
          />

                <Text note numberOfLines={2}>{comment.comment}</Text>
              </Body>
              <Right>
                <Text note>{comment.user}</Text>
              </Right>
            </ListItem>

		)
	}
}