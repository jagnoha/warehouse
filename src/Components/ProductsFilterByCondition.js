import React, { Component } from 'react';
import '../App.css';
import { Form, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeFilterByCondition, changeActivePage, changeProductsSelected } from '../modules/actions';

class ProductsFilterByCondition extends Component {
    //state = {value: 'ALL'}

    handleChange = (e, {value }) => {
        console.log(value);
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        this.props.changeFilterByCondition(value);
        
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
              <label>Filter by Condition: </label>
              <Form.Field
                control={Radio}
                label='All'
                value='ALL'
                checked={this.props.filterByCondition === 'ALL'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='New'
                value='0'
                checked={this.props.filterByCondition === '0'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='New (Other)'
                value='1'
                checked={this.props.filterByCondition === '1'}
                onChange={this.handleChange}            
              />
              <Form.Field
                control={Radio}
                label='Used'  
                value='2'
                checked={this.props.filterByCondition === '2'}
                onChange={this.handleChange}          
              />
              <Form.Field
                control={Radio}
                label='Manufacturer refurbished'  
                value='3'
                checked={this.props.filterByCondition === '3'}
                onChange={this.handleChange}          
              />
              <Form.Field
                control={Radio}
                label='For parts or not working'  
                value='4'
                checked={this.props.filterByCondition === '4'}
                onChange={this.handleChange}          
              />
              <Form.Field
                control={Radio}
                label='Remanufatured'  
                value='5'
                checked={this.props.filterByCondition === '5'}
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
        filterByCondition: state.filterByCondition,
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
        changeFilterByCondition: (condition) => dispatch(changeFilterByCondition(condition)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterByCondition);