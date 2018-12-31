import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeProductsByPage, changeActivePage, changeProductsSelected } from '../modules/actions';

class ProductsByPageSelector extends Component {

    changeProductByPage = (e, {value}) => {
      this.props.changeProductsSelected([]);
      this.props.changeActivePage(1);
      this.props.changeProductsByPage(Number(value));
    }
  
    render(){
      return (
        <span>
        <Dropdown defaultValue={String(this.props.productsByPage)} value={String(this.props.productsByPage)} selection options={window.helpers.productsByPageOptions} onChange={this.changeProductByPage} />
        </span>
      )
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
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,
        activePage: state.activePage,*/
        productsByPage: state.productsByPage,      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeProductsByPage: (productsByPage) => dispatch(changeProductsByPage(productsByPage)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductsByPageSelector);