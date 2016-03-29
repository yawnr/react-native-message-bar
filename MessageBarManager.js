/**
 * Name: Message Bar Manager
 * Description: A manager to show/hide and handle a queue of alerts
 * https://github.com/KBLNY/react-native-message-bar
 */
'use strict';

module.exports = {
	_currentMessageBarAlert: null,
	_messageAlerts: new Array(),

	setCurrentMessageBarAlert: function(alert) {
		console.warn('This method is deprecated, please use registerMessageBar instead.');
		this.registerMessageBar(alert);
	},

	removeCurrentMessageBarAlert: function() {
		console.warn('This method is deprecated, please use registerMessageBar instead.');
		this.unregisterMessageBar();
	},

	registerMessageBar(messageBar) {
		this._currentMessageBarAlert = messageBar;
	},

	unregisterMessageBar() {
		this._currentMessageBarAlert = null;;
	},


	showAlert: function(alert) {
		if (alert !== null) {
			this.hideAlert();

			this.setCurrentMessageBarAlert(alert);

			this._currentMessageBarAlert.showMessageBarAlert();
		}
	},

	showCurrentAlert: function(newState = null) {
		if (this._currentMessageBarAlert !== null) {
			if (newState != null) {
				this._currentMessageBarAlert.setNewState(newState);
			}

			setTimeout(()=>{
				this._currentMessageBarAlert.showMessageBarAlert();
			}, 100);
		}
	},
	// showCurrentAlert: function(newState = null) {
	// 	if (this._currentMessageBarAlert !== null) {
	// 		if (this._currentMessageBarAlert.isMessageBarShown()) {
	// 			this._currentMessageBarAlert.notifyAlertHiddenCallback = () => {
	// 				if (newState != null) {
	// 					this._currentMessageBarAlert.setState(newState);
	//
	// 					this._currentMessageBarAlert.showMessageBarAlert();
	// 				}
	// 			}
	// 		} else if (newState != null) {
	// 			this._currentMessageBarAlert.setState(newState);
	// 		}
	//
	// 		setTimeout(()=>{
	// 			this._currentMessageBarAlert.showMessageBarAlert();
	// 		}, 100);
	// 	}
	// },

	hideAlert: function() {
	  if (this._currentMessageBarAlert !== null) {
	    this._currentMessageBarAlert.hideMessageBarAlert();
	  }
	},

	// TODO Implement Queue Alert system
	// showCurrentAlert: function() {
  //   if (this._currentMessageBarAlert !== null) {
	// 	  this._currentMessageBarAlert.showMessageBarAlert();
	// 	}
	// },
	//
  //
	//
	//
	// addAlert: function(alert){
	// 	// Add the MessageBar alert to the queue
	// 	this._messageAlerts.push(alert);
	//
	// 	this.showAlert();
	// },
	//
	// showAlert: function() {
	// 	if (this._currentMessageBarAlert === null) {
	// 		var alertToShow = this._messageAlerts.shift();
	//
	// 		if (alertToShow) {
	// 			alertToShow.notifyAlertHiddenCallback = ()=>{
	// 				this._currentMessageBarAlert = null;
	//
	// 				this.showAlert();
	// 			}
	//
	// 			this.setCurrentMessageBarAlert(alertToShow);
	//
	// 			this.showCurrentAlert();
	// 		}
	// 	}
	// },


}
