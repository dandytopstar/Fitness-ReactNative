 import React, {Component} from 'react';
import { NavigationActions, DrawerNavigator,  StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Workouts extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST1}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('WorkoutSearchScreen')}/>

    });

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

<Row onPress={this.navigateToScreen('WGoalsScreen')} activeOpacity={1}>
<ImageBackground source={require('../../assets/images/goals.jpg')} style={styles.card_general}>
<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>                        
		<Text style={styles.title_general}>{Strings.ST10}</Text>
		<Text style={styles.subtitle_general}>{Strings.ST12}</Text>
</LinearGradient>
</ImageBackground>
</Row>

<Row onPress={this.navigateToScreen('WLevelsScreen')} activeOpacity={1}>

<ImageBackground source={require('../../assets/images/levels.jpg')} style={styles.card_general}>
<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>                        
    <Text style={styles.title_general}>{Strings.ST11}</Text>
    <Text style={styles.subtitle_general}>{Strings.ST13}</Text>
</LinearGradient>
</ImageBackground>
</Row>

    </Grid>   
</Container>
            
    );
  }
}
