import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{AsyncStorage, TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Body, Thumbnail, Text, List, Right, Card, CardItem, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class QuotesFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      FavQuotes: []
    }

  }

  componentDidMount () {
    this.fetchQuotes();
  }

  componentDidUpdate () {
    this.fetchQuotes();
  }

onClickShare(quote_title){
  Share.share({
    message: quote_title,
  })
}


  renderFooterQuotes = () => {
  const quotes = this.state.FavQuotes
  if (quotes.length != 0) return null;


  return (
    <ListEmpty/>
   );
};

removeQuote = async (quote_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const quotes = await AsyncStorage.getItem('FavQuotes');
let quotesFav = JSON.parse(quotes);
quotesItems = quotesFav.filter(function(e){ return e.quote_id !== quote_id && e.userId == uid })

await AsyncStorage.setItem('FavQuotes', JSON.stringify(quotesItems));

this.setState({ 
...this.state, 
FavQuotes: quotesItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<ScrollView>
 <View style={{margin: 5, marginTop: 5}}> 
 
<List>


<FlatList
          data={this.state.FavQuotes}
          refreshing="true"
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
              <TouchableOpacity onPress={this.removeQuote.bind(this, item.quote_id)} activeOpacity={1}>
              <Text style={{fontSize: 14, color: '#666'}}>
              <Icon name="md-close" style={{fontSize: 14, color: '#f39c12'}}/> {Strings.ST59}</Text>
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
        ListFooterComponent={this.renderFooterQuotes}


        />

</List>

  </View> 
</ScrollView>
    )
  }


    async fetchQuotes () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let quotesJSON= await AsyncStorage.getItem('FavQuotes');
      let quotesFav = JSON.parse(quotesJSON);
      quotesItems = quotesFav.filter(function(e){
            return e.userId == uid
        })
      const quotesArray = quotesItems || [];
      this.setState({
        ...this.state,
        FavQuotes: quotesArray
      });
  }

}

export default withNavigation(QuotesFav);
