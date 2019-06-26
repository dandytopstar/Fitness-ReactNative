 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, Image, SafeAreaView, FlatList, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Equipments extends Component {
  static navigationOptions = {
    title: `${Strings.ST38}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_equipments.php')
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

ListExercisesByEquipment=(equipment_id, equipment_title)=>
{
      this.props.navigation.navigate('ExercisesByEquipmentScreen', { IdEquipment: equipment_id, TitleEquipment: equipment_title });    
}

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>

<List>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={this.ListExercisesByEquipment.bind(this, item.equipment_id, item.equipment_title)} >
              <Thumbnail square size={80} source={{ uri: ConfigApp.URL+'images/'+item.equipment_image }} style={{paddingLeft: 10, marginLeft: 15}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 16, marginTop: 3, marginLeft: 20}}>
                {item.equipment_title}
                </Text>
              </Body>
              <Right>
                <Text note>
                <Icon name="arrow-right" style={{fontSize: 16}}/>
                </Text>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}

        /> 
        
</List>
 
</Container>
    );
  }
}
