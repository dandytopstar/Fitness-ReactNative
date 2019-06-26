import React, { PureComponent } from 'react'; 
import { View, NetInfo, Dimensions, Image } from 'react-native'; 
import { Text, Button } from 'native-base';
import Strings from '../utils/Strings';
const { width, height } = Dimensions.get('window'); 
var styles = require('../../assets/files/Styles');

function MiniOfflineSign() {
  return (
    <View style={{height: height, width: width, flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 9, backgroundColor: '#FFF' }}>
      <Image source={require('../../assets/images/nointernet.png')} style={{width: 120, height: 120, marginBottom: 10}} />
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>{Strings.ST68}</Text>
      <Text style={{fontSize: 16, marginBottom: 30, color: '#b5b5b5'}}>{Strings.ST69}</Text>
      <View>
      <Button rounded block style={styles.button_auth}>
      <Text>{Strings.ST70}</Text>
      </Button>
      </View>
</View>
  );
}

class OfflineBar extends PureComponent { 

state = {
    isConnected: true
  };

componentDidMount() { 
NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange); 
} 

componentWillUnmount() { 
NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange); 
} 

 handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  }; 

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

export default OfflineBar;
