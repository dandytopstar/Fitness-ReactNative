import React, { Component } from 'react'
import{ Dimensions, View,} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Text} from 'native-base';

class CalcResult extends Component {
  // convert cm into ft 
  toFeet = (num) => {
    let realFeet = ((num * 0.393700) / 12); 
    let feet = Math.floor(realFeet); 
    let inches = Math.round((realFeet - feet) * 12); 
    return `${feet}'${inches}`; 
  }
  // convert kg to lbs
  toLbs = (num) => {
    let nearExact = num/0.45359237; 
    let lbs = Math.floor(nearExact); 
    return lbs; 
  }

  render() {
    let height = this.props.data.height; 
    let weight = this.props.data.weight; 
    let bmi = this.props.data.bmi; 
    let bmiClass = this.props.data.bmiClass; 
    // conversions
    let heightFeet = this.toFeet(height); 
    let pounds = this.toLbs(weight); 

    return (
      <View>
        <Text>
          {height}cm
          <Text> {heightFeet}</Text>
        </Text>
        <Text>
          {weight}kg
          <Text> {pounds}lbs</Text>  
        </Text>
        <Text>{bmi}</Text>
        <Text>{bmiClass}</Text>
      </View>
    );
  }
}

export default CalcResult