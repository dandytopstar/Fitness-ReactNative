import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, AsyncStorage, TouchableOpacity, Dimensions, View, Image, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Content, Body, Thumbnail,Text, List, Right,Left, Button, ListItem, Tab, Tabs} from 'native-base';
import { LinearGradient } from 'expo';
import ConfigApp from '../utils/ConfigApp';
import TimeAgo from 'react-native-timeago';
import PostFav from '../components/PostFav';
import DietFav from '../components/DietFav';
import WorkoutFav from '../components/WorkoutFav';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Profile extends Component {
static navigationOptions = {
  title: `${Strings.ST6}`,
};


constructor(props) {

    super(props);

    this.state = {
      loading: true
    }

  }


  render () {

  var user = firebase.auth().currentUser;
  var email, displayName, emailVerified, creationTime;

  if (user != null) {
  email = user.email;
  displayName = user.displayName;
  emailVerified = user.emailVerified;
  creationTime = user.metadata.creationTime;

  }

    return (

<Container style={styles.background_general}>
<ImageBackground source={require('../../assets/images/profilebg.jpg')} style={{width: width, height: height * 0.20, alignItems: 'center', justifyContent: 'center',}}>
    <Text style={{color: '#f39c12', fontSize: 22, marginTop: 6}}>{displayName}</Text>
    <Text style={{color: '#FFF', fontSize: 16, marginTop: 6, textTransform: 'uppercase'}}> {Strings.ST65} <TimeAgo time={creationTime} hideAgo={true}/></Text>
</ImageBackground>

<Tabs tabBarUnderlineStyle={{backgroundColor: '#f39c12'}} tabContainerStyle={{ elevation:0 }}>

<Tab heading={Strings.ST1} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

<WorkoutFav />

</Tab>

<Tab heading={Strings.ST4} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
                   
  <PostFav />

</Tab>

<Tab heading={Strings.ST3} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

  <DietFav />

</Tab>

</Tabs>

</Container>

    )
  }

}