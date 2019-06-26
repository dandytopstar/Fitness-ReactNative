 import React, {Component} from 'react';
import { NavigationActions, DrawerNavigator,  StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Exercises extends Component {
static navigationOptions = {
  title: `${Strings.ST2}`
};

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    return (

<Container style={styles.background_general}>
    <Grid>

<Row onPress={this.navigateToScreen('EBodypartsScreen')} activeOpacity={1}>
<ImageBackground source={require('../../assets/images/bodyparts.jpg')} style={styles.card_general}>
<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>                        
		<Text style={styles.title_general}>{Strings.ST37}</Text>
		<Text style={styles.subtitle_general}>{Strings.ST40}</Text>
</LinearGradient>
</ImageBackground>
</Row>

<Row onPress={this.navigateToScreen('EquipmentsScreen')} activeOpacity={1}>

<ImageBackground source={require('../../assets/images/equipments.jpg')} style={styles.card_general}>
<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>                        
    <Text style={styles.title_general}>{Strings.ST38}</Text>
    <Text style={styles.subtitle_general}>{Strings.ST39}</Text>
</LinearGradient>
</ImageBackground>
</Row>

    </Grid>   
</Container>
            
    );
  }
}
