 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient, Video } from 'expo';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Content, Footer, FooterTab, Body, Text, List, Right, Button, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class ExerciseDetails extends Component {
static navigationOptions = {
  title: `${Strings.ST96}`,
};

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
      mute: true,
      shouldPlay: false,
    };
  }

  handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_bodypart.php?exercise='+this.props.navigation.state.params.item.exercise_id)
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



  render() {

  const {item} = this.state;  

return (

<Container style={styles.background_general}>
<ScrollView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: 15}}>
<BannerAd/>
</View>
<View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 15, paddingBottom: 0, marginBottom: 15}}>
<Text style={{color: 'rgba(0,0,0,0.3)'}}>{item.exercise_title}</Text>
</View>

<Video
    source={{ uri: item.exercise_video }}
     usePoster="true"
     posterSource={{ uri: ConfigApp.URL+'images/'+item.exercise_image }}
    shouldPlay={this.state.shouldPlay}
    resizeMode="contain"

    style={{ width, height: height * 0.30, borderWidth: 1, borderColor: '#FFF', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}
    isMuted={this.state.mute}
  />

<Grid>
<Row style={{height: 110}}>

<Col style={styles.col_exercise}>
<Image source={require('../../assets/images/sets.png')} resizeMode="contain" style={styles.icon_exercise} />
<Text style={styles.titlecol_exercise}>{Strings.ST97}</Text>
<Text>{item.exercise_sets}</Text>
</Col>

<Col style={styles.col_exercise}> 
<Image source={require('../../assets/images/reps.png')} resizeMode="contain" style={styles.icon_exercise} />
<Text style={styles.titlecol_exercise}>{Strings.ST98}</Text>
<Text>{item.exercise_reps}</Text>
</Col>

<Col style={styles.col_exercise}>
<Image source={require('../../assets/images/chrono.png')} resizeMode="contain" style={styles.icon_exercise} />
<Text style={styles.titlecol_exercise}>{Strings.ST99}</Text>
<Text>{item.exercise_rest}</Text>
</Col>

</Row>

<Row style={{ backgroundColor: '#FFF', borderTopWidth: 0, borderColor: 'rgba(0,0,0,0.2)', marginBottom: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin:20, paddingTop: 16, paddingBottom: 20}}>

<View>
<Text style={{fontWeight: 'bold', marginBottom: 8}}>{Strings.ST100}</Text>
<Text>{item.equipment_title}</Text>
<View style={{padding: 8}} />
<Text style={{fontWeight: 'bold', marginBottom: 8}}>{Strings.ST101}</Text>
<FlatList data={ this.state.dataSource } refreshing="false" renderItem={({item}) => <Text>{item.bodypart_title}</Text> } keyExtractor={(item, index) => index.toString()} />


</View>

</Row>

</Grid>
</ScrollView>
        <Footer style={{height: height * 0.10, backgroundColor: '#FFF', borderColor: '#FFF', borderTopWidth: 0, elevation: 0, shadowOpacity: 0}}>
            <Grid>
<Row>
<Col style={styles.playCol_exercise}>
{this.state.shouldPlay ? (
  <Button rounded block onPress={this.handlePlayAndPause} style={styles.playButton}>
  <Text>{Strings.ST103}</Text>
</Button>
  ) : (
  <Button rounded block onPress={this.handlePlayAndPause} style={styles.playButton}>
  <Text>{Strings.ST102}</Text>
</Button>
  )}

</Col>
</Row>

</Grid>
        </Footer>

</Container>

    );
  }
}

