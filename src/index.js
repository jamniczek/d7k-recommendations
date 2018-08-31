import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';

fetch('https://secret-fortress-42712.herokuapp.com/recognize')

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
