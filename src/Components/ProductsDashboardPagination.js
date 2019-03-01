import React, { Component } from 'react';
import '../App.css';
import { Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeActivePage, changeProductsSelected } from '../modules/actions';
import ProductsByPageSelector from './ProductsByPageSelector';



class ProductsDashboardPagination extends Component {
  
  handlePaginationChange = (e, { activePage } ) => {
    //console.log(activePage);
    /*this.props.store.dispatch({
      type: 'CHANGE_ACTIVE_PAGE',
      activePage: activePage,
    });*/
    this.props.changeProductsSelected([]);
    this.props.changeActivePage(activePage);
    
  }

  render () {
    
    const searchIsChecked = this.props.searchIsChecked;

    function checkConditionsFilterActive(list, conditionsFilterActive){
      if (conditionsFilterActive !== 'ALL'){
        return list.filter(item => item.condition === conditionsFilterActive)
      } else {
        return list;
      }
    }
    function checkStatusFilterActive(list, statusFilterActive){
      /*if (statusFilterActive !== 'ALL'){
        return list.filter(item => item.status === statusFilterActive)
      } else {
        return list;
      }*/
      if (statusFilterActive === 'online'){
        return list.filter(item => item.status === 'online')
      } else if (statusFilterActive === 'outofstock'){
        return list.filter(item => item.status === 'offline' && item.quantity === 0)
      } else if (statusFilterActive === 'draft'){
        return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0)
      } else if (statusFilterActive === 'readytoupload'){
        return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && item.price && item.location.length > 0 )
      } else if (statusFilterActive === 'goodtorevise'){
        return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && !item.price && item.location.length > 0 )
      } else if (statusFilterActive === 'toshelf'){
        return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && item.location.length === 0 )            }
      else if (statusFilterActive === 'error'){
        return list.filter(item => item.status === 'error')
      } else {
        return list;
      }
    

    }

    function checkEbayMarketplacesFilterActive(list, ebayMarketplacesFilterActive){
      if (ebayMarketplacesFilterActive !== 'ALL'){
        return list.filter(item => item.ebayAccount === ebayMarketplacesFilterActive)
      } else {
        return list;
      }
    }

    function checkUsersFilterActive(list, usersFilterActive){
      if (usersFilterActive !== 'ALL'){
        return list.filter(item => item.authorId === usersFilterActive)
      } else {
        return list;
      }
    }

    function checkSearchFilter(list, valueSearch){
            
      if (valueSearch === ''){
          return list;
      }
      
      if (searchIsChecked === true && list.length > 0){
        return list.filter(item => item.title.toLowerCase().includes(valueSearch.toLowerCase()) || 
        item.partNumbers[0].toLowerCase().includes(valueSearch.toLowerCase()) ||
        item.sku.toLowerCase().includes(valueSearch.toLowerCase()))
      } else {
        return list;
      }
      
      
    }

  const listingsFiltered = checkSearchFilter(checkUsersFilterActive(checkEbayMarketplacesFilterActive(checkStatusFilterActive(checkConditionsFilterActive(this.props.listings, this.props.filterByCondition), this.props.filterByStatus), this.props.filterByMarketplace), this.props.filterByUser),this.props.filterBySearch);
  
    //const totalPages = this.props.listings.chunk(this.props.productsByPage).length;
    const totalPages = listingsFiltered.chunk(this.props.productsByPage).length;

    return (
      <div className='App'>
        <Pagination 
          activePage={this.props.activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
        />
        <ProductsByPageSelector />
        
          
      </div>
    )
  }
}

//export default ProductsDashboardPagination

const mapStateToProps = (state) => {
  return {
      /*locations: state.locations,
      hasErroredLocations: state.locationsHasErrored,
      isLoadingLocations: state.locationsIsLoading,*/
      listings: state.listings,
      filterByCondition: state.filterByCondition,
      filterByStatus: state.filterByStatus,
      filterByMarketplace: state.filterByMarketplace,
      filterByUser: state.filterByUser,
      filterBySearch: state.filterBySearch,
      searchIsChecked: state.searchIsChecked,/*
      hasErroredListings: state.listingsHasErrored,
      isLoadingListings: state.listingsIsLoading,
      brands: state.brands,
      hasErroredBrands: state.brandsHasErrored,
      isLoadingBrands: state.brandsIsLoading,
      conditions: state.conditions,
      users: state.users,
      ebayMarketplaces: state.ebayMarketplaces,*/
      productsByPage: state.productsByPage,
      activePage: state.activePage,      
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
      changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDashboardPagination);
   