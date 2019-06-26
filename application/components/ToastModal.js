import React, {Component} from 'react';
import{ Image, View, Text} from 'react-native';


class ToastModal extends React.Component {

  render () {

    return (

    <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
    <Image source={require('../../assets/images/checked.png')} style={{width: 30, height: 30, marginTop: 10, marginBottom: 10}} resizeMode="contain"/>
    <Text style={{color: '#FFFFFF'}}>{this.props.title}</Text>
    </View>

    )
  }

}

export default ToastModal;
