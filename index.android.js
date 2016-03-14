/**
 * Name: MessageBar Test Project
 * Description: A Project to test the Message Bar Component
 * https://github.com/KBLNY/react-native-message-bar
 */
'use strict';

var MessageBarAlert = require('./MessageBar.js');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


class MessageBar extends Component {


  constructor(props) {
    super(props)

    this.state = {
      callbackButton: 'Show Alert with Avatar and Callback (Warning Type)',
    }
  }

  showSimpleAlert(type) {
    // Title or Message is at least Mandatory
    // type is Mandatory too

    this.refs.alert.showMessageBarAlert("This is a simple alert", // Title of the alert
      null, // Message of the alert
      null, // Avatar of the alert
      'success', // you can select one of 'success', 'error', 'warning', 'error'
      null, // The alert is displayed for 10 seconds, instead of 3
      null // This function is executed on alert tap
    );
  }

  showSimpleAlertWithMessage() {
    // Title or Message is at least Mandatory
    // type is Mandatory too

    this.refs.alert.showMessageBarAlert(null, // Title of the alert
      "This is a simple alert with a message instead of title", // Message of the alert
      null, // Avatar of the alert
      'info', // you can select one of 'success', 'error', 'warning', 'error'
      null, // The alert is displayed for 10 seconds, instead of 3
      null // This function is executed on alert tap
    );
  }

  showAlertWithAvatar() {
    this.refs.alert.showMessageBarAlert("This is an alert with an avatar", // Title of the alert
      "You can customise the title, message text and avatar", // Message of the alert
      "http://www.icon100.com/up/4250/128/83-circle-error.png", // Avatar of the alert
      'error', // you can select one of 'success', 'error', 'warning', 'error'
      null, // The alert is displayed for 10 seconds, instead of 3
      null // This function is executed on alert tap
    );
  }

  showAlertWithCallback() {
    this.refs.alert.showMessageBarAlert("This is an alert with a callback function", // Title of the alert
      "Tap on the alert to execute the callback you passed in parameter", // Message of the alert
      "http://www.icon100.com/up/4250/128/83-circle-error.png", // Avatar of the alert
      'warning', // you can select one of 'success', 'error', 'warning', 'error'
      10000, // The alert is displayed for 10 seconds, instead of 3
      ()=>{this.customCallback()} // This function is executed on alert tap
    );
  }

  customCallback() {
    this.setState({
      callbackButton: 'Callback executed!'
    });
  }

  hideCurrentAlert() {
    // Hide the current alert bar
    this.refs.alert.hideMessageBarAlert();
  }


  render() {
    return (
      <View style={styles.container}>

        <MessageBarAlert ref="alert"
          titleStyle={{color: 'black', fontSize: 18, fontWeight: 'bold'}}
          messageStyle={{ color: 'white', fontSize: 16 }}
          avatarStyle={{height: 40, width: 40, borderRadius: 20, alignSelf: 'center'}} />

        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.showSimpleAlert()}}>
          <Text style={styles.button}>Show Simple Alert (Success Type)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.showSimpleAlertWithMessage()}}>
          <Text style={styles.button}>Show Simple Alert with Message (Info Type)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.showAlertWithAvatar()}}>
          <Text style={styles.button}>Show Alert with Avatar (Error Type)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.showAlertWithCallback()}}>
          <Text style={styles.button}> {this.state.callbackButton} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.hideCurrentAlert()}}>
          <Text style={styles.button}>Hide Current Alert</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    alignSelf:'stretch',
  },
  button: {
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    margin: 10,
  }
});

AppRegistry.registerComponent('MessageBar', () => MessageBar);
