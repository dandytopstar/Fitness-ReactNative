import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import Strings from '../utils/Strings';

export default class CommentEmpty extends Component {
	render () {
		return (
			<View>
				<Text style={{padding: 20, textAlign: 'center', alignItems: 'center'}}>{Strings.ST86}</Text>
			</View>
		)
	}
}