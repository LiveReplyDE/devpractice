import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, Button, StyleSheet} from 'react-native';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
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
            onPress={handleLogin}
          />
          <Button
            title="Submit"
            color="grey"
            onPress={handleSubmit}
          />
        </View>
      </View>
    );
  }
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

const handleLogin = () => {
  alert("Login");
};

const handleSubmit = () => {
  alert("Submit");
};

AppRegistry.registerComponent('Login', () => Login);