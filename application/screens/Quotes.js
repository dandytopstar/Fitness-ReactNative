 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import{ Dimensions, View, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView, Share, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, Card, CardItem, Body, Button, Text, Tab, Tabs} from 'native-base';
import * as firebase from 'firebase';
import BannerAd from '../components/BannerAd';
import QuotesFav from '../components/QuotesFav';
import Strings from '../utils/Strings';
import ConfigApp from '../utils/ConfigApp';
import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile';
const Checked = () => (<ToastModal title="Saved!"/>);

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Quotes extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST5}`,
    });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      page: 0,
      quotes: [],
      refreshing: false,
    };
  }

componentDidMount() {
   return fetch(ConfigApp.URL+'json/data_quotes.php')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       isLoading: false,
       page: 0,
       dataQuotes: responseJson
     }, function() {
       this.addRecords(0);
     });
   })
   .catch((error) => {
   });


}

addRecords = (page) => {
  const newRecords = []
  for(var i = page * 30, il = i + 30; i < il && i < 
    this.state.dataQuotes.length; i++){
    newRecords.push(this.state.dataQuotes[i]);
  }
  this.setState({
    quotes: [...this.state.quotes, ...newRecords]
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

onClickShare(quote_title){
  Share.share({
    message: quote_title,
  })
}

saveQuotes = async (quote_id, quote_title, uid) => {
    try {
        let quote = {
            userId: uid,
            quote_id: quote_id,
            quote_title: quote_title,

        }
        const quotes = await AsyncStorage.getItem('FavQuotes') || '[]';
        let quotesFav = JSON.parse(quotes);
        quotesItems = quotesFav.filter(function(e){ return e.quote_id !== quote_id && e.userId == uid })
        quotesItems.push(quote);
        AsyncStorage.setItem('FavQuotes', JSON.stringify(quotesItems)).then(() => {

          Toast.info(Checked(), 1)

        });
        
    } catch(error) {

    }
};

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    const { params } = this.props.navigation.state;
    var user = firebase.auth().currentUser;



    return (
<Container style={styles.background_general}>


<Tabs tabBarUnderlineStyle={{backgroundColor: '#f39c12'}} tabContainerStyle={{ elevation:0 }}>

<Tab heading={Strings.ST5} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

<ScrollView>
<SafeAreaView>

<View style={{margin: 7}}>

         <FlatList
          data={this.state.quotes}
          onEndReached={this.onScrollHandler}
          onEndThreshold={50}
          renderItem={({item, index}) => 
                <TouchableOpacity activeOpacity={1} style={{flex: 1}}>
                <View style={{margin: 5}}>
                <Card style={{minHeight: 60, alignContent: 'center', justifyContent: 'center', paddingTop: 10, elevation: 0, shadowOpacity: 0}}>
            <CardItem>
              <Body>
                <Text>{item.quote_title}</Text>
              </Body>
            </CardItem>
            <Grid style={{margin: 15, borderTopWidth: 1, borderColor: '#eee', paddingTop: 10}}>
              
              <Col style={{alignContent: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.saveQuotes.bind(this, item.quote_id, item.quote_title, user.uid)} activeOpacity={1}>
              <Text style={{fontSize: 14, color: '#666'}}>
              <Icon name="md-star" style={{fontSize: 14, color: '#f39c12'}}/> {Strings.ST57}</Text>
              </TouchableOpacity>
              </Col>

              <Col style={{alignContent: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.onClickShare.bind(this, item.quote_title)} activeOpacity={1}>
              <Text style={{fontSize: 14, color: '#666'}}>
              <Icon name="md-share" style={{fontSize: 14, color: '#f39c12'}}/> {Strings.ST58}</Text>
              </TouchableOpacity>
              </Col>

            </Grid>
          </Card>
                </View>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}

        />

</View>
 
</SafeAreaView>
</ScrollView>

</Tab>

<Tab heading={Strings.ST56} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>


<ScrollView>
<SafeAreaView>

<QuotesFav/>
 
</SafeAreaView>
</ScrollView>

</Tab>

</Tabs>


<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: 10}}>
<BannerAd/>
</View>
</SafeAreaView>

</Container>
    );
  }

}

