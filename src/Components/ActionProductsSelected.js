import React, {Component} from 'react'
//import PropTypes from 'prop-types'
//import Product from './Product'
//import '../helpers.js'
import { connect } from 'react-redux';
import {Button, Dropdown} from 'semantic-ui-react';
import { changeProductsSelected, changePicturesIsLoading, fixPicturesListing, publishAmazonBulk, uploadEbayBulk  } from '../modules/actions';



class ActionProductsSelected extends Component {
  
    state = {
      bulkOption: 'pictures',
    }
  
    handleChange = (e,data) => {
      
      this.setState({bulkOption: data.value});
    }
  
    handleClick = () => {
      console.log("CLICK!");
      
  
      if (this.state.bulkOption === 'amazon'){
        console.log("EJECUTAR AMAZON!");
        
        this.props.publishAmazonBulk(this.props.productsSelected, this.props.listings, this.props.brands);
        
        //window.client.processAsinListBulk(this.props.productsSelected, this.props.rawList, this.props.brandsList);
      }

      if (this.state.bulkOption === 'upload'){
        console.log("UPLOAD LISTINGS!");
        
        this.props.uploadEbayBulk(this.props.productsSelected, this.props.listings, this.props.locations);
        
        //window.client.processAsinListBulk(this.props.productsSelected, this.props.rawList, this.props.brandsList);
      }

      if (this.state.bulkOption === 'pictures'){
        console.log("FIXING PICTURES!");
        this.props.changePicturesIsLoading(this.props.picturesIsLoading.concat(this.props.productsSelected));
        this.props.fixPicturesListing(this.props.productsSelected, this.props.listings);
        
        //window.client.processAsinListBulk(this.props.productsSelected, this.props.rawList, this.props.brandsList);
      }
  
      this.setState({bulkOption: 'pictures'});
      
      this.props.changeProductsSelected([]);

      /*store.dispatch({
        type: 'UNCHECK_ALL',
      })*/ 
  
  
    }
  
    render(){
      const options = [
        //{ key: 'online', icon: 'globe', text: 'Switch to Online', value: 'online' },
        //{ key: 'offline', icon: 'level down', text: 'Bring to Offline', value: 'offline' },
        
        { key: 'pictures', icon: 'picture', text: 'Fix Pictures', value: 'pictures' },
        { key: 'amazon', icon: 'amazon', text: 'Publish in Amazon', value: 'amazon' },
        { key: 'upload', icon: 'upload', text: 'Upload in Ebay', value: 'upload' },
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
        brands: state.brands,
        locations: state.locations,
        
        
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
        publishAmazonBulk: (list, allListings, brandList) => dispatch(publishAmazonBulk(list, allListings, brandList)),
        uploadEbayBulk: (list, allListings, locations) => dispatch(uploadEbayBulk(list, allListings, locations)),
        
        
        //fetchListings: (url) => dispatch(listingsFetchData(url)),
        //fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ActionProductsSelected);