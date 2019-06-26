 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import BannerAd from '../components/BannerAd';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Diets extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST3}`,
    headerRight: <Icon name="md-search" style={{marginRight: 20}} size={27} color="white" onPress={() => navigation.navigate('CategoriesScreen')}/>
    });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
    var request_1_url = ConfigApp.URL+'json/data_diets.php';
    var request_2_url = ConfigApp.URL+'json/data_categories.php';

    fetch(request_1_url).then((response) => response.json()).then((responseJson)  => {
        this.setState({
            diets: responseJson.filter(x => x.diet_featured == '1')
        });
    }).then(()=>{
        fetch(request_2_url).then((response) => response.json()).then((responseJson) => {
         this.setState({
            categories: responseJson,
            isLoading: false,
         });
     }).done();
    }).done();

     }

  DietDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DietDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

DietsByCategory=(category_id, category_title)=>
{
      this.props.navigation.navigate('DietsByCategoryScreen', { IdCategory: category_id, TitleCategory: category_title });    
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
          data={ this.state.diets }
          renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.DietDetails(item)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.diet_image}} style={styles.background_diets}>
                    
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_diets}>
                            <Text style={styles.category_diets}>{item.category_title}</Text>
                            <Text style={styles.title_diets}>{item.diet_title}</Text>
                            <Text style={styles.subcategory_diets}>{Strings.ST43} {item.diet_servings} | {Strings.ST44} {item.diet_time}</Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />

<View style={{margin: 7, marginTop: 5}}>

<Text style={{padding: 8, fontSize: 18, fontWeight: 'bold'}}>{Strings.ST41}</Text>


        <SwiperFlatList
          data={ this.state.categories }
          renderItem={({item}) => 
                <TouchableOpacity onPress={this.DietsByCategory.bind(this, item.category_id, item.category_title)} activeOpacity={1} style={{flex: 1}}>
                <View style={{margin: 5, marginLeft: 4}}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.category_image}} style={styles.background_diets_2columns}>
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_diets_2columns}>
                            <Text numberOfLines={1} style={styles.title_diets_categories}>{item.category_title}</Text>
                    </LinearGradient>
                </ImageBackground>
                </View>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />

</View>

<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: 5, marginBottom: 4}}>
<BannerAd/>
</View>
 
<Text style={{padding: 8, fontSize: 18, fontWeight: 'bold'}}>{Strings.ST42}</Text>

<List>

<FlatList
          data={ this.state.diets }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.DietDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.diet_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, marginBottom: 3}}>
                {item.diet_title}
                </Text>
                <Text note>
                <Icon name="ios-flame"/> {item.diet_calories} {Strings.ST45}
                </Text>
              </Body>
              <Right>
                <Text note>
                <Icon name="ios-arrow-forward" style={{fontSize: 16}}/>
                </Text>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}

        /> 

</List>

</ScrollView>
</Container>
    );
  }
}

