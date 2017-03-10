if (process.env.NODE_ENV !== 'production') {
  require('../index.html');
}
require('../sass/app.scss');
const ipcRenderer = require('electron').ipcRenderer;
import _ from 'lodash';

const btnTestEvent = document.querySelector('.testEvent');
const sendClickEvt = (evt) => {
  evt.preventDefault();
  let testEventAction = document.getElementById('testEventAction');
  testEventAction.style.display = 'block';
  ipcRenderer.send('analytics', 'btnClick', {
    action: 'displayData'
  });
};

btnTestEvent.addEventListener('click', sendClickEvt, false);

ipcRenderer.on('analyticsSuccess', (res) => {
  console.log('ANALYTICS SUCCESS!');
  console.log(res);
});

ipcRenderer.on('analyticsError', (err) => {
  console.log('ANALYTICS ERROR!');
  console.error(err);
});
