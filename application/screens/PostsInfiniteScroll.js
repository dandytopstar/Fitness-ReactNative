 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Left, Thumbnail, ListItem} from 'native-base';

import SwiperFlatList from 'react-native-swiper-flatlist';

import ConfigApp from '../utils/ConfigApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Posts extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: 'Posts',
    });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      page: 0,
      posts: []
    };
  }

componentDidMount() {
   return fetch(ConfigApp.URL+'json/data_muscle.php')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       isLoading: false,
       page: 0,
       dataPosts: responseJson
     }, function() {
       // call the function to pull initial 12 records
       this.addRecords(0);
     });
   })
   .catch((error) => {
   });
}

addRecords = (page) => {
  // assuming this.state.dataPosts hold all the records
  const newRecords = []
  for(var i = page * 30, il = i + 30; i < il && i < 
    this.state.dataPosts.length; i++){
    newRecords.push(this.state.dataPosts[i]);
  }
  this.setState({
    posts: [...this.state.posts, ...newRecords]
  });
}

onScrollHandler = () => { 
setTimeout(() => { 
this.setState({ 
page: this.state.page + 1 
}, () => { 
this.addRecords(this.state.page); 
}); 
}, 2000); 
}

  render() {

    console.log(this.state.posts);

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const { params } = this.props.navigation.state;


    return (
<Container style={styles.background_general}>

<ScrollView>


<View style={{margin: 7, marginTop: 5}}>

<Text style={{padding: 7, fontSize: 18, fontWeight: 'bold'}}>Recent Posts</Text>

         <FlatList
          data={this.state.posts}
          onEndReached={this.onScrollHandler}
          onEndThreshold={50}
          renderItem={({item, index}) => 
                <TouchableOpacity onPress={() => this.PostDetails(item)} activeOpacity={1} style={{flex: 1}}>
                <View style={{margin: 5, marginLeft: 4}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.exercise_image}} style={styles.background_posts_2columns}>
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_posts_2columns}>
                            <Text numberOfLines={1} style={styles.date_posts}>{item.level_title}</Text>
                            <Text numberOfLines={1} style={styles.title_posts_categories}>{item.exercise_title}</Text>
                    </LinearGradient>
                </ImageBackground>
                </View>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />

</View>
 

</ScrollView>
</Container>
    );
  }
}

