import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';

import MainMenu from './MainMenu';

class MainApp extends Component {
    
    render(){
      
      return (
        <div>
          <MainMenu />        
        </div>
      )
    }
}

export default MainApp;