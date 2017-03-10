import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, Button, StyleSheet} from 'react-native';

import auth from '../../utils/auth';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      token: ''
    }
  }

  render(){
    return(
      <View style={styles.view}>
        <Text
          style={styles.title}
        >Loginbereich</Text>
        <TextInput
          style={styles.inputs}
          placeholder='Enter your username'
          onChangeText={username => this.setState({username})}
        />
        <TextInput
          style={styles.inputs}
          placeholder='Enter your password'
          onChangeText={password => this.setState({password})}
        />
        <View style={styles.buttons}>
          <Button
            title="Login"
            onPress={this._onPressLogin}
          />
          <Button
              title="Submit"
              color="grey"
              onPress={this._onPressSubmit}
          />
        </View>
      </View>
    );
  }

  _onPressLogin = () => {
      if (this.state.username === '' || this.state.password === '') {
          alert("Username or password is empty!")
      } else {
          auth.getToken(this.state.username, this.state.password).then((res) => {
              if (res.success === false) {
                  alert(res.message);
              } else {
                  alert(res.message);
              }
          });
      }
  };

  _onPressSubmit = () => {
    alert("Submit");
  };
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 50
  },
  title: {
    color: 'black',
    fontSize: 25
  },
  inputs: {
    borderColor: 'yellow'
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

AppRegistry.registerComponent('Login', () => Login);
