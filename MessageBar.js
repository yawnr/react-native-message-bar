/**
 * Name: MessageBar
 * Description: A Message Bar Component displayed at the top of screen
 * https://github.com/KBLNY/react-native-message-bar
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height


class MessageBar extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0);
    this.animatedXValue = new Animated.Value(-windowWidth);

    this.state = {
      alertShown: false,
      backgroundColor: '#007bff',
      strokeColor: '#006acd',
      title: null,
      message: null,
      type: 'info',
      duration: 2000,
      callback: null,
    }
  }


  showMessageBarAlert(title, message, avatarUrl, type, duration, callback) {
    // If an alert is already shonw or doesn't have a title or a message, do nothing
    if (this.state.alertShown || (title == null && message == null)) {
      return;
    }

    // Apply the colors of the alert depending on its type
    this.applyAlertStylesheet(type);

    // Set the data of the alert in the state
    this.setState({
      alertShown: true,
      title: title,
      message: message,
      avatarUrl: avatarUrl,
      duration: duration == null ? 2000 : duration,
      callback: callback
    });

    // Display the alert by animating it from the top of the screen
    // Auto-Hide it after a delay set in the state
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 350
    }).start(this.hideMessageBarAlertWithDelay());
  }


  hideMessageBarAlertWithDelay() {
    // Hide the alert after a delay set in the state only if the alert is still visible
    if (!this.state.alertShown) {
      return;
    }

    setTimeout(() => {
      this.hideMessageBarAlert();
    }, this.state.duration);
  }


  hideMessageBarAlert() {
    // Hide the alert
    // The alert is not shown anymore
    this.setState({
      alertShown: false
    });

    // Animate the alert to hide it to the top of the screen
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 350
    }).start();
  }

  applyAlertStylesheet(type) {
    // Set the Background color and the line stroke color of the alert depending on its type
    // Set to blue-info if no type or if the type is not recognized

    let backgroundColor;
    let strokeColor;

    switch (type) {
      case 'success':
        backgroundColor = 'darkgreen'; // Green
        strokeColor = '#b40000'; // Green
        break;
      case 'error':
        backgroundColor = '#FF0000'; // Red
        strokeColor = '#FF0000'; // Red
        break;
      case 'warning':
        backgroundColor = '#ff9c00'; // Orange
        strokeColor = '#f29400'; // Orange
        break;
      case 'info':
        backgroundColor = '#007bff'; // Blue
        strokeColor = '#006acd'; // Blue
        break;
      default:
        // for now blue-info one
        backgroundColor = '#007bff'; // Blue
        strokeColor = '#006acd'; // Blue
        break;
    }

    this.setState({
      backgroundColor: backgroundColor,
      strokeColor: strokeColor
    });
  }


  alertTapped() {
    // Hide the alert
    this.hideMessageBarAlert();

    // Execute the callback passed in parameter
    if (this.state.callback) {
      this.state.callback();
    }
  }

  render() {
    let animation = this.animatedValue.interpolate({
       inputRange: [0, 0.3, 1],
       outputRange: [-90, -10, 0]
     })

    return (
      <Animated.View style={{ transform: [{ translateY: animation }], backgroundColor: this.state.backgroundColor, borderColor: this.state.strokeColor, borderBottomWidth: 1, position: 'absolute', top: 0, left: 0, right: 0, height: 90 }}>
        <TouchableOpacity onPress={()=>{this.alertTapped()}} style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 10 }} >
            { this.renderImage() }
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }} >
              { this.renderTitle() }
              { this.renderMessage() }
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderImage() {
    if (this.state.avatarUrl != null) {
      const avatarStyle = this.props.avatarStyle !== undefined ? this.props.avatarStyle : { height: 40, width: 40, borderRadius: 20, alignSelf: 'center' };

      return (
        <Image source={{ uri: this.state.avatarUrl }} style={avatarStyle} />
      );
    }
  }

  renderTitle() {
    if (this.state.title != null) {
      const titleStyle = this.props.titleStyle !== undefined ? this.props.titleStyle : { color: 'white', fontSize: 18, fontWeight: 'bold' };

      return (
        <Text numberOfLines={1} style={titleStyle}>
          { this.state.title }
        </Text>
      );
    }
  }

  renderMessage() {
    if (this.state.message != null) {
      const messageStyle = this.props.messageStyle !== undefined ? this.props.messageStyle : { color: 'white', fontSize: 16 };

      return (
        <Text numberOfLines={2} style={messageStyle}>
          { this.state.message }
        </Text>
      );
    }
  }

}


module.exports = MessageBar;
