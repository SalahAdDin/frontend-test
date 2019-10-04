import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/fonts/style.css';
	import './css/tether.min.css';
	import './css/select2.css';
	import './css/prestigio.css';
	import './css/style.css';
	import './css/metrics.css';
	import './css/navbar.css';
    import './css/socialnetworks.css';
    import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
