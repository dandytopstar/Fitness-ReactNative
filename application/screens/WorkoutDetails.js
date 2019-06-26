 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, AsyncStorage, Image, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Content, Body, Text, List, Right, Button, ListItem} from 'native-base';
import * as firebase from 'firebase'; 
import Strings from '../utils/Strings';
import ConfigApp from '../utils/ConfigApp';
import BannerAd from '../components/BannerAd';
import { AdMobInterstitial } from 'expo';

import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile';
const Checked = () => (<ToastModal title="Saved!"/>);

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');


export default class WorkoutDetails extends Component {
static navigationOptions = {
  title: `${Strings.ST94}`,
};

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item
    };
  }

  componentDidMount() {

      this._loadInitialState().done();

     }

  _loadInitialState = async () => {
    
    AdMobInterstitial.setAdUnitID(ConfigApp.INTERSTITIAL_ID);
    AdMobInterstitial.setTestDeviceID(ConfigApp.TESTDEVICE_ID);
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

saveWorkouts = async (workout_id, workout_title, workout_image, workout_duration, goal_title, level_title, uid) => {
    try {
        let workout = {
            userId: uid,
            workout_id: workout_id,
            workout_title: workout_title,
            workout_image: workout_image,
            workout_duration: workout_duration,
            goal_title: goal_title,
            level_title: level_title

        }
        const workouts = await AsyncStorage.getItem('workouts') || '[]';
        let workoutsFav = JSON.parse(workouts);
        workoutsItems = workoutsFav.filter(function(e){ return e.workout_id !== workout_id && e.userId == uid })
        workoutsItems.push(workout);
        AsyncStorage.setItem('workouts', JSON.stringify(workoutsItems)).then(() => {

          Toast.info(Strings.ST53, 1)

        });
        
    } catch(error) {

    }
};

ListDay1=(workout_id)=>
{
      this.props.navigation.navigate('Day1Screen', { WorkoutId: workout_id });   
};

ListDay2=(workout_id)=>
{
      this.props.navigation.navigate('Day2Screen', { WorkoutId: workout_id });   
};

ListDay3=(workout_id)=>
{
      this.props.navigation.navigate('Day3Screen', { WorkoutId: workout_id });   
};

ListDay4=(workout_id)=>
{
      this.props.navigation.navigate('Day4Screen', { WorkoutId: workout_id });   
};


ListDay5=(workout_id)=>
{
      this.props.navigation.navigate('Day5Screen', { WorkoutId: workout_id });   
};


ListDay6=(workout_id)=>
{
      this.props.navigation.navigate('Day6Screen', { WorkoutId: workout_id });   
};


ListDay7=(workout_id)=>
{
      this.props.navigation.navigate('Day7Screen', { WorkoutId: workout_id });   
};


  render() {

var user = firebase.auth().currentUser;
const {item} = this.state;  

    return (
<Container style={styles.background_general}>

<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.workout_image}} style={styles.background_workout}>
<LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)',]} style={styles.gradient_workout}>
<TouchableOpacity activeOpacity={1} style={styles.touchBookmarkTran} onPress={this.saveWorkouts.bind(this, item.workout_id, item.workout_title, item.workout_image, item.workout_duration, item.goal_title, item.level_title, user.uid)}>
<Image source={require('../../assets/images/bookmarked.png')} style={{width: 25, height: 25}}/>
</TouchableOpacity>
    <Text style={styles.title_workout}>{item.workout_title}</Text>
    <Text style={styles.category_workout}>{item.workout_duration} {Strings.ST95}</Text>
</LinearGradient>
</ImageBackground>

<Grid>

<Row style={{height: 70, backgroundColor: '#fafafa'}}>
<Col style={styles.col_workout}>
<Text style={styles.titlecol_workout}>{Strings.ST16}</Text>
<Text>{item.goal_title}</Text>
</Col>

<Col style={styles.col_workout}>
<Text style={styles.titlecol_workout}>{Strings.ST17}</Text>
<Text>{item.level_title}</Text>
</Col>
</Row>

<Row>
<ScrollView>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay1.bind(this, item.workout_id)} activeOpacity={1}>
            <Text style={styles.textButton_workout}>{Strings.ST87}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay2.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST88}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay3.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST89}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay4.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST90}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay5.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST91}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay6.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST92}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_workout} onPress={this.ListDay7.bind(this, item.workout_id)}>
            <Text style={styles.textButton_workout}>{Strings.ST93}</Text>
            <Ionicons name='md-arrow-dropright' style={styles.icon_workout} />
          </TouchableOpacity>

</ScrollView>
</Row>

</Grid>


<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>
</SafeAreaView>

</Container>
    );
  }
}

