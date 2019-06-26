 import React, {Component} from 'react';
import { NavigationActions, StackNavigator, withNavigation } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, AsyncStorage, ScrollView, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Content, Body, Text, List, Right, ListItem, Tab, Tabs} from 'native-base';
import * as firebase from 'firebase';
import ConfigApp from '../utils/ConfigApp';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-render-html';
import Strings from '../utils/Strings';
import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile';
const Checked = () => (<ToastModal title={Strings.ST53}/>);

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class DietDetails extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.diet_title}`,
    });

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item
    };
  }

saveDiets = async (diet_id, diet_title, diet_image, diet_servings, diet_time, diet_calories, diet_protein, diet_fat, diet_carbs, diet_ingredients, diet_directions, diet_description, uid) => {
    try {
        let diet = {
            userId: uid,
            diet_id: diet_id,
            diet_title: diet_title,
            diet_image: diet_image,
            diet_servings: diet_servings,
            diet_time: diet_time,
            diet_calories: diet_calories,
            diet_protein: diet_protein,
            diet_fat: diet_fat,
            diet_carbs: diet_carbs,
            diet_ingredients: diet_ingredients,
            diet_directions: diet_directions,
            diet_description: diet_description

        }
        const diets = await AsyncStorage.getItem('diets') || '[]';
        let dietsFav = JSON.parse(diets);
        dietsItems = dietsFav.filter(function(e){ return e.diet_id !== diet_id && e.userId == uid })
        dietsItems.push(diet);
        AsyncStorage.setItem('diets', JSON.stringify(dietsItems)).then(() => {

            Toast.info(Strings.ST53, 1)
            

        });
        
    } catch(error) {

    }
};

  render() {

    var user = firebase.auth().currentUser;
    const {item} = this.state;  

    return (
<Container style={styles.background_general}>
<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.diet_image}} style={styles.background_diets_col}>

<TouchableOpacity activeOpacity={1} style={styles.touchBookmarkTran} onPress={this.saveDiets.bind(this, item.diet_id, item.diet_title, item.diet_image, item.diet_servings, item.diet_time, item.diet_calories, item.diet_protein, item.diet_fat, item.diet_carbs, item.diet_ingredients, item.diet_directions, item.diet_description, user.uid)}>
<Ionicons name="md-star" size={25} color="white"/>
</TouchableOpacity>

<Grid style={{position: 'absolute', bottom: 0, zIndex: 2}}>

<Col style={styles.info_diets}>
<Text style={{color: '#FFF'}}> {Strings.ST43} {item.diet_servings}</Text>
</Col>

<Col style={styles.info_diets}>
<Text style={{color: '#FFF'}}> {Strings.ST44} {item.diet_time}</Text>
</Col>

</Grid>
</ImageBackground>

<Tabs tabBarUnderlineStyle={{backgroundColor: '#f39c12'}} tabContainerStyle={{ elevation:0 }}>

<Tab heading={Strings.ST46} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
            
 <ScrollView> 
 <View style={{margin: 15, marginTop: 5}}>

<Grid>

<Row style={{height: 75, backgroundColor: '#fff'}}>
<Col style={styles.col_diets}>
<Text>{item.diet_calories}</Text>
<Text style={styles.titlecol_diets}>{Strings.ST49}</Text>
</Col>

<Col style={styles.col_diets}>
<Text>{item.diet_protein}</Text>
<Text style={styles.titlecol_diets}>{Strings.ST50}</Text>
</Col>

<Col style={styles.col_diets}>
<Text>{item.diet_fat}</Text>
<Text style={styles.titlecol_diets}>{Strings.ST51}</Text>
</Col>

<Col style={styles.col_diets}>
<Text>{item.diet_carbs}</Text>
<Text style={styles.titlecol_diets}>{Strings.ST52}</Text>
</Col>

</Row>

<Text style={styles.title_diets_detail}>{item.diet_title}</Text>
<HTML html={item.diet_description} />

</Grid>
</View>


</ScrollView>
          </Tab>
          <Tab heading={Strings.ST47} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
            <ScrollView>
            
            <View style={{margin: 15, marginTop: 20}}>           
            <HTML html={item.diet_ingredients} />
            </View>
            </ScrollView>

          </Tab>


          <Tab heading={Strings.ST48} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
            <ScrollView>
            
            <View style={{marginTop: 20, marginRight: 15}}>           
            <HTML html={item.diet_directions} />
            </View>
            </ScrollView>
            
          </Tab>


</Tabs>

<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>

</SafeAreaView>

</Container>
    );
  }
}

