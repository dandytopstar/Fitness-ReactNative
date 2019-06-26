 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, Image, SafeAreaView, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class WGoals extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST10}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('WorkoutSearchScreen')}/>
    
 });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_goals.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

ListWorkoutsByGoal=(goal_id, goal_title)=>
{
      this.props.navigation.navigate('WorkoutsByGoalScreen', { IdGoal: goal_id, TitleGoal: goal_title });    
}

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>

        <FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.ListWorkoutsByGoal.bind(this, item.goal_id, item.goal_title)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.goal_image}} style={styles.background_categories}>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={styles.gradient_categories}>
                    <View style={styles.title_categories_border}></View>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={styles.title_categories_background}>
                            <Text style={styles.title_categories}>{item.goal_title}</Text>
                    </LinearGradient>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />
 
</Container>
    );
  }
}
