import 	React, {Component} from 'react';
var styles = require('../../assets/files/Styles');
import {Alert, Image} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import { Container, Body, Footer, Input, Icon, Item, Text, Card, View, Button} from 'native-base';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';

export default class Start extends Component {
static navigationOptions = {
	header: null
};

	login() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		});
		this.props.navigation.dispatch(navigateAction);
	}

	register() {

		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);
		
	}

	render () {

		return (
    
		<BackgroundImage source={require('../../assets/images/bg.jpg')}>
		<Container>
		<Body>
			<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
			<Image source={require('../../assets/images/logo.png')} style={styles.logo_start} resizeMode="contain"/>
			<View style={{height: 30}}/>
			<Button rounded block onPress={this.login.bind(this)} style={styles.button_start}>
			<Text>{Strings.ST26}</Text>
			</Button>
			<Button rounded block onPress={this.register.bind(this)} style={styles.button_start}>
			<Text>{Strings.ST27}</Text>
			</Button>
			</View>

		
		</Body>
		</Container>
		</BackgroundImage>
		);
	}
}