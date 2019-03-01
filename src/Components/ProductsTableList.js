import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import '../helpers.js'
import { connect } from 'react-redux';
import {Dimmer, Loader, Message, Table} from 'semantic-ui-react';
import { changeListingsFiltered, changeProductsInPage  } from '../modules/actions';



class ProductsTableList extends Component {    
    
    render(){
        
        const searchIsChecked = this.props.searchIsChecked;
        /*const activePage = this.props.activePage;
        const productsByPage = this.props.productsByPage;*/
        
        
        function checkConditionsFilterActive(list, conditionsFilterActive){
            if (conditionsFilterActive !== 'ALL'){
              return list.filter(item => item.condition === conditionsFilterActive)
            } else {
              return list;
            }
        }

        function checkStatusFilterActive(list, statusFilterActive){
            
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

          
          /*
          
          if (statusFilterActive !== 'ALL'){
              return list.filter(item => item.status === statusFilterActive)
            } else {
              return list;
            }
          }*/

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

        const listingsFilteredResult = checkSearchFilter(checkUsersFilterActive(checkEbayMarketplacesFilterActive(checkStatusFilterActive(checkConditionsFilterActive(this.props.listings,this.props.filterByCondition), this.props.filterByStatus), this.props.filterByMarketplace), this.props.filterByUser),this.props.filterBySearch);
        
        this.props.changeListingsFiltered(listingsFilteredResult.length);

        /*const array1 = listingsFilteredResult.chunk(this.props.productsByPage)[Number(this.props.activePage)-1];
        
        if (array1 !== undefined){
            this.props.changeProductsInPage(array1);
        } */   
        

        //const listingsInPage = listingsFilteredResult.chunk(productsByPage)[Number(activePage)-1];
        
        
        //console.log(listingsInPage);
        
        
        //console.log(listingsInPage);
        
        //console.log(listingsFiltered.length);
        /*const productsByPage = this.props.productsByPage;
        const activePage = this.props.activePage;
        let list1 = listingsFiltered.chunk(productsByPage)[Number(activePage)-1].map(item => item.uuid);
        this.props.changeProductsInPage(listingsFiltered.chunk(productsByPage)[Number(activePage)-1].map(item => item.uuid));
        console.log(list1);*/
        
        
        //changeProductsInPage(listingsFiltered.chunk(this.props.productsByPage)[Number(this.props.activePage)-1].map(item => item.uuid));
        
        if (this.props.listings.length < 1 || this.props.userActiveIsLoading === true){
            return (
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            )
        }

        if (listingsFilteredResult.length < 1){
            return (
                <Table.Row>
              <Table.Cell collapsing>
                
              </Table.Cell>
              
              <Table.Cell>
              </Table.Cell>
              <Table.Cell>
              </Table.Cell>
              <Table.Cell>
                </Table.Cell>
              
              <Table.Cell>
              </Table.Cell>
              <Table.Cell>



              </Table.Cell>
              <Table.Cell>
              <Message
                    warning
                    header='Sorry, this option has not generated any results!'
                    content='Try again using different parameters'
                />
              </Table.Cell>
                


              <Table.Cell>
              </Table.Cell>
              <Table.Cell>                
              </Table.Cell>
              <Table.Cell>
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
              </Table.Cell>              
        </Table.Row>
            )
        }

        
        return (
            
            
            //this.props.listings.chunk(this.props.productsByPage)[Number(this.props.activePage)-1].map(item => 
            listingsFilteredResult.chunk(this.props.productsByPage)[Number(this.props.activePage)-1].map(item => { 
            //console.log(item.uuid);
            //this.props.addProductsInPage(productsInPage, item.uuid);



            
        

            return (
            <Product 
                key={item.uuid}
                item = {item} 
                locationsItem = { item.location.map(itemLocation => window.helpers.getLocationFromId(this.props.locations, itemLocation)) } 
                brandItem = { window.helpers.getBrandFromId(this.props.brands, item.brand) }
                
                userListItem = { window.helpers.getNameFromId(this.props.users, item.authorId) }
                //userListItem = {item.authorId}
                
                //conditionItem = {window.helpers.getConditionFromId(this.props.conditions, item.condition)}
                ebayMarketplaceItem = {window.helpers.getEbayMarketplaceFromId(this.props.ebayMarketplaces, item.ebayAccount)}
                
            /> 

        )}
           
           )
        )
        
    }
}



const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,
        listings: state.listings,
        listingsFiltered: state.listingsFiltered,
        filterByCondition: state.filterByCondition,
        filterByStatus: state.filterByStatus,
        filterByMarketplace: state.filterByMarketplace,
        filterByUser: state.filterByUser,
        filterBySearch: state.filterBySearch,
        searchIsChecked: state.searchIsChecked,
        hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,
        activePage: state.activePage,
        productsByPage: state.productsByPage,
        productsInPage: state.productsInPage,
        userActiveIsLoading: state.userActiveIsLoading,      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
        changeListingsFiltered: (quantity) => dispatch(changeListingsFiltered(quantity)),
        changeProductsInPage: (list) => dispatch(changeProductsInPage(list)),
        
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTableList);