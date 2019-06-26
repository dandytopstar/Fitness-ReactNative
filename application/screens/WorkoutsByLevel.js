 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class WorkoutsByLevel extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.TitleLevel}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('WorkoutSearchScreen')}/>

    });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_wlevel.php?level='+this.props.navigation.state.params.IdLevel)
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

  WorkoutDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'WorkoutDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const { params } = this.props.navigation.state;
    const IdLevel = params ? params.IdLevel : null;

    return (
<Container style={styles.background_general}>
<ScrollView>
        <FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.WorkoutDetails(item)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.workout_image}} style={styles.background_card}>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_card}>
                            <Text style={styles.category_card}>{item.goal_title}</Text>
                            <Text style={styles.title_card}>{item.workout_title}</Text>
                            <Text style={styles.subcategory_card}>{item.level_title}</Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}
        

        />
 </ScrollView>
</Container>
    );
  }
}

