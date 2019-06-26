import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import{AsyncStorage, TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class WorkoutFav extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      workouts: []
    }

  }

  componentDidMount () {
    this.fetchWorkouts();
  }

  WorkoutDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'WorkoutDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderFooterWorkouts = () => {
  const workouts = this.state.workouts
  if (workouts.length != 0) return null;


  return (
    <ListEmpty/>
   );
};

removeWorkout = async (workout_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const workouts = await AsyncStorage.getItem('workouts');
let workoutsFav = JSON.parse(workouts);
workoutsItems = workoutsFav.filter(function(e){ return e.workout_id !== workout_id && e.userId == uid })

await AsyncStorage.setItem('workouts', JSON.stringify(workoutsItems));

this.setState({ 
...this.state, 
workouts: workoutsItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<ScrollView>
 <View style={{margin: 5, marginTop: 5}}> 

<List>


<FlatList
          data={this.state.workouts}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.WorkoutDetails(item)} >
              <Thumbnail square size={80} source={{ uri: ConfigApp.URL+'images/'+item.workout_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 6}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.workout_title}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removeWorkout.bind(this, item.workout_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterWorkouts}


        /> 

</List>

  </View> 
</ScrollView>

    )
  }

    async fetchWorkouts () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let workoutsJSON= await AsyncStorage.getItem('workouts');
      let workoutsFav = JSON.parse(workoutsJSON);
      workoutsItems = workoutsFav.filter(function(e){
            return e.userId == uid
        })
      const workoutsArray = workoutsItems || [];
      this.setState({
        ...this.state,
        workouts: workoutsArray
      });
  }

}

export default withNavigation(WorkoutFav);