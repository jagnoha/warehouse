
import React, { Component } from 'react';
import '../App.css';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeFilterByUser, changeActivePage, changeProductsSelected } from '../modules/actions';

class ProductsFilterByUser extends Component {
    //state = {value: 'ALL'}

    handleChange = (e, {value }) => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        this.props.changeFilterByUser(value);
        
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
        const tempOptionUserList = this.props.users.map(item => {
          return {key: item.id, value: item.id, text: item.username}
        });
    
        const optionUserList = [{key: 'ALL', value: 'ALL', text: "All Users"}, ...tempOptionUserList];
    
        
        //console.log("My lista de usuarios" + optionUserList[0].text);
        
    
        return (
          <span>
              Show me products created by{' '}
              <big><Dropdown inline options={optionUserList} defaultValue={optionUserList[0].value} 
              value = {this.props.filterByUser} onChange={this.handleChange} /></big>     
       
          </span>
        )
      }


}

//export default ProductsFilterByCondition

const mapStateToProps = (state) => {
    return {
        //filterByMarketplace: state.filterByMarketplace,
        users: state.users,
        filterByUser: state.filterByUser,
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
        changeFilterByUser: (user) => dispatch(changeFilterByUser(user)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),

        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterByUser);