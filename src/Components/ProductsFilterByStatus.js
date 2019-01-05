import React, { Component } from 'react';
import '../App.css';
import { Form, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeFilterByStatus, changeActivePage, changeProductsSelected } from '../modules/actions';

class ProductsFilterByStatus extends Component {
    //state = {value: 'ALL'}

    handleChange = (e, {value }) => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        this.props.changeFilterByStatus(value);
        
        /*store.dispatch(
          {
            type: 'CHANGE_CONDITION_FILTER',
            conditionsFilterActive: value,
          })
        */
         //this.setState({value})
      
    }

    render(){
        return (
          
          <Form floated='left'>
            <Form.Group inline>
              <label>Filter by Status: </label>
              <Form.Field
                control={Radio}
                label='All'
                value='ALL'
                checked={this.props.filterByStatus === 'ALL'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Online'
                value='online'
                checked={this.props.filterByStatus === 'online'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Out of Stock'
                value='outofstock'
                checked={this.props.filterByStatus === 'outofstock'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Draft'
                value='draft'
                checked={this.props.filterByStatus === 'draft'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Pending to Shelf'
                value='pendingtoshelf'
                checked={this.props.filterByStatus === 'pendingtoshelf'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Error'  
                value='error'
                checked={this.props.filterByStatus === 'error'}
                onChange={this.handleChange}          
              />              
              
            </Form.Group>
          </Form>      
        )
      }


}

//export default ProductsFilterByCondition

const mapStateToProps = (state) => {
    return {
        filterByStatus: state.filterByStatus,
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
        changeFilterByStatus: (status) => dispatch(changeFilterByStatus(status)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterByStatus);