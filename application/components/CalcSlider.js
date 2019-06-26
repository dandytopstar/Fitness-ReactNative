import React, { Component } from 'react';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{ Slider} from 'react-native';

class CalcSlider extends Component {
  constructor(props) {
      super(props); 
      this.state = {
        value: props.value
      }
  }

  onChange = (value) => {
      //pass state to parent component in app.js
      this.props.onChange(this.state.value); 
      this.setState({ value: value }); 
  }


  static defaultProps = {
      min: 0, 
      max: 245, 
      step: 1
  }

  render() {
    return (
        <Slider 
            value={this.state.value}
            minimumValue={this.props.min}
            maximumValue={this.props.max}
            step={this.props.step} 
            onValueChange={this.onChange.bind(this)}
            minimumTrackTintColor="#f39c12"
            thumbTintColor="#f39c12"


        />
    );
  }
}

export default withNavigation(CalcSlider)