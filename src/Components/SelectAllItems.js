import React, {Component} from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { changeProductsSelected } from '../modules/actions';
import '../helpers.js';

class SelectAllItems extends Component {

    state = {
        listingsInPage: this.props.productsByPage,
    }

    toggle = (e,data) => {
        
        const searchIsChecked = this.props.searchIsChecked;

        function checkConditionsFilterActive(list, conditionsFilterActive){
            if (conditionsFilterActive !== 'ALL'){
              return list.filter(item => item.condition === conditionsFilterActive)
            } else {
              return list;
            }
        }

        /*function checkStatusFilterActive(list, statusFilterActive){
            if (statusFilterActive !== 'ALL'){
              return list.filter(item => item.status === statusFilterActive)
            } else {
              return list;
            }
          }*/

          function checkStatusFilterActive(list, statusFilterActive){
            /*if (statusFilterActive !== 'ALL'){
              return list.filter(item => item.status === statusFilterActive)
            } else {
              return list;
            }*/
            if (statusFilterActive === 'online'){
              return list.filter(item => item.status === "online")
            } else if (statusFilterActive === 'draft'){
              return list.filter(item => item.status === "offline" && item.price === "")
            } else if (statusFilterActive === 'outofstock'){
              return list.filter(item => item.status === "offline" && item.quantity === 0)
            } else if (statusFilterActive === 'readytoupload'){
              return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && item.price && item.location.length > 0 )
            } else if (statusFilterActive === 'goodtorevise'){
              return list.filter(item => item.status === 'offline' && Number(item.quantity) > 0 && !item.price && item.location.length > 0 )
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


          

      
        if (data.checked === true){ //|| this.props.productsListGrouped.length < 1){
          console.log("CHECKED");
          const listingsFilteredResult = checkSearchFilter(checkUsersFilterActive(checkEbayMarketplacesFilterActive(checkStatusFilterActive(checkConditionsFilterActive(this.props.listings,this.props.filterByCondition), this.props.filterByStatus), this.props.filterByMarketplace), this.props.filterByUser),this.props.filterBySearch);
        
          const listingsInPage = listingsFilteredResult.chunk(this.props.productsByPage)[Number(this.props.activePage)-1];
          this.setState({listingsInPage: listingsInPage.length})
          //console.log(listingsInPage);

          this.props.changeProductsSelected(listingsInPage.map(item => item.uuid));
          
          //const listChecked = this.props.listingsFiltered.chunk(this.props.productsByPage)[Number(this.props.activePage)-1].map(item => item.uuid);
          //this.props.changeProductsSelected(listChecked);

        } else {
            this.props.changeProductsSelected([]);
        }
      }
      

     

      
    
      render(){
        
        const productsSelected = this.props.productsSelected;
        const productsByPage = this.props.productsByPage;
        const listingsInPage = this.state.listingsInPage;

        function isChecked(){
            
            if (productsSelected.length === listingsInPage){
            
            return true;
            
            }
        
            return false;
        
        }

        const isCheckedValue = isChecked();
        
        //console.log("AQUI ESTA LA INFORMACION BUENA: " + this.props.productsListGrouped[this.props.activePage-1].map(item => item.uuid));
    
        return (
                
          <Table.HeaderCell collapsing>
                    <Checkbox toggle 
                    checked = {isCheckedValue}
                      //checked={this.props.productsSelected.length === this.props.productsByPage.length ? false : true}
                      onClick={this.toggle}  > /></Checkbox>
          </Table.HeaderCell>
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
        
        //fetchListings: (url) => dispatch(listingsFetchData(url)),
        //fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllItems);