import React, {Component} from 'react';
import ConfigApp from '../utils/ConfigApp';
import { AdMobBanner } from 'expo';

class RectangleAd extends React.Component {

  render () {

    return (

<AdMobBanner
  bannerSize="mediumRectangle"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={this.bannerError} />

    )
  }

}

export default RectangleAd;
