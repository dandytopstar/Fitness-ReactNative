import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{TouchableOpacity, Dimensions, View, Image, ScrollView, Linking} from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Text, List, ListItem, Left, Right, Body } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Settings extends Component {
static navigationOptions = {
  title: `${Strings.ST7}`,
};


constructor(props) {

    super(props);

    this.state = {
      loading: true
    }

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {

    return (

<Container style={styles.background_general}>
<ScrollView>
<Grid>

<Row style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#FFF', height: height * 0.30, padding:30, paddingBottom: 0}}>
<Image
      source={require('../../assets/images/logo_dark.png')}
      style={{flex: 1, width: 130, height: 130}}
      resizeMode='contain'/>
</Row>

</Grid>

<View style={{padding: 45, paddingTop: 30}}>

<List>
            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('AboutUsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST9}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('ContactUsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST75}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0}} onPress={this.navigateToScreen('TermsScreen')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{Strings.ST82}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>
     
          </List>

</View>

<View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 10}}>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://facebook.com')}}><Icon name="facebook-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://youtube.com')}}><Icon name="youtube-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://twitter.com')}}><Icon name="twitter-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://instagram.com')}}><Icon name="instagram-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>

</View>

</ScrollView>

</Container>

    )
  }

}