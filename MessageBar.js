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
    this.notifyAlertHiddenCallback = null;

    this.state = this.setStateByProps(props);
  }

  componentWillReceiveProps(nextProps) {
    // Set the new state, this is triggered when the props of this MessageBar changed
    this.setState(this.setStateByProps(nextProps));

    // Apply the colors of the alert depending on its type
    this._applyAlertStylesheet(nextProps.type);
  }

  setStateByProps(props) {
    return {
      alertShown: false,
      backgroundColor: '#007bff', // default value : blue
      strokeColor: '#006acd', // default value : blue

      /* Cusomisation of the alert: Title, Message, Icon URL, Alert Type (error, success, warning, info), Duration for Alert keep shown */
      title: props.title,
      message: props.message,
      avatarUrl: props.avatarUrl,
      type: props.type || 'info',
      duration: props.duration || 3000,

      /* Callbacks method on Alert Tapped, on Alert Show, on Alert Hide */
      onTapped: props.onTapped,
      onShow: props.onShow,
      onHide: props.onHide,

      /* Stylesheets */
      stylesheetInfo: props.stylesheetInfo || { backgroundColor: '#007bff', strokeColor: '#006acd' }, // Default are blue colors
      stylesheetSuccess: props.stylesheetSuccess || { backgroundColor: 'darkgreen', strokeColor: '#b40000' }, // Default are Green colors
      stylesheetWarning: props.stylesheetWarning || { backgroundColor: '#ff9c00', strokeColor: '#f29400' }, // Default are orange colors
      stylesheetError: props.stylesheetError || { backgroundColor: '#ff3232', strokeColor: '#FF0000' }, // Default are red colors
      stylesheetExtra: props.stylesheetExtra || { backgroundColor: '#007bff', strokeColor: '#006acd' }, // Default are blue colors, same as info

      /* Duration of the animation */
      durationToShow: props.durationToShow || 350,
      durationToHide: props.durationToHide || 350,

      /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
      viewTopOffset: props.viewTopOffset || 0,
      viewLeftOffset: props.viewLeftOffset || 0,
      viewRightOffset: props.viewRightOffset || 0,

      /* Inset of the view, useful if you want to apply a padding at your alert content */
      viewTopInset: props.viewTopInset || 0,
      viewLeftInset: props.viewLeftInset || 0,
      viewRightInset: props.viewRightInset || 0,
    };
  }


  /*
  * Show the alert
  */
  showMessageBarAlert() {
    // If an alert is already shonw or doesn't have a title or a message, do nothing
    if (this.state.alertShown || (this.state.title == null && this.state.message == null)) {
      return;
    }

    // Set the data of the alert in the state
    this.setState({
      alertShown: true,
    });

    // Display the alert by animating it from the top of the screen
    // Auto-Hide it after a delay set in the state
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.state.durationToShow
    }).start(this._showMessageBarAlertComplete());
  }


  /*
  * Hide the alert after a delay, typically used for auto-hidding
  */
  _showMessageBarAlertComplete() {
    // Execute onShow callback if any
    this._onShow();

    setTimeout(() => {
      this.hideMessageBarAlert();
    }, this.state.duration);
  }


  /*
  * Hide the alert, typically used when user tap the alert
  */
  hideMessageBarAlert() {
    // Hide the alert after a delay set in the state only if the alert is still visible
    if (!this.state.alertShown) {
      return;
    }

    // Animate the alert to hide it to the top of the screen
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: this.state.durationToHide
    }).start(this._hideMessageBarAlertComplete());
  }


  _hideMessageBarAlertComplete() {
    // The alert is not shown anymore
    this.setState({
      alertShown: false
    });

    this._notifyAlertHidden();

    // Execute onHide callback if any
    this._onHide();
  }

  /*
  * Callback executed to tell the observer the alert is hidden
  */
  _notifyAlertHidden() {
    if (this.notifyAlertHiddenCallback) {
      this.notifyAlertHiddenCallback();
    }
  }


  /*
  * Callback executed when the user tap the alert
  */
  _alertTapped() {
    // Hide the alert
    this.hideMessageBarAlert();

    // Execute the callback passed in parameter
    if (this.props.onTapped) {
      this.props.onTapped();
    }
  }


  /*
  * Callback executed when alert is shown
  */
  _onShow() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  }


  /*
  * Callback executed when alert is hidden
  */
  _onHide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }


  /*
  * Change the background color and the line stroke color depending on the Type
  * If the type is not recognized, the 'info' one (blue colors) is selected for you
  */
  _applyAlertStylesheet(type) {
    // Set the Background color and the line stroke color of the alert depending on its type
    // Set to blue-info if no type or if the type is not recognized

    let backgroundColor;
    let strokeColor;

    switch (type) {
      case 'success':
        backgroundColor = this.state.stylesheetSuccess.backgroundColor;
        strokeColor = this.state.stylesheetSuccess.strokeColor;
        break;
      case 'error':
        backgroundColor = this.state.stylesheetError.backgroundColor;
        strokeColor = this.state.stylesheetError.strokeColor;
        break;
      case 'warning':
        backgroundColor = this.state.stylesheetWarning.backgroundColor;
        strokeColor = this.state.stylesheetWarning.strokeColor;
        break;
      case 'info':
        backgroundColor = this.state.stylesheetInfo.backgroundColor;
        strokeColor = this.state.stylesheetInfo.strokeColor;
        break;
      default:
        backgroundColor = this.state.stylesheetExtra.backgroundColor;
        strokeColor = this.state.stylesheetExtra.strokeColor;
        break;
    }

    this.setState({
      backgroundColor: backgroundColor,
      strokeColor: strokeColor
    });
  }


  /*
  * Alert Rendering Methods
  */

  render() {
    let animation = this.animatedValue.interpolate({
       inputRange: [0, 0.3, 1],
       outputRange: [-windowHeight, -windowHeight/3, 0]
     })

    return (
      <Animated.View style={{ transform: [{ translateY: animation }], backgroundColor: this.state.backgroundColor, borderColor: this.state.strokeColor, borderBottomWidth: 1, position: 'absolute', top: this.state.viewTopOffset, left: this.state.viewLeftOffset, right: this.state.viewRightOffset, paddingTop: this.state.viewTopInset, paddingLeft: this.state.viewLeftInset, paddingRight: this.state.viewRightInset }}>
        <TouchableOpacity onPress={()=>{this._alertTapped()}} style={{ flex: 1 }}>
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
