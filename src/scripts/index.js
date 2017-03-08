if (process.env.NODE_ENV !== 'production') {
  require('../index.html');
}
console.log(process.env.NODE_ENV);
require('../sass/app.scss');

import _ from 'lodash';

console.log('index.js');
