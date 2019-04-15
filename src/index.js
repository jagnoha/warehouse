import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import configureStore from './modules/configureStore';
import { Provider } from 'react-redux';
//import { transitions, positions, Provider as AlertProvider } from 'react-alert';
//import AlertTemplate from 'react-alert-template-basic';

/*const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }*/


//const store = enHanceCreateStore();
const store = configureStore();

//import '../semantic/dist/semantic.min.css';
ReactDOM.render(
    
  <Router><Provider store={store}>
  
    <App />
    
</Provider></Router>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
