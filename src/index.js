import { createWidget } from './components/Widget';
import { initRetellService } from './services/retellService';
import { abortCommunication, startCommunication, muteCall, unmuteCall } from './services/retellService';

console.log('hii')

class QurveSDK {
  constructor(config) {
    this.config = config;
    this.widget = null;
  }

  /**
   * Initializes the SDK by creating the widget and configuring the service.
   */
  init() {
    this.widget = createWidget();
    initRetellService(this.config);
  }

  /**
   * Starts the communication by triggering the start call.
   */
  startCall() {
    startCommunication();
  }

  /**
   * Disconnects the current call by aborting the communication.
   */
  abortCall() {
    abortCommunication();
  }

  /**
   * Mute the current call.
   */
  muteCall() {
    muteCall();
  }

  /**
   * Unmute the current call.
   */
  unmuteCall() {
    unmuteCall();
  }
}

// Make the SDK available globally.
window.QurveSDK = QurveSDK;
