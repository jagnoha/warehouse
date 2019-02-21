import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, browserHistory } from "react-router-dom";
import { changeListingsFiltered, changeProductsInPage, userActiveFetchData, userActiveLogout  } from '../modules/actions';
import { connect } from 'react-redux';


class MainMenu extends Component {
  state = { activeItem: 'Listings' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLogoutClick = (e) => {
      console.log(e);
      //this.props.userActiveUpdate([]);
      this.props.userActiveLogout();
      /*this.setState({
        activeItem: 'Listings',
      })*/
      //window.location.reload(true);
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
            icon="box"            
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
       Pending to Shelf
      <Label size="mini" circular color='red' >
        {this.props.listings.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && item.location.length === 0).length}
      </Label>
      
    </Menu.Item>
    <Menu.Item><Icon name="ellipsis vertical" /></Menu.Item>
        <Menu.Item>
              Hi, {this.props.userActive.username}
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
              as={ Link }
              to={''}
              
            />
            
          </Menu.Menu>
        </Menu>
        
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {      
      listings: state.listings,
      userActive: state.userActive,
      urlBase: state.urlBase,      
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeListingsFiltered: (quantity) => dispatch(changeListingsFiltered(quantity)),
      changeProductsInPage: (list) => dispatch(changeProductsInPage(list)),
      userActiveLogout: () => dispatch(userActiveLogout()),
      userActiveFetchData: (url) => dispatch(userActiveFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);