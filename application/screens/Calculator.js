 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ Dimensions, View, Image, TouchableOpacity, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';

import CalcResult from '../components/CalcResult';
import CalcSlider from '../components/CalcSlider';


import ConfigApp from '../utils/ConfigApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Calculator extends Component {
  static navigationOptions = {
    title: 'Calculator',
  };

  constructor(props){
    super(props); 
    this.state = {
      height: 175,
      weight: 73, 
      bmi: 22.49, 
      bmiClass: 'Normal'
    }
  }

  heightChange = (height) => {
    this.setState({ height: height}, this.setBmi ); 
  }

  weightChange = (weight) => {
    this.setState({ weight: weight }, this.setBmi ); 
  }

  setBmi = () => {
    let bmi = ((this.state.weight / this.state.height / this.state.height) * 10000).toFixed(2); 
    this.setState({ bmi: bmi, bmiClass: this.getBmiClass(bmi) }); 
  }

  getBmiClass = (bmi) => {
    if(bmi < 18.5) return 'Underweight'; 
    if(bmi >= 18.5 && bmi <= 24.9) return 'Normal'; 
    if(bmi >= 25 && bmi <= 29.9) return 'Overweight'; 
    if(bmi >= 30) return 'Obese';  
  }

  render() {

    return (

<Container style={styles.background_general}>

<Text>Height</Text>
            <CalcSlider 
              value={this.state.height} 
              onChange={this.heightChange} />

<Text>Weight</Text>


<CalcSlider 
              value={this.state.weight}
              onChange={this.weightChange} />

<CalcResult data={this.state}/>

</Container>
    );
  }
}
