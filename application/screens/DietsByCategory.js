 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader'; 
import{ ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class DietsByCategory extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.TitleCategory}`,
    });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_diets.php?category='+this.props.navigation.state.params.IdCategory)
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

  DietDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DietDetailsScreen',
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
    const IdCategory = params ? params.IdCategory : null;

    return (
<Container style={styles.background_general}>

<ScrollView>

<View style={{margin: 7, marginTop: 5}}>

<List>

         <FlatList
          data={ this.state.dataSource }
          numColumns={2}
          renderItem={({item, index}) => 
                <TouchableOpacity onPress={() => this.DietDetails(item)} activeOpacity={1} style={{flex: 1}}>
                <View style={{margin: 5, marginLeft: 4}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.diet_image}} style={styles.background_posts_2columns}>
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.gradient_posts_2columns}>
                            <Text numberOfLines={1} style={styles.date_posts}>{item.diet_calories} {Strings.ST45}</Text>
                            <Text numberOfLines={1} style={styles.title_posts_categories}>{item.diet_title}</Text>
                    </LinearGradient>
                </ImageBackground>
                </View>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}
        

        />

</List>

</View>

</ScrollView>
<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>
</SafeAreaView>

</Container>
    );
  }
}

