 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, Image, SafeAreaView, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class EBodyparts extends Component {
  static navigationOptions = {
    title: `${Strings.ST37}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_bodyparts.php')
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

ListExercisesByMuscle=(bodypart_id, bodypart_title)=>
{
      this.props.navigation.navigate('ExercisesByMuscleScreen', { IdMuscle: bodypart_id, TitleBodypart: bodypart_title });    
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
          numColumns={2}
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.ListExercisesByMuscle.bind(this, item.bodypart_id, item.bodypart_title)} activeOpacity={1} style={{flex: 1}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.bodypart_image}} style={styles.background_2columns}>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={styles.gradient_2columns}>
                    <View style={styles.title_categories_border}></View>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={styles.title_2columns_background}>
                            <Text numberOfLines={1} style={styles.title_categories}>{item.bodypart_title}</Text>
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
