import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ForgetPassScreen from "../screens/ForgetPass";

export default StackNavigator(
	{
		Start: {
			screen: StartScreen
		},

		Login: {
			screen: LoginScreen
		},
		Register: {
			screen: RegisterScreen
		},
		ForgetPass: {
			screen: ForgetPassScreen
		},
	},
	{
		initialRouteName: 'Start',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#ffffff',
				borderWidth: 0,
				borderBottomWidth: 0
				},
			headerTintColor: '#f39c12',
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#333333',
				fontWeight: 'bold',
			}
		}

	}
)