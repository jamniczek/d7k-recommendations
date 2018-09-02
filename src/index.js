import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';

fetch('https://evening-cove-27837.herokuapp.com/recognize') // this should boot heroku to make experience a it smoother

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
