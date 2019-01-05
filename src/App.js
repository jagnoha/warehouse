import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Button, Form, Grid, Header, Image, 
  Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, browserHistory } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import MainApp from './Components/MainApp';
import Listings from './Components/Listings';
import Locations from './Components/Locations';
import Brands from './Components/Brands';
import Reports from './Components/Reports';
import 'react-image-lightbox/style.css';
import _ from 'lodash';
//import { Provider } from 'react-redux';
//import configureStore from './modules/configureStore';
import './helpers.js';
import './client.js';
//import { connect } from 'react-redux';
//import configureStore from './modules/configureStore';
import { connect } from 'react-redux';
import { locationsFetchData, listingsFetchData, brandsFetchData, ebayMarketplacesFetchData } from './modules/actions';

//const store = configureStore();

//const urlbase = 'http://192.168.1.11:8083';
//const urlbase = 'http://10.0.0.216:8083';

class App extends React.PureComponent {

  state = {
    isLogin: true,
  }

  componentDidMount(){
    this.props.fetchLocations(this.props.urlBase+'/getlocations');
    this.props.fetchBrands(this.props.urlBase+'/getbrands');
    this.props.fetchEbayMarketplaces(this.props.urlBase+'/getebaymarketplaces');
    this.props.fetchListings(this.props.urlBase+'/getlistings', this.props.clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
    
    setInterval(this.loadInformationFromServer, 30000);
  }

  //componentDidMount(){
    //store.subscribe(() => this.forceUpdate());
    //this.loadInformationFromServer();
    //setInterval(this.loadInformationFromServer, 6000);*/
  //}

  loadInformationFromServer = () => {
    //const state = store.getState();
  
    //window.client.getListingsFromDB(store, state.globalDirection, state.globalColumn);
    this.props.fetchLocations(this.props.urlBase+'/getlocations');
    this.props.fetchBrands(this.props.urlBase+'/getbrands');
    this.props.fetchEbayMarketplaces(this.props.urlBase+'/getebaymarketplaces');
    this.props.fetchListings(this.props.urlBase+'/getlistings', this.props.clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
    }

  changeLogin = () => {
    this.setState({
      isLogin: this.state.isLogin ? false : true,
    })
  }

  render() {    
    //const state = store.getState();
    if (this.state.isLogin){
      return (
        <div>
          
            <MainApp />
            
            <Route exact path="/" component={Listings} />
            <Route path="/locations" component={Locations} />
            <Route path="/brands" component={Brands} />
            <Route path="/reports" component={Reports} />
          
        </div>
      )
    } else {
      return (
        
          <LoginForm />
        
        
      )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
      /*locations: state.locations,
      hasErroredLocations: state.locationsHasErrored,
      isLoadingLocations: state.locationsIsLoading,
      listings: state.listings,
      hasErroredListings: state.listingsHasErrored,
      isLoadingListings: state.listingsIsLoading,
      brands: state.brands,
      hasErroredBrands: state.brandsHasErrored,
      isLoadingBrands: state.brandsIsLoading,
      ebayMarketplaces: state.ebayMarketplaces,
      hasErroredEbayMarketplaces: state.ebayMarketplacesHasErrored,
      isLoadingEbayMarketplaces: state.ebayMarketplacesIsLoading,*/
      //activePage: state.activePage,
      direction: state.direction,
      users: state.users,
      clickedColumn: state.clickedColumn,      
      urlBase: state.urlBase, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchLocations: (url) => dispatch(locationsFetchData(url)),
      fetchListings: (url, clickedColumn, order) => dispatch(listingsFetchData(url, clickedColumn, order)),
      fetchBrands: (url) => dispatch(brandsFetchData(url)),
      fetchEbayMarketplaces: (url) => dispatch(ebayMarketplacesFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
//export default connect(mapStateToProps)(ProfileContainer);
