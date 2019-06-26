import React, {Component} from 'react';
import ConfigApp from '../utils/ConfigApp';
import {AdMobInterstitial} from 'expo';

class InterstitialAd extends React.Component {

  componentDidMount() {

    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

}

export default InterstitialAd;
