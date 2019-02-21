import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';

import ProductsDashboard from './ProductsDashboard';
import { connect } from 'react-redux';

  
class Listings extends Component {
    
    

    render(){
      //const productsByPage = 5;
      //const productsListGrouped = this.props.listings.slice(0,20).chunk(productsByPage);
     
      return (
        <div>
              <Segment>
                <h2>Listings Manager</h2>
              </Segment>
            <ProductsDashboard
                /*listings = {this.props.listings.slice(0,20)}
                locationsList = {this.props.locations}
                brandsList = {this.props.brands}
                usersList = {this.props.users}
                conditionsList = {this.props.conditions}
                ebayMarketplacesList = {this.props.ebayMarketplaces}
                productsListGrouped = {productsListGrouped}
                productsByPage = {productsByPage}
                activePage = {1}*/
            />
        </div>
      )
      /*return (
        <div>
          <ProductsDashboard
            //store = {store} 
            listings = {this.props.listings.slice(0,20)}
            locationsList = {this.props.locations}
            brandsList = {this.props.brands}
            usersList = {store.usersList}
            conditionsList = {store.conditionsList}
            ebayMarketplacesList = {store.rawEbayMarketplaces}
            productsListGrouped = {productsListGrouped}
            productsByPage = {store.productsByPage}
            activePage = {store.activePage}
          />      

        </div>
      )*/
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,
        listings: state.listings,
        hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,      
    };
  };
  
  /*const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };*/

export default connect(mapStateToProps)(Listings);
//export default Listings;