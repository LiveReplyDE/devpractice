import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import Login from './app/components/Login/Login';
import HeaderLogo from './app/components/HeaderLogo/HeaderLogo';

export default class LoginTest extends Component{
  render(){
    return(
      <View>
        <HeaderLogo />
        <Login />
      </View>
    );
  }
}

AppRegistry.registerComponent('LoginTest', () => LoginTest);
