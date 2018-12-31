import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, browserHistory } from "react-router-dom";


class MainMenu extends Component {
  state = { activeItem: 'Listings' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLogoutClick = (e) => {
      console.log(e);
  }

  render() {
    const { activeItem } = this.state
    

    return (
      <div>
        <Menu stackable pointing secondary>
          
          <Menu.Item
            as={ Link }
            to={'/'}  
            name='listings' 
            active={activeItem === 'listings'} 
            onClick={this.handleItemClick}            
          />

          <Menu.Item
            as={ Link }
            to={'locations'}  
            name='locations' 
            active={activeItem === 'locations'} 
            onClick={this.handleItemClick} 
            icon="warehouse"            
          />

          <Menu.Item
            as={ Link }
            to={'brands'}  
            name='brands' 
            active={activeItem === 'brands'} 
            onClick={this.handleItemClick} 
            icon="tag"
          />

          <Menu.Item
            as={ Link }
            to={'reports'} 
            name='reports' 
            active={activeItem === 'reports'} 
            onClick={this.handleItemClick} 
            icon="pie graph"
          />            

          <Menu.Item 
            as={ Link }
            to={'orders'}
            name='orders' 
            active={activeItem === 'orders'} 
            onClick={this.handleItemClick} 
            icon="shipping"
          />
          
                    
          <Menu.Menu position='right'>
          
          
            
          <Menu.Item as='a'>
       Pending Locations
      <Label size="mini" circular color='red' >
        32
      </Label>
      
    </Menu.Item>
    <Menu.Item><Icon name="ellipsis vertical" /></Menu.Item>
        <Menu.Item>
              Hi, Orr
        </Menu.Item>
            
        <Dropdown direction="left" item icon='settings' simple>
        <Dropdown.Menu>
          <Dropdown.Item><Icon name="user"></Icon>My Account</Dropdown.Item>
          <Dropdown.Item><Icon name="users"></Icon>Users Settings</Dropdown.Item>
          
          <Dropdown.Divider />
          <Dropdown.Header>Marketplaces</Dropdown.Header>
          <Dropdown.Item>Ebay Settings</Dropdown.Item>
          <Dropdown.Item>Amazon Settings</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
            
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleLogoutClick}
              icon='sign-out'
              
            />
            
          </Menu.Menu>
        </Menu>
        
      </div>
    )
  }
}

export default MainMenu;