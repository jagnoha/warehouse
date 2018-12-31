/*export const Types = {
    SORT_PRODUCT_LIST: "SORT_PRODUCT_LIST",
    UPDATE_LISTINGS: "UPDATE_LISTINGS",
    UPDATE_FIELD_DIRECTION: "UPDATE_FIELD_DIRECTION",
    UPDATE_ASIN_LIST: "UPDATE_ASIN_LIST",
    UPDATE_LOCATIONS: "UPDATE_LOCATIONS",
    UPDATE_DASHBOARD_MESSAGES: "UPDATE_DASHBOARD_MESSAGES",
    UPDATE_EBAY_MARKETPLACES: "UPDATE_EBAY_MARKETPLACES",
    UPDATE_BRANDS: "UPDATE_BRANDS",
    ADD_PRODUCT_SELECTED: "ADD_PRODUCT_SELECTED",
    CHANGE_PARTNUMBER: "CHANGE_PARTNUMBER",
    DELETE_PRODUCT_SELECTED: "DELETE_PRODUCT_SELECTED",
    CHANGE_ACTIVE_PAGE: "CHANGE_ACTIVE_PAGE",
    CHANGE_USER_FILTER: "CHANGE_USER_FILTER",
    CHANGE_EBAY_MARKETPLACE_FILTER: "CHANGE_EBAY_MARKETPLACE_FILTER",
    CHANGE_STATUS_FILTER: "CHANGE_STATUS_FILTER",
    CHANGE_CONDITION_FILTER: "CHANGE_CONDITION_FILTER",
    UNCHECK_ALL: "UNCHECK_ALL",
    CHECK_ALL: "CHECK_ALL",
    CHANGE_VALUE_SEARCH: "CHANGE_VALUE_SEARCH",
    CHANGE_CHECKED_SEARCH: "CHANGE_CHECKED_SEARCH",
    UPDATE_LOCATION_ITEM: "UPDATE_LOCATION_ITEM",
    ADD_NEW_LOCATION: "ADD_NEW_LOCATION",
    ADD_NEW_BRAND: "ADD_NEW_BRAND",
    CHANGE_PRODUCT_BY_PAGE: "CHANGE_PRODUCT_BY_PAGE",
    CHANGE_ACTIVE_USER: "CHANGE_ACTIVE_USER",
  };*/

  //export const UPDATE_LISTINGS = "UPDATE_LISTINGS";
  
  /*export default {
      Types,
      
};*/

import axios from 'axios';
import _ from 'lodash';
import '../helpers.js';


export function locationsHasErrored(bool){
    return {
        type: 'LOCATIONS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function locationsIsLoading(bool){
    return {
        type: 'LOCATIONS_IS_LOADING',
        isLoading: bool
    };
}

export function locationsFetchDataSuccess(locations) {
    return {
        type: 'LOCATIONS_FETCH_DATA_SUCCESS',
        locations
    };
}

export function locationsFetchData(url) {
    return (dispatch) => {
        dispatch(locationsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(locationsIsLoading(false));
            
            return response.data

        })
        .then((locations) => dispatch(locationsFetchDataSuccess(locations)))
        .catch(() => dispatch(locationsHasErrored(true)));
    }
}

export function listingsHasErrored(bool){
    return {
        type: 'LISTINGS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function listingsIsLoading(bool){
    return {
        type: 'LISTINGS_IS_LOADING',
        isLoading: bool
    };
}

export function listingsFetchDataSuccess(listings, clickedColumn, order) {
    return {
        type: 'LISTINGS_FETCH_DATA_SUCCESS',
        listings: _.orderBy(listings, (item => {
            if (clickedColumn === 'price'){  
                return parseFloat(item[clickedColumn]);
            } else {
                return item[clickedColumn];
            }
        }),[order])
    };
}

export function sortListings(listings, clickedColumn, order) {
    
    let newListings = _.orderBy(listings, (item => {
        if (clickedColumn === 'price'){  
            return parseFloat(item[clickedColumn]);
        } else {
            return item[clickedColumn];
        }
    }),[order])
    
    return {
        type: 'SORT_LISTINGS',
        listings: newListings
    };
}

/*export function filterListings(listings, condition) {
    
    
    let newListings = [];

    if (condition !== 'ALL'){
        newListings = listings.filter(item => item.condition === condition)
      } else {
        newListings = return list;
      }
    }



    
    return {
        type: 'FILTER_LISTINGS',
        listings: newListings
    };
}*/

export function changeFilterByCondition(condition) {
    return {
        type: 'FILTER_BY_CONDITION',
        filterByCondition: condition,
    };
}

export function changeFilterByStatus(status) {
    return {
        type: 'FILTER_BY_STATUS',
        filterByStatus: status,
    };
}

export function changeFilterByMarketplace(marketplace) {
    return {
        type: 'FILTER_BY_MARKETPLACE',
        filterByMarketplace: marketplace,
    };
}

export function changeFilterByUser(user) {
    return {
        type: 'FILTER_BY_USER',
        filterByUser: user,
    };
}


export function listingsFetchData(url, clickedColumn, order) {
    return (dispatch) => {
        dispatch(listingsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(listingsIsLoading(false));
            
            return response.data

        })
        .then((listings) => dispatch(listingsFetchDataSuccess(listings, clickedColumn, order)))
        .catch(() => dispatch(listingsHasErrored(true)));
    }
}

export function brandsHasErrored(bool){
    return {
        type: 'BRANDS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function brandsIsLoading(bool){
    return {
        type: 'BRANDS_IS_LOADING',
        isLoading: bool
    };
}

export function brandsFetchDataSuccess(brands) {
    return {
        type: 'BRANDS_FETCH_DATA_SUCCESS',
        brands
    };
}

export function brandsFetchData(url) {
    return (dispatch) => {
        dispatch(brandsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(brandsIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(brandsFetchDataSuccess(brands)))
        .catch(() => dispatch(brandsHasErrored(true)));
    }
}

export function ebayMarketplacesHasErrored(bool){
    return {
        type: 'EBAY_MARKETPLACES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function ebayMarketplacesIsLoading(bool){
    return {
        type: 'EBAY_MARKETPLACES_IS_LOADING',
        isLoading: bool
    };
}

export function ebayMarketplacesFetchDataSuccess(ebayMarketplaces) {
    return {
        type: 'EBAY_MARKETPLACES_FETCH_DATA_SUCCESS',
        ebayMarketplaces
    };
}

export function ebayMarketplacesFetchData(url) {
    return (dispatch) => {
        dispatch(ebayMarketplacesIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(ebayMarketplacesIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(ebayMarketplacesFetchDataSuccess(brands)))
        .catch(() => dispatch(ebayMarketplacesHasErrored(true)));
    }
}

export function changeActivePage(activePage){
    return {
        type: 'CHANGE_ACTIVE_PAGE',
        activePage
    };
}

export function changeProductsByPage(productsByPage){
    
       return {
            type: 'CHANGE_PRODUCTS_BY_PAGE',
            productsByPage
       };
    
}

export function clickOnColumn(clickedColumn){
    
    return {
         type: 'CLICK_ON_COLUMN',
         clickedColumn
    }; 
}

export function changeDirection(direction){
    
    return {
         type: 'CHANGE_DIRECTION',
         direction: direction === 'ascending' ? 'descending' : 'ascending', 
    }; 
}

export function changeFilterBySearch(valueSearch){
    
    return {
         type: 'FILTER_BY_SEARCH',
         filterBySearch: valueSearch,
    }; 
}

export function changeSearchIsChecked(bool){
    
    return {
         type: 'SEARCH_IS_CHECKED',
         searchIsChecked: bool,
    }; 
}

export function changeListingsFiltered(quantity){
    
    return {
         type: 'LISTINGS_FILTERED',
         listingsFiltered: quantity,
    }; 
}

export function changeProductsSelected(list){
    
    return {
         type: 'PRODUCTS_SELECTED',
         productsSelected: list,
    }; 
}

export function changeProductsInPage(list){
    
    return {
         type: 'PRODUCTS_IN_PAGE',
         productsInPage: list,
    }; 
}

export function changePicturesHasErrored(list){
    return {
        type: 'PICTURES_HAS_ERRORED',
        picturesHasErrored: list
    };
}

export function changePicturesIsLoading(list){
    return {
        type: 'PICTURES_IS_LOADING',
        picturesIsLoading: list,
    };
}

export function fixPicturesListing(list, allListings) {
    
    return (dispatch) => {

    let loadingList = list;
    let errorList = [];

    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }

    for (const item of loadingList){

        let sku = window.helpers.getListingFromId(allListings, item).sku;
        console.log(sku);
        
        let url = "http://192.168.1.11:8083/fixpictures/" + sku; 
        
        axios.get(url, config)
        .then(response => {
            
            for (const itemList of allListings){
                if (itemList.uuid === item){
                    itemList.pictures = 'PENDING';
                    break;
                }
            }
            console.log(response);

            let tempLoadingList = loadingList.filter(itemLoading => itemLoading !== item);
            loadingList = tempLoadingList.map(item => item);

            
            
            dispatch(changePicturesIsLoading(loadingList));        
        
        })
    }

    }

    


    
    /*return (dispatch) => {
        dispatch(ebayMarketplacesIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(ebayMarketplacesIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(ebayMarketplacesFetchDataSuccess(brands)))
        .catch(() => dispatch(ebayMarketplacesHasErrored(true)));
    }*/


}





