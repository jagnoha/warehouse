import React, {Component} from 'react'
//import PropTypes from 'prop-types'
//import Product from './Product'
//import '../helpers.js'
import { connect } from 'react-redux';
import {Button, Dropdown} from 'semantic-ui-react';
import { changeProductsSelected, changePicturesIsLoading, fixPicturesListing  } from '../modules/actions';



class ActionProductsSelected extends Component {
  
    state = {
      bulkOption: 'online',
    }
  
    handleChange = (e,data) => {
      
      this.setState({bulkOption: data.value});
    }
  
    handleClick = () => {
      console.log("CLICK!");
      
  
      if (this.state.bulkOption === 'amazon'){
        console.log("EJECUTAR AMAZON!");        
        
        //window.client.processAsinListBulk(this.props.productsSelected, this.props.rawList, this.props.brandsList);
      }

      if (this.state.bulkOption === 'pictures'){
        console.log("FIXING PICTURES!");
        this.props.changePicturesIsLoading(this.props.picturesIsLoading.concat(this.props.productsSelected));
        this.props.fixPicturesListing(this.props.productsSelected, this.props.listings);
        
        //window.client.processAsinListBulk(this.props.productsSelected, this.props.rawList, this.props.brandsList);
      }
  
      this.setState({bulkOption: 'online'});
      
      this.props.changeProductsSelected([]);

      /*store.dispatch({
        type: 'UNCHECK_ALL',
      })*/ 
  
  
    }
  
    render(){
      const options = [
        { key: 'online', icon: 'globe', text: 'Switch to Online', value: 'online' },
        { key: 'offline', icon: 'level down', text: 'Bring to Offline', value: 'offline' },
        { key: 'amazon', icon: 'amazon', text: 'Publish in Amazon', value: 'amazon' },
        { key: 'pictures', icon: 'picture', text: 'Fix Pictures', value: 'pictures' },
        //{ key: 'delete', icon: 'delete', text: 'Delete', value: 'delete' },
      ]
      return (
        <Button.Group color='teal'>
        <Dropdown value = {this.state.bulkOption} disabled = {this.props.productsSelected.length < 1 ? true : false} 
      options={options} floating button className='icon' onChange = {this.handleChange} />
      <Button disabled = {this.props.productsSelected.length < 1 ? true : false} onClick = {this.handleClick}>
        Apply on {this.props.productsSelected.length} selected</Button>
      
    </Button.Group>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
        /*locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,*/
        /*listings: state.listings,
        clickedColumn: state.clickedColumn,
        direction: state.direction,*/
        activePage: state.activePage,
        productsByPage: state.productsByPage,
        listingsFiltered: state.listingsFiltered,
        listings: state.listings,        
        filterByCondition: state.filterByCondition,
        filterByStatus: state.filterByStatus,
        filterByMarketplace: state.filterByMarketplace,
        filterByUser: state.filterByUser,
        filterBySearch: state.filterBySearch,
        searchIsChecked: state.searchIsChecked,
        productsSelected: state.productsSelected,
        picturesIsLoading: state.picturesIsLoading,
        
        
        //listingsFiltered: state.listingsFiltered,
        /*hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,
        activePage: state.activePage,
        productsByPage: state.productsByPage, */     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        changePicturesIsLoading: (list) => dispatch(changePicturesIsLoading(list)),
        fixPicturesListing: (list, allListings) => dispatch(fixPicturesListing(list, allListings)),
        
        
        
        //fetchListings: (url) => dispatch(listingsFetchData(url)),
        //fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ActionProductsSelected);