import micMute from '../assets/mic-mute.png';
import micActive from '../assets/mic-active.png';
import disconnect from '../assets/disconnect.png';
import '../styles/widget.css';
import { toggleVoiceCommunication, abortCommunication } from '../services/retellService';

export function createWidget() {
  const widget = document.createElement('div');
  widget.id = 'retell-widget';
  widget.hidden = true;

  const icon1 = document.createElement('img');
  icon1.src = micMute;
  icon1.className = 'widget-icon';
  //DISABLED AS enabled from applicatiomn
  icon1.hidden = true;
  icon1.onclick = () => toggleVoiceCommunication(icon1);

  const icon2 = document.createElement('img');
  icon2.src = disconnect;
  icon2.className = 'widget-icon';
   //DISABLED AS enabled from applicatiomn
  icon2.hidden = true;
  icon2.onclick = () => abortCommunication(icon1, micMute, micActive);

  widget.appendChild(icon1);
  widget.appendChild(icon2);
  document.body.appendChild(widget);
  return widget;
}
