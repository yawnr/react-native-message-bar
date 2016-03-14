# react-native-message-bar
A message bar notification component displayed at the top of the screen for React Native (Android and iOS) projects.

Requires react-native >= 0.17

 ![Screenshot](http://s17.postimg.org/pb540h733/image.png)
 ![Screenshot](http://s15.postimg.org/auad1m2bv/image.png)
 ![Screenshot](http://s28.postimg.org/nk7aa5ewt/image.png)

 
## Usage

- 1. Import `react-native-message-bar`
```javascript
var MessageBarAlert = require('react-native-message-bar');
```

- 2. Add the `MessageBarAlert` to your render method
```javascript
// Within your render function.
// Include the MessageBar once within your top View element
<MessageBarAlert ref="alert" // Mandatory: give it a name in order to perform the show/hide methods
  titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} // You can customize the text title, if you do not provide this attribute, the component will apply this style
  messageStyle={{ color: 'white', fontSize: 16 }} // You can customize the text message, if you do not provide this attribute, the component will apply this style
  avatarStyle={{ height: 40, width: 40, borderRadius: 20 }} // You can customize the avatar rendering, if you do not provide this attribute, the component will apply this style
/>
```

- 3. Call `showMessageBarAlert(title, message, avatarUrl, type, duration, callback)`
```javascript
// Later on in your component...
// `title` or `message` is at least mandatory
// `type` is mandatory too, pick one of the following:
// - 'success', display a green notification bar
// - 'error', display a blue notification bar
// - 'warning', display a orange notification bar
// - 'error', display a red notification bar
this.refs.alert.showMessageBarAlert("This is an alert with a callback function", // Title of the alert
  "Tap on the alert to execute the callback you passed in parameter", // Message of the alert
  "http://www.icon100.com/up/4250/128/83-circle-error.png", // Avatar URL of the alert
  'warning', // you can select one of 'success', 'error', 'warning', 'error'
  10000, // The alert is displayed for 10 seconds, instead of 3
  ()=>{this.customCallback()} // This function is executed on alert tap
);

customCallback() {
  this.setState({
    callbackButton: 'Callback executed!'
  });
}
```
Please note, if you do not provide a `type`, the `info` one will be chosen for you.
The normal `duration` of the notification is 3 seconds (3000 ms), you can override it. After this time, the notification is going to be hidden


## Examples

- See an full Example in `index.ios.js` or `index.android.js`.


## TODOS

- [ ] Add Stylesheet integration in order to inject your Stylesheet component
- [ ] Anything that can help to improve :) Thanks for contributions

---

**MIT Licensed**
