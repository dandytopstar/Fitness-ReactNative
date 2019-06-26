import React, {Component} from 'react';
import{ Image, View, Text} from 'react-native';
import Strings from '../utils/Strings';

class RestDay extends React.Component {

  render () {

    return (

<View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80}}>
      <Image source={require('../../assets/images/restday.png')} style={{width: 150, height: 150, marginBottom: 10}} />
      <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: 8}}>{Strings.ST71}</Text>
      <Text style={{fontSize: 18, marginBottom: 8, color: '#b5b5b5'}}>{Strings.ST72}</Text>

</View>

    )
  }

}

export default RestDay;
