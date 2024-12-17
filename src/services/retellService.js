import { RetellWebClient } from "retell-client-js-sdk";
import micMute from '../assets/mic-mute.png';
import micActive from '../assets/mic-active.png';
import axios from 'axios';

const retellWebClient = new RetellWebClient();
let recognizing = false;
let mute = false;
let token = null;
let apiKey = '';
let agentId = '';

/**
 * Initializes the Retell service with the provided configuration.
 * @param {Object} config - The configuration object, including an optional token.
 */
export async function initRetellService(config) {
  console.log("Retell service initialized with config:", config);
  token = config.token || null;
  apiKey = config.apiKey || null;
  agentId = config.agentId || null;
}

/**
 * Toggles voice communication (start/stop) and updates the icon.
 * @param {HTMLElement} icon - The microphone icon element to update.
 */
export function toggleVoiceCommunication(icon) {
  recognizing = !recognizing;
  icon.src = recognizing ? micActive : micMute;
  recognizing ? startRecognition() : stopRecognition();
}

/**
 * Starts the voice recognition process using Retell Web Client.
 * @param {string} [accessToken] - The access token for authentication.
 */
async function startRecognition(accessToken = token) {
  if (!accessToken) {
    console.log("No access token available. Fetching token...");
    accessToken = await fetchAccessToken();
    if (!accessToken) {
      console.error("Unable to obtain access token.");
      return;
    }
  }

  try {
    await retellWebClient.startCall({ accessToken });
    recognizing = true;
    console.log("Voice recognition started.");
  } catch (error) {
    console.error("Error starting voice recognition:", error);
  }
}

/**
 * Stops the voice recognition process.
 */
async function stopRecognition() {
  try {
    await retellWebClient.stopCall();
    recognizing = false;
    console.log("Voice recognition stopped.");
  } catch (error) {
    console.error("Error stopping voice recognition:", error);
  }
}

/**
 * Toggles the mute state of the microphone and updates the state.
 */
export async function toggleMute() {
  mute = !mute;
  try {
    mute ? await retellWebClient.mute() : await retellWebClient.unmute();
    console.log(`Microphone is now ${mute ? "muted" : "unmuted"}.`);
  } catch (error) {
    console.error(`Error ${mute ? "muting" : "unmuting"} microphone:`, error);
  }
}

/**
 * Mute the state of the microphone and updates the state.
 */
export function muteCall() {
  if(!mute) {
    mute = true;
   retellWebClient.mute()
  }
}

/**
 * Unmute the state of the microphone and updates the state.
 */
export function unmuteCall() {
  if(mute) {
    mute = false;
    retellWebClient.unmute();
  }
}

/**
 * Starts the voice communication and updates the mic icon.
 * @param {HTMLElement} element - The microphone icon element to update.
 */
export function startCommunication(element) {
  console.log("Starting communication with token:", token);
  startRecognition(token);
  if(element) element.src = micActive;
}

/**
 * Aborts the voice communication and resets the mic icon.
 * @param {HTMLElement} element - The microphone icon element to update.
 */
export function abortCommunication(element) {
  stopRecognition();
  if(element) element.src = micMute;
}

/**
 * Fetches an access token using the API key.
 * @returns {Promise<string|null>} - The access token, or null if failed.
 */
async function fetchAccessToken() {
  try {
    const response = await axios.post(
      'https://api.retellai.com/v2/create-web-call',
      { agent_id: agentId },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const accessToken = response.data.access_token;
    console.log("Access token obtained:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    return null;
  }
}
