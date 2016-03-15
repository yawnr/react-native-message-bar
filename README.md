# react-native-message-bar
[![npm version]](https://npmjs.org/package/react-native-message-bar "View this project on npm")
[![npm downloads]](https://npmjs.org/package/react-native-message-bar "View this project on npm")
[![npm licence]](https://npmjs.org/package/react-native-message-bar "View this project on npm")

A message bar notification component displayed at the top of the screen for React Native (Android and iOS) projects.

![Screenshot](http://s15.postimg.org/auad1m2bv/image.png)


## Content
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Hide the Message Bar Alert](#hide-the-message-bar-alert)
- [Customize Alert Type](#customize-alert-type)
- [Customize Alert Content](#customize-alert-content)
- [Customize View Layout](#customize-view-layout)
- [Properties](#properties)
- [TODOS](#todos)


## Features
- Animated alert with Title, Message and Icon
- Auto-hide after 3 seconds
- Support hide on tap
- 4 pre-configured customizable styles + 1 extra
- Customizable style and animation
- Callbacks on alert show, hide and tap
- Orientation supported
- Children component support Show/Hide alert


## Installation
Make sure that you are in your React Native project directory and run:
`$ npm install react-native-message-bar --save`


## Basic Usage
1. Import the `react-native-message-bar` package
```javascript
var MessageBarAlert = require('react-native-message-bar');
```

2. Add the `MessageBarAlert` to your render method
```javascript
// Within your render function.
// Include the MessageBar once within your top View element
<MessageBarAlert ref="alert"
  title="John Doe" // Title of the alert
  message="Hello, any suggestions?" // Message of the alert
  avatarUrl="<URL of your icon/avatar>" // Avatar/Icon URL of the alert
  type="info" // Alert Type: you can select one of 'success', 'error', 'warning', 'error', or 'custom' (use custom if you use a 5th stylesheet, all are customizable). Default is 'info'
/>
```

3. Display the Message Bar Alert on demand
```javascript
// Simple show the alert by its reference
this.refs.alert.showMessageBarAlert();
```
Please note, if you do not provide a `type`, the `info` one will be chosen for you.
The normal `duration` of the notification is 3 seconds (3000 ms), you can override it. After this time, the notification is going to be hidden

- See a full Example in `index.ios.js` or `index.android.js`.


## Hide the Message Bar Alert
```javascript
// Simple hide the alert by its reference
this.refs.alert.hideMessageBarAlert();
```


## Customize Alert Type
The Message Bar Alert comes with 4 pre-configured alert style and 1 undefined extra.
These alert styles defined the background color of the alert and the line stroke color.
The 4 pre-configured alert styles are:
- `info` defined blue colors
- `success` defined green colors
- `warning` defined orange colors
- `error` defined red colors
The `extra` alert type allows you to use another 5th type.

```javascript
<MessageBarAlert ref="alert"
  ...

  type='info' // Alert Type: you can select one of 'success', 'error', 'warning', 'error', or 'custom' (use custom if you use a 5th stylesheet, all are customizable). Default is 'info'

  /* Customize the stylesheets and/or provide an additional one 'extra' */
  stylesheetInfo = {{ backgroundColor : '#007bff', strokeColor : '#006acd' }} // Default are blue colors
  stylesheetSuccess = {{ backgroundColor : 'darkgreen', strokeColor : '#b40000' }} // Default are Green colors
  stylesheetWarning = {{ backgroundColor : '#ff9c00', strokeColor : '#f29400' }} // Default are orange colors
  stylesheetError = {{ backgroundColor : '#ff3232', strokeColor : '#FF0000' }} // Default are red colors
  stylesheetExtra = {{ backgroundColor : 'black', strokeColor : 'gray' }} // Default are blue colors, same as info

  ...
/>
```


## Customize Alert Content
You can customize the style of the Title, Message and Icon/Avatar.
```javascript
<MessageBarAlert ref="alert"
  ...

  title="John Doe" // Title of the alert
  message="Hello, any suggestions?" // Message of the alert
  avatarUrl="<URL of your icon/avatar>" // Avatar/Icon URL of the alert

  /* Style for the text elements and the  */
  titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
  messageStyle={{ color: 'white', fontSize: 16 }}
  avatarStyle={{ height: 40, width: 40, borderRadius: 20 }}

  ...
/>
```


## Customize View Layout
You can customize the inset (padding) and the offset of the alert.
```javascript
<MessageBarAlert ref="alert"
  ...

  /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
  viewTopOffset = {0} // Default is 0
  viewLeftOffset = {0} // Default is 0
  viewRightOffset = {0} // Default is 0

  /* Inset of the view, useful if you want to apply a padding at your alert content */
  viewTopInset = {15} // Default is 0
  viewLeftInset = {0} // Default is 0
  viewRightInset = {0} // Default is 0

  ...
/>
```


## Properties
Prop                  | Type     | Default  | Description
--------------------- | -------- | -------- | -----------
title                 | String   |          | Title of the alert
message               | String   |          | Message of the alert
avatarUrl             | String   |          | Avatar/Icon URL of the alert
type                  | String   | info     | Alert Type: you can select one of 'success', 'error', 'warning', 'error', or 'custom' (use custom if you use a 5th stylesheet, all are customizable).
duration              | Number   | 3000     | Number of ms the alert is displayed  
onTapped              | Function |          | Callback function after alert is tapped
onShow                | Function |          | Callback function after alert is shown
onHide                | Function |          | Callback function after alert is hidden
stylesheetInfo        | Object   | { backgroundColor: '#007bff', strokeColor: '#006acd' } | Background color and line stroke colors of the alert when type is equals to `info`
stylesheetSuccess     | Object   | { backgroundColor: 'darkgreen', strokeColor: '#b40000' } | Background color and line stroke colors of the alert when type is equals to `success`
stylesheetWarning     | Object   | { backgroundColor: '#ff9c00', strokeColor: '#f29400' } | Background color and line stroke colors of the alert when type is equals to `warning`
stylesheetError       | Object   | { backgroundColor: '#ff3232', strokeColor: '#FF0000' } | Background color and line stroke colors of the alert when type is equals to `error`
stylesheetExtra       | Object   | { backgroundColor: '#007bff', strokeColor: '#006acd' } | Background color and line stroke colors of the alert when type is equals to `extra`
durationToShow        | Number   | 350      | Duration of the animation to completely show the alert
durationToHide        | Number   | 350      | Duration of the animation to completely hide the alert
viewTopOffset         | Number   | 0        | Offset of the view from the top. That means the alert touch the top edge of the screen
viewLeftOffset        | Number   | 0        | Offset of the view from the left. That means the alert touch the left edge of the screen
viewRightOffset       | Number   | 0        | Offset of the view from the right. That means the alert touch the right edge of the screen
viewTopInset          | Number   | 0        | Padding Top of the view
viewLeftInset         | Number   | 0        | Padding Left of the view
viewRightInset        | Number   | 0        | Padding Right of the view
avatarStyle           | Style    | { height: 40, width: 40, borderRadius: 20, alignSelf: 'center' } | Style of the icon/avatar
titleStyle            | Style    | { color: 'white', fontSize: 18, fontWeight: 'bold' } | Style of the title
messageStyle          | Style    | { color: 'white', fontSize: 16 } | Style of the message


## TODOS

- [ ] Add Queue System
- [ ] Anything that can help to improve :) Thanks for contributions

---

**MIT Licensed**
