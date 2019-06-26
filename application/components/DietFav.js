import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{AsyncStorage, TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class DietFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      diets: []
    }

  }

  componentDidMount () {
    this.fetchDiets();
  }

  DietDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DietDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderFooterDiets = () => {
  const diets = this.state.diets
  if (diets.length != 0) return null;


  return (
    <ListEmpty/>
   );
};

removeDiet = async (diet_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const diets = await AsyncStorage.getItem('diets');
let dietsFav = JSON.parse(diets);
dietsItems = dietsFav.filter(function(e){ return e.diet_id !== diet_id && e.userId == uid })

await AsyncStorage.setItem('diets', JSON.stringify(dietsItems));

this.setState({ 
...this.state, 
diets: dietsItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<ScrollView>
 <View style={{margin: 5, marginTop: 5}}> 
 
<List>


<FlatList
          data={this.state.diets}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.DietDetails(item)} >
              <Thumbnail square size={80} source={{ uri: ConfigApp.URL+'images/'+item.diet_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 6}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.diet_title}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removeDiet.bind(this, item.diet_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterDiets}


        /> 

</List>

  </View> 
</ScrollView>
    )
  }

    async fetchDiets () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let dietsJSON= await AsyncStorage.getItem('diets');
      let dietsFav = JSON.parse(dietsJSON);
      dietsItems = dietsFav.filter(function(e){
            return e.userId == uid
        })
      const dietsArray = dietsItems || [];
      this.setState({
        ...this.state,
        diets: dietsArray
      });
  }

}

export default withNavigation(DietFav);
