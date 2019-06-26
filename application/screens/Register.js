import React, {Component} from 'react';
var styles = require('../../assets/files/Styles');
import {Alert, Dimensions, Image} from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Strings from '../utils/Strings';


import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../forms/Validation';

import * as firebase from 'firebase';

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var width = Dimensions.get('window').width;

stylesheet.textbox.normal.color = '#808080';
stylesheet.textbox.normal.borderRadius = 50;
stylesheet.textbox.normal.borderColor = '#d1d5da';
stylesheet.textbox.normal.paddingLeft = 20;
stylesheet.textbox.normal.paddingRight = 20;
stylesheet.textbox.normal.height = 53;
stylesheet.textbox.normal.minWidth = 300;
stylesheet.textbox.normal.resizeMode = 'contain';

stylesheet.textbox.error.borderRadius = 50;
stylesheet.textbox.error.paddingLeft = 20;
stylesheet.textbox.error.paddingRight = 20;
stylesheet.textbox.error.height = 53;
stylesheet.textbox.error.minWidth = 300;
stylesheet.textbox.error.resizeMode = 'contain';
stylesheet.textbox.error.borderColor = '#d1d5da';

export default class Register extends Component {
static navigationOptions = {
	header: null
};
	constructor () {
		super();

		this.state = {
			user: {}
		};

		this.samePassword = t.refinement(t.String, (s) => {
			return s === this.state.user.password
		});

		this.user = t.struct({
			name: t.String,
			email: FormValidation.email,
			password: FormValidation.password,
			confirm_password: this.samePassword
		});

		this.options = {
			auto: 'placeholders',
			fields: {
				name: {
					placeholderTextColor: '#d1d5da',
          			stylesheet: stylesheet
				},
				email: {
					autoCapitalize: 'none',
					placeholderTextColor: '#d1d5da',
          			stylesheet: stylesheet
				},
				password: {
					password: true,
					secureTextEntry: true,
					placeholderTextColor: '#d1d5da',
          			stylesheet: stylesheet
				},
				confirm_password: {
					password: true,
					secureTextEntry: true,
					placeholderTextColor: '#d1d5da',
          			stylesheet: stylesheet
				}
			}
		};

		this.validate = null;
	}


	register () {

		const validate = this.refs.form.getValue();
		if(this.validate) {
		    const errorHandler = ((e)=>{
            console.log(e);
            if(e.code == 'auth/email-already-in-use'){
				Toast.show({ text: `${Strings.ST36}`, position: 'bottom', buttonText: `${Strings.ST33}` })
               
            } else {
				Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
            }

        })
        firebase.auth().createUserWithEmailAndPassword(validate.email,validate.password).then((response) => {
            firebase.auth().currentUser.updateProfile({
                displayName : validate.name,
            }).then(()=>{
            }).catch(errorHandler);

        }).catch(errorHandler)
	}}

	/*

	register () {

		if(this.validate) {
		firebase.auth().createUserWithEmailAndPassword(this.validate.email, this.validate.password).then((response) => {

            firebase.auth().currentUser.updateProfile({
                displayName : this.validate.name,
            }).then(()=>{

            }).catch();

        }).catch()
    }
	}

	*/

	onChange (user) {
		this.setState({user});
		if (user.confirm_password !== null && user.confirm_password !== "") {
		this.validate = this.refs.form.getValue();
		}
	}

	render () {
		return (
			<Container style={{backgroundColor: '#fff'}}>
			<Header style={{backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0,}}>
			<Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='arrow-left' style={{fontSize: 18}} onPress={() => this.props.navigation.goBack()} />
            </Button>
          </Left>
          <Body style={{ flex: 4,  justifyContent: 'center', alignItems: 'center'  }}>
            <Title style={{color: '#000000'}}>{Strings.ST27}</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
		<Body>
		<KeyboardAwareScrollView>

		<View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20}}>
			<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain"/>
						<Form
							ref="form"
							type={this.user}
							options={this.options}
							onChange={(v) => this.onChange(v)}
							value={this.state.user}
						/>
										<Button rounded block onPress={this.register.bind(this)} style={styles.button_auth}>
				<Text>{Strings.ST28}</Text>
				</Button>
					</View>
		</KeyboardAwareScrollView>

			</Body>
		</Container>
		)
	}
}