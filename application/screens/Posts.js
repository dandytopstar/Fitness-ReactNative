import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Left, Thumbnail, ListItem} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ConfigApp from '../utils/ConfigApp';
import BannerAd from '../components/BannerAd';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Posts extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST4}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('TagsScreen')}/>

    });

  constructor(props) {
    super(props);
    this.infiniteScrollRef = null;
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
    var request_1_url = ConfigApp.URL+'json/data_posts.php';
    var request_2_url = ConfigApp.URL+'json/data_tags.php';

    fetch(request_1_url).then((response) => response.json()).then((responseJson)  => {
        this.setState({
            posts: responseJson.filter((e, index) => { return index < 8 && e.post_featured == '1' })
        });
    }).then(()=>{
        fetch(request_1_url).then((response) => response.json()).then((responseJson) => {
         this.setState({
            recentposts: responseJson.filter((e, index) => { return index < 18 }),
            isLoading: false,
         });
     }).done();
    }).done();

     }

  PostDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PostDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

PostsByTag=(tag_id, tag_title)=>
{
      this.props.navigation.navigate('PostsByTagScreen', { IdTag: tag_id, TitleTag: tag_title });    
}

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const { params } = this.props.navigation.state;


    return (
<Container style={styles.background_general}>

<ScrollView>

<SwiperFlatList
          autoplay
          autoplayDelay={5}
          autoplayLoop
          data={ this.state.posts }
          renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.PostDetails(item)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.post_image}} style={styles.background_diets}>
                    
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_diets}>
                            <Text style={styles.category_diets}>{item.tag_title}</Text>
                            <Text style={styles.title_diets}>{item.post_title}</Text>
                            <Text style={styles.subcategory_diets}>{item.post_date}</Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />



<View style={{margin: 7, marginTop: 8}}>

<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: 5}}>
<BannerAd/>
</View>

<Text style={{padding: 7, fontSize: 18, fontWeight: 'bold'}}>{Strings.ST54}</Text>

         <FlatList
          data={ this.state.recentposts }
          numColumns={2}
          renderItem={({item, index}) => 
                <TouchableOpacity onPress={() => this.PostDetails(item)} activeOpacity={1} style={{flex: 1}}>
                <View style={{margin: 5, marginLeft: 4}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.post_image}} style={styles.background_posts_2columns}>
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_posts_2columns}>
                            <Text numberOfLines={1} style={styles.date_posts}>{item.post_date}</Text>
                            <Text numberOfLines={1} style={styles.title_posts_categories}>{item.post_title}</Text>
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

