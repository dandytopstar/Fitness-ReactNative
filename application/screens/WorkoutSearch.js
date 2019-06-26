 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ Dimensions, View, TouchableOpacity, Slider, SafeAreaView, ScrollView } from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import {Container,Title,Content,Button,Icon,Picker,Form,Text,ListItem,Left,Right,Body} from "native-base";
import HeaderPicker from '../components/HeaderPicker';
import BannerAd from '../components/BannerAd';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class WorkoutSearch extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST14}`,
    });

  constructor(props) {
    super(props);
    this.state = {
      goalID: 1,
      levelID: 1,
      durationID: 1,
      goals:[],
      levels:[],
      isLoading: true,
    };
  }


  componentDidMount() {
    
    var goals_url = ConfigApp.URL+'json/data_goals.php';
    var levels_url = ConfigApp.URL+'json/data_levels.php';

    fetch(goals_url).then((response) => response.json()).then((responseJson)  => {
        this.setState({
            goals: responseJson,
        });
    }).then(()=>{
        fetch(levels_url).then((response) => response.json()).then((responseJson) => {
         this.setState({
            levels: responseJson,
            isLoading: false,
         });
     }).done();
    }).done();

     }

  onGoalChange(value: string) {
    this.setState({
      goalID: value
    });
  }

  onLevelChange(value: string) {
    this.setState({
      levelID: value
    });
  }

  onDurationChange(value: string) {
    this.setState({
      durationID: value
    });
  }

render() {  

return (

<Container style={styles.background_general}>
<ScrollView>

<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 15}}>

<Text style={{paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight:'bold'}}>
  {Strings.ST15}
</Text>
<View style={{height: 2, backgroundColor: '#f39c12', width: 50, marginBottom: 25,}}/>
<Form>
            
            <Text style={{paddingLeft: 0, paddingBottom: 15,  fontSize: 16, fontWeight: 'bold'}}> {Strings.ST16} </Text>
            <View style={{width: width * .9, borderWidth: 1, borderColor: 'rgba(0,0,0,0.30)', borderRadius: 4, marginBottom: 15}}>
            <Picker
              renderHeader={backAction =>
              <HeaderPicker title="Goals" onPress={backAction} />}
              mode="dropdown"
              placeholder={Strings.ST21}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: width * .9 }}
              selectedValue={this.state.goalID}
              onValueChange={this.onGoalChange.bind(this)}
            >
         {this.state.goals.map( item => (<Picker.Item label={item.goal_title} value={item.goal_id} />))}

            </Picker>

            </View>

            <Text style={{paddingLeft: 0, paddingBottom: 15, fontSize: 16, fontWeight: 'bold'}}> {Strings.ST17} </Text>
            <View style={{width: width * .9, borderWidth: 1, borderColor: 'rgba(0,0,0,0.30)', borderRadius: 4, marginBottom: 15}}>
            <Picker
              renderHeader={backAction =>
              <HeaderPicker title="Levels" onPress={backAction} />}
              mode="dropdown"
              placeholder={Strings.ST22}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: width * .9 }}
              selectedValue={this.state.levelID}
              onValueChange={this.onLevelChange.bind(this)}
            >

          
         {this.state.levels.map( item => ( <Picker.Item label={item.level_title} value={item.level_id} /> ))}
          
            </Picker>
          
          </View>


          <ListItem style={{marginLeft: 0, borderBottomWidth: 0}}>
              <Left>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}> {Strings.ST18} </Text>
              </Left>
              <Right>
                <Text note> {this.state.durationID} {Strings.ST20}</Text>
              </Right>
            </ListItem>


            <Slider
            value={this.state.durationID}
            step={1}
            maximumValue={7}
            thumbTintColor="#f39c12"
            minimumValue={1}
            minimumTrackTintColor="#f39c12"
            onValueChange={this.onDurationChange.bind(this)} />

<View style={{marginBottom: 15}}/>

<Button block style={styles.button_auth} onPress={() => this.props.navigation.navigate('WorkoutResultsScreen', { goalID: this.state.goalID, levelID: this.state.levelID, durationID: this.state.durationID })}>
<Text> {Strings.ST19} </Text>
</Button>
          </Form>
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

