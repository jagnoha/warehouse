
import React, { Component } from 'react';
import '../App.css';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeFilterByMarketplace, changeActivePage, changeProductsSelected } from '../modules/actions';

class ProductsFilterByMarketplace extends Component {
    //state = {value: 'ALL'}

    handleChange = (e, {value }) => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        this.props.changeFilterByMarketplace(value);
        
        /*store.dispatch(
          {
            type: 'CHANGE_CONDITION_FILTER',
            conditionsFilterActive: value,
          })
        */
         //this.setState({value})
      
    }

    render(){
        //const { value } = this.state;
        const tempOptionEbayMarketplacesList = this.props.ebayMarketplaces.map(item => {
          return {key: item.id, value: item.id, text: item.ebayUserId}
        });
    
        const optionEbayMarketplacesList = [{key: 'ALL', value: 'ALL', text: "All Ebay marketplaces"}, ...tempOptionEbayMarketplacesList];
    
        
        //console.log("My lista de usuarios" + optionUserList[0].text);
        
    
        return (
          <span>
              Show me {' '}
              <big><Dropdown inline options={optionEbayMarketplacesList} defaultValue={optionEbayMarketplacesList[0].value} 
              value = {this.props.filterByMarketplace} onChange={this.handleChange} /></big>     
       
          </span>
        )
      }


}

//export default ProductsFilterByCondition

const mapStateToProps = (state) => {
    return {
        filterByMarketplace: state.filterByMarketplace,
        ebayMarketplaces: state.ebayMarketplaces,
        /*locations: state.locations,
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
        activePage: state.activePage,
        productsByPage: state.productsByPage,*/      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeFilterByMarketplace: (marketplace) => dispatch(changeFilterByMarketplace(marketplace)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterByMarketplace);