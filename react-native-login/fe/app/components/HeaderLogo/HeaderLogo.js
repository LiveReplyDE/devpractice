import React, {Component} from 'react';
import {AppRegistry, Text, View, Image} from 'react-native';

export default class HeaderLogo extends Component{
  render(){
    return(
      <View>
        <Image
          source={require('../../../images/LiveReply.png')}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('HeaderLogo', () => HeaderLogo);