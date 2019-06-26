 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient, Video } from 'expo';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Content, Footer, FooterTab, Body, Text, List, Right, Button, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';

import CountDown from 'react-native-countdown-component';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class ExerciseDetails extends Component {
static navigationOptions = {
  title: 'Exercise'
};

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
      mute: true,
      shouldPlay: false,
      timer: 2
    };

  }

  handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }
  
  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }

startTimer = () => {
this.clockCall = setInterval(() => {
   if (this.state.timer === 0) {
     clearInterval(this.clockCall)
     return
   }
   this.decrementClock();
 }, 1000);
}

decrementClock = () => {  
 this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
};

componentWillUnmount() {
 clearInterval(this.clockCall);
}

  render() {



  const {item} = this.state; 

return (

<Container style={styles.background_general}>
<ScrollView>
<Video
    source={{ uri: 'http://prod-video-cms-amp-microsoft-com.akamaized.net/tenant/amp/entityid/AATqLd?blobrefkey=104' }}
    shouldPlay={this.state.shouldPlay}
    resizeMode="contain"
    style={{ width, height: height * 0.50, borderWidth: 1, borderColor: '#FFF'}}
    isMuted={this.state.mute}
  />
  </ScrollView>

        <Footer style={{height: height * 0.25, backgroundColor: '#FFF', borderColor: '#FFF', borderTopWidth: 0, elevation: 0}}>
<Grid>
<Row>

<Col style={styles.col_exercise}>
<Image source={require('../../assets/images/done.png')} resizeMode="contain" style={styles.icon_videoexercise} />
<Text style={styles.titlecol_exercise}>Done</Text>
</Col>

<Col style={styles.col_exercise}>
<View style={{borderWidth: 2, borderColor: '#f39c12', borderRadius: 50, height: 100, width: 100,alignItems: 'center',
justifyContent: 'center'}}>
<Text style={{fontSize: 18, color: '#000'}}>
{ this.state.timer === 0 ? 'Times Up!' : (this.state.timer) }
</Text>
</View>
</Col>

<Col style={styles.col_exercise}>
{this.state.shouldPlay ? (
  <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} activeOpacity={1} onPress={this.handlePlayAndPause}>
 <Image source={require("../../assets/images/pause.png")} resizeMode="contain" style={styles.icon_videoexercise} />
 <Text style={styles.titlecol_exercise}>Pause</Text>
  </TouchableOpacity>
  ) : (
  <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} activeOpacity={1} onPress={this.startTimer}> 
  <Image source={require('../../assets/images/play.png')} resizeMode="contain" style={styles.icon_videoexercise} />
  <Text style={styles.titlecol_exercise}>Play</Text>
  </TouchableOpacity>
  )}

</Col>

</Row>

</Grid>
        </Footer>

</Container>

    );
  }
}

