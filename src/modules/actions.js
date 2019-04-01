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
const uuidv4 = require('uuid/v4');

const urlbase = 'https://29508158.ngrok.io';

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

export function listingsUpdate(listings){
    return {
        type: 'LISTINGS_UPDATE',
        listings
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


//************************************* */

export function userActiveLogout() {
    return (dispatch) => {
        dispatch({type: 'RESET'})
    }
}

export function userActiveHasErrored(bool){
    return {
        type: 'USER_ACTIVE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function userActiveIsLoading(bool){
    return {
        type: 'USER_ACTIVE_IS_LOADING',
        isLoading: bool
    };
}

export function userActiveFetchDataSuccess(userActive) {
    return {
        type: 'USER_ACTIVE_FETCH_DATA_SUCCESS',
        userActive
    };
}

export function userActiveFetchData(url) {
    return (dispatch) => {
        dispatch(userActiveIsLoading(true));

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

            dispatch(userActiveIsLoading(false));
            
            return response.data

        })
        .then((userActive) => dispatch(userActiveFetchDataSuccess(userActive)))
        .catch(() => dispatch(userActiveHasErrored(true)));
    }
}


//***************************************** */

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

function requestAmazonListingUPC(sku){
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
    axios.get(urlbase + '/addrequestamazonlistingupc/c7104e07-ed84-4a6c-b57b-1f333b197401/'+sku, config)
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log("error"));       
    
}

function requestAmazonListing(asin, sku){
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
    axios.get(urlbase + '/addrequestamazonlisting/c7104e07-ed84-4a6c-b57b-1f333b197401/'+asin+'/'+sku, config)
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log("error"));       
    
}

export function getAmazonAsinListAutoparts(sku, partNumbers, brand, brandList, allListings) {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }

    let listingBrand = brandList.filter((item) => item.id === brand)[0].value;
    let listingPartNumber = partNumbers;

    let query = listingBrand + ' ' + listingPartNumber;
    
    axios.get(urlbase + '/getamazonasinlistbyquery/c7104e07-ed84-4a6c-b57b-1f333b197401/'+query, config)
    .then(response => {
        
        //console.log(response.data);
        console.log("Brand: " + brand + " | PartNumber: " + partNumbers);
        console.log(query);
        //console.log(response);

        if (response.data){

        //let listingBrand = brandList.filter((item) => item.id === brand)[0].value;

        console.log(response.data);
      
        let listFiltered = response.data.filter(item => {
            
          try{  
                return item.AttributeSets.ItemAttributes.Brand.toUpperCase().includes(listingBrand.toUpperCase()) && (
                //item.AttributeSets.ItemAttributes.Brand.toUpperCase() === listingBrand.toUpperCase() &&
                item.AttributeSets.ItemAttributes.PartNumber.toUpperCase() === listingPartNumber.toUpperCase() || 
                item.AttributeSets.ItemAttributes.Title.toUpperCase().includes(listingPartNumber.toUpperCase()) )
            } catch(error){
                return item.AttributeSets.ItemAttributes.Title.toUpperCase().includes(listingPartNumber.toUpperCase()) &&
                item.AttributeSets.ItemAttributes.Title.toUpperCase().includes(listingBrand.toUpperCase())
            }
        
        
        })

        if (listFiltered.length > 0){
            console.log('>>>>>>>> ASIN: ' + listFiltered[0].Identifiers.MarketplaceASIN.ASIN);
            console.log('>>>>>>>> SKU:' + sku);
            console.log('>>>>>>>> Listing Brand: ' + listingBrand);
            console.log('>>>>>>>> Amazon Brand: '+ listFiltered[0].AttributeSets.ItemAttributes.Brand);
            
            let tempListing = allListings.filter(item => item.sku === sku);
            let tempAllListings = allListings.filter(item => item.sku !== sku);

            tempListing[0]['asin'] = 'pending';
            
            let newAllListings = tempAllListings.concat(tempListing);

            listingsUpdate(newAllListings);
            requestAmazonListing(listFiltered[0].Identifiers.MarketplaceASIN.ASIN, sku);
        
        /*} else {

            let tempListing = allListings.filter(item => item.sku === sku);
            let tempAllListings = allListings.filter(item => item.sku !== sku);

            tempListing[0]['asin'] = '';
            
            let newAllListings = tempAllListings.concat(tempListing);

            listingsUpdate(newAllListings);
         
          }*/


        } else {

            let tempListing = allListings.filter(item => item.sku === sku);
            let tempAllListings = allListings.filter(item => item.sku !== sku);

            tempListing[0]['asin'] = 'pending';
            
            let newAllListings = tempAllListings.concat(tempListing);

            listingsUpdate(newAllListings);
            requestAmazonListingUPC(sku);

          }



        }
    
    
    })
    .catch(error => {
        console.log(error);
        let tempListing = allListings.filter(item => item.sku === sku);
        let tempAllListings = allListings.filter(item => item.sku !== sku);

        tempListing[0]['asin'] = '';
            
        let newAllListings = tempAllListings.concat(tempListing);

        listingsUpdate(newAllListings);
        //requestAmazonListingUPC(sku);
    });
}

export function publishAmazonBulk(list, allListings, brandList) {
    
    return (dispatch) => {

    let loadingList = list;

    console.log(loadingList);
    //let errorList = [];

    /*let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }*/

    for (const item of loadingList){
            
        let listingInfo = allListings.filter(listing => {
            return listing.uuid === item
        })

        console.log(listingInfo[0]);

        console.log(item);
        
        if (!listingInfo[0].asin &&
            Number(listingInfo[0].condition) < 2 && listingInfo[0].status === 'online' && !listingInfo[0].title.toUpperCase().includes('LOT OF') && 
            !listingInfo[0].title.toUpperCase().includes('*')
        ){
             /*setTimeout(await getAmazonAsinListAutoparts(
            listingInfo[0].sku, listingInfo[0].partNumbers[0], listingInfo[0].brand, brandList)
            ,3000)*/

            //setTimeout(await dispatch(getAmazonAsinListAutoparts(listingInfo[0].sku, listingInfo[0].partNumbers[0], listingInfo[0].brand, brandList )), 3000)
        
            //dispatch(getAmazonAsinListAutoparts(listingInfo[0].sku, listingInfo[0].partNumbers[0], listingInfo[0].brand, brandList ))
            
            console.log("RUNNING GETAMAZON ASIN LIST AUTOPARTS");
            getAmazonAsinListAutoparts(listingInfo[0].sku, listingInfo[0].partNumbers[0], listingInfo[0].brand, brandList, allListings )
        }
    
    }
    /*for (const item of loadingList){

        let sku = window.helpers.getListingFromId(allListings, item).sku;
        console.log(sku);
        
        let url = urlbase+"/fixpictures/" + sku; 
        
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
    }*/

    


  }

}

export function uploadEbayBulk(list, allListings, locations) {
    
    return (dispatch) => {

    let loadingList = list;

    let tempListings = allListings;

    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }

    let subListings = tempListings.filter(item => !loadingList.includes(item.sku));
    let subList = tempListings.filter(item => loadingList.includes(item.sku));
    let changeSubList = subList.map(item => {
        return {...item, status: 'online'}
    })

    let totalListings = subListings.concat(changeSubList);

    dispatch(listingsUpdate(totalListings));

    for (const item of loadingList){
    //loadingList.forEach(item => {
        

        console.log(item);

        let itemInfo = tempListings.filter(itemList => itemList.sku === item)[0];
        
        try {
        
        itemInfo = {...itemInfo, ['locationValues']: itemInfo.location.map(itemLocation => window.helpers.getLocationFromId(locations, itemLocation))}


        /*listingCreateEbay(urlbase + '/updatedraftlisting/' + itemInfo.sku + '/' + 
        encodeURIComponent(JSON.stringify(itemInfo)), 
        
        urlbase + '/createlistingebay/' + itemInfo.sku + '/' + 
        encodeURIComponent(JSON.stringify(itemInfo)), itemInfo, tempListings);*/

        /*simpleListingCreateEbay(urlbase + '/createlistingebay/' + itemInfo.sku + '/' + 
        encodeURIComponent(JSON.stringify(itemInfo)), tempListings);*/


        if (!itemInfo.itemId) {
        
        axios.get(urlbase + '/createlistingebay/' + itemInfo.sku + '/' + 
        encodeURIComponent(JSON.stringify(itemInfo)), config)
        .then(response => {
                        
            console.log(response);
        
        })

        } else {
            axios.get(urlbase + '/relist/' + itemInfo.sku + '/' + 
            encodeURIComponent(JSON.stringify(itemInfo)), config)
            .then(response => {
                        
            console.log(response);
        
            })
        }

    } catch(error){
        console.log(error);
    }


        
    }

  }

}


/*function getPicturesInformation(results, sku, allListings){
    //console.log(results);
    const listing = results.Item;
    //const itemId = listing.ItemID;
  
    const picturesTemp = listing.PictureDetails.PictureURL;
    console.log(picturesTemp);
  
    let otherPictures = [];
  
    if (typeof picturesTemp === 'object'){
      
          otherPictures = picturesTemp.map((item) => {
              return {ebayUrl: item.replace('$_1', '$_10'), id: uuidv4()}
    })
    } else {
          try {
              otherPictures = [{ebayUrl: picturesTemp.replace('$_1', '$_10'), id: uuidv4()}];
          } catch(error){
              otherPictures = [];
          }
    }
  
  
    const pictures = otherPictures;
  
    let tempListing = allListings.filter(item => item.sku === sku);
    let tempAllListings = allListings.filter(item => item.sku !== sku);

    tempListing[0]['pictures'] = pictures;
            
    let newAllListings = tempAllListings.concat(tempListing);

    listingsUpdate(newAllListings);

    /*pictures.forEach( (item) => {
      let fileName = item.id;
      downloadPicture(item.ebayUrl, './pictures', fileName);
      }
    );*/
  
    /*Listing.updateOne({"sku": sku}, 
    {
        "pictures": pictures.map(item => item.id),
    }, function(err, raw){
      if (err) throw Error("Network Error!");
      console.log(raw);
    });
  
}*/

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
        
        let url = urlbase+"/fixpictures/" + sku; 
        
        axios.get(url, config)
        .then(response => {
            
            for (const itemList of allListings){
                if (itemList.uuid === item){
                    
                    itemList.pictures = 'PENDING';
                    
                    //getPicturesInformation(response, itemList.sku, allListings);
                    
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

}

export function brandAddDatabase(url, id, value) {
    return (dispatch) => {
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(addNewBrand({id, value}));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}


export function addNewBrand(newBrand) {
    return {
        type: 'ADD_NEW_BRAND',
        newBrand
    };
}

export function locationAddDatabase(url, id, value) {
    return (dispatch) => {
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(addNewLocation({id, value}));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}


export function addNewLocation(newLocation) {
    return {
        type: 'ADD_NEW_LOCATION',
        newLocation
    };
}

export function listingDraftUpdated(listingDraft) {
    return {
        type: 'LISTING_DRAFT_UPDATED',
        listingDraft
    };
}

export function listingDraftHasErrored(bool){
    return {
        type: 'LISTING_DRAFT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function listingDraftIsLoading(bool){
    return {
        type: 'LISTING_DRAFT_IS_LOADING',
        isLoading: bool
    };
}

export function listingDraftDeleteDatabase(url, listings) {
    return (dispatch) => {
    dispatch(listingDraftIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));

        dispatch(listingsUpdate(listings));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function listingDraftUpdateDatabase(url, listingDraft, listings) {
    return (dispatch) => {
    dispatch(listingDraftIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));
        dispatch(listingsUpdate(listings));
        dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function listingDeleteDatabase(url, listings) {
    return (dispatch) => {
    dispatch(listingDraftIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));

        dispatch(listingsUpdate(listings));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function listingUpdateDatabase(url, listingDraft, listings) {
    return (dispatch) => {
    dispatch(listingDraftIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));
        dispatch(listingsUpdate(listings));
        dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function simpleListingCreateEbay(urlCreate, listings) {
    return (dispatch) => {
    //dispatch(listingUpdateDatabase(urlUpdate, listingDraft))    
    fetch(urlCreate,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingsUpdate(listings));
        //dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function listingCreateEbay(urlUpdate, urlCreate, listingDraft, listings) {
    return (dispatch) => {
    dispatch(listingUpdateDatabase(urlUpdate, listingDraft))    
    fetch(urlCreate,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));
        dispatch(listingsUpdate(listings));
        //dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function listingRelistEbay(urlUpdate, urlRelist, listingDraft, listings) {
    return (dispatch) => {
    dispatch(listingUpdateDatabase(urlUpdate, listingDraft))    
    fetch(urlRelist,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));
        dispatch(listingsUpdate(listings));
        //dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}

export function locationsUpdate(locations){
    return {
        type: 'LOCATIONS_UPDATE',
        locations
    };
}

export function locationUpdateDatabase(url, locations) {
    return (dispatch) => {
    dispatch(locationsIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(locationsIsLoading(false));
        dispatch(locationsUpdate(locations));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}



/*export function ebayOrdersHasErrored(bool){
    return {
        type: 'EBAY_ORDERS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function ebayOrdersIsLoading(bool){
    return {
        type: 'EBAY_ORDERS_IS_LOADING',
        isLoading: bool
    };
}*/

export function ebayOrdersFetchDataSuccess(ebayOrders) {
    return {
        type: 'EBAY_ORDERS_FETCH_DATA_SUCCESS',
        ebayOrders
    };
}

/*export function ebayOrdersCreateLabels(ebayOrders) {
    return (dispatch)
}*/

export function ebayOrdersIsLoading(list){
    return {
        type: 'EBAY_ORDERS_IS_LOADING',
        ebayOrdersIsLoading: list,
    };
}

export function fileNameEbayPdf(list){
    return {
        type: 'FILE_NAME_EBAY_PDF',
        fileNameEbayPdf: list,
    };
}

/*export function createEbayLabels(ebayAccount, ebayOrders) {
    return (dispatch) => {
        let listOld
    }
}*/




export function ebayOrdersFetchData(ebayAccounts, oldEbayOrders, ebayPdfFilesOld) {
    return (dispatch) => {
        /*let listOld = listLoading;
        let list = listLoading;
        list = list.concat(ebayAccount);
        */
        
       dispatch(ebayOrdersIsLoading(true));
        
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }

        //async (ebayAccounts) => {        

        //for (const item of ebayAccounts){

       function callback () { dispatch(ebayOrdersIsLoading(false)) }
       
       let itemsProcessed = 0;
       let ebayOrdersFinal = [];
       let tempEbayPDFFinal = [];
       
        try{
        ebayAccounts.forEach((item, index, array)=>{
            
            //dispatch(ebayOrdersIsLoading(true));
            let ebayAccount = item.id;


            axios.get(urlbase + "/getorders/" + ebayAccount + "/1", config)
            .then(response => {
                
                if (response.statusText !== "OK"){
                    throw Error(response.statusText);
                }
    
                //dispatch(ebayOrdersIsLoading(listOld));
                dispatch(ebayOrdersIsLoading(true));
                return response.data
    
            })
            .then((ebayOrders) => 
               
                {
                    console.log(ebayOrders.orders);
    
                    //let tempEbayOrders = oldEbayOrders.filter(item => item.ebayMarketplace !== ebayAccount);
    
                    ebayOrdersFinal = ebayOrdersFinal.concat({ebayMarketplace: ebayAccount, orders: ebayOrders.orders})
    
                    
                    
                    //dispatch(ebayOrdersFetchDataSuccess(ebayOrdersFinal))
    
                    
                    
                    
                    let fileName = uuidv4();
                    
    
    
                    let url = urlbase + "/ebaymakepdf";
                    let data = { list: ebayOrders.orders, ebayaccount: ebayAccount, filename: fileName }
    
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        
                    })
                    .then(response => {
                        console.log(response);
                        if (response.statusText !== "OK"){
                            throw Error(response.statusText);
                        }
                            //dispatch(ebayOrdersIsLoading(listOld));
                            dispatch(ebayOrdersFetchDataSuccess(ebayOrdersFinal));
                            
                            //let tempEbayPDF = ebayPdfFilesOld.filter(item => item.ebayMarketplace !== ebayAccount);
                            tempEbayPDFFinal = tempEbayPDFFinal.concat({ebayMarketplace: ebayAccount, file: fileName + '.pdf'});
                            
                            if (ebayOrders.orders.length > 0){
                                dispatch(fileNameEbayPdf(tempEbayPDFFinal));
                           }
                        
                        //dispatch(ebayOrdersIsLoading(true));
                        //const result = await response.data
                        itemsProcessed++;
                        if(itemsProcessed === array.length) {
                            callback();
                        }
                        return response.data

                        
    
                    })
                    
                    //dispatch(ebayOrdersIsLoading());
    
               }
            )
            .catch(() => dispatch(ebayOrdersIsLoading(false)));
        

        })

       } catch(error){
            console.log(error);
            dispatch(ebayOrdersIsLoading(false))
       }

        //}

        //dispatch(ebayOrdersIsLoading(false));
    
    }
}

export function amazonPdfFileIsLoading(bool){
    return {
        type: 'AMAZON_PDF_FILE_IS_LOADING',
        isLoading: bool,
    };
}

export function amazonPdfFileHasErrored(bool){
    return {
        type: 'AMAZON_PDF_FILE_HAS_ERRORED',
        hasErrored: bool
    };
}


export function amazonPdfFileFetchCurrentData(url) {
    return (dispatch) => {
        dispatch(amazonPdfFileIsLoading(true))

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

            dispatch(amazonPdfFileIsLoading(false));
            
            return response.data

        })
        .then((amazonPdfFile) => dispatch(amazonPdfFileFetchDataSuccess(amazonPdfFile)))
        .catch(() => dispatch(amazonPdfFileIsLoading(false)));
    }
}

export function amazonPdfFileFetchDataSuccess(amazonPdfFile) {
    return {
        type: 'AMAZON_PDF_FILE_FETCH_DATA_SUCCESS',
        amazonPdfFile
    };
}

export function amazonPdfFileUpdated(amazonPdfFile) {
    return {
        type: 'AMAZON_PDF_FILE_UPDATED',
        amazonPdfFile
    };
}

/*export function amazonPdfFileFetchData(currentFile) {
    return (dispatch) => {        

        dispatch(amazonPdfFileIsLoading(true))
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }

                let fileName = uuidv4();          

                let url = urlbase + "/amazonpdf";
                let data = { filename: fileName }

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    
                })
                .then(responseAmazon => {
                    console.log(responseAmazon);
                    if (responseAmazon.statusText !== "OK"){
                        throw Error(responseAmazon.statusText);
                    }

                    //dispatch(amazonPdfFileFetchCurrentData(urlbase+'/getamazonpdffile'));
                    
                    axios.get(urlbase + "/getamazonpdffile/", config)
                    .then(response => {
                        
                        if (response.statusText !== "OK"){
                            throw Error(response.statusText);
                        }
               
                        return response
            
                    })
                    .then((newAmazonFile) => {
                        console.log(newAmazonFile.data);
                        console.log(currentFile)
                        //if (fileName !== newAmazonFile.data.fileName){
                            dispatch(amazonPdfFileFetchDataSuccess(newAmazonFile.data))
                        //}

                        dispatch(amazonPdfFileIsLoading(false));
                        
                        //return newAmazonFile

                    })
                        


                   

                }).catch(() => dispatch(amazonPdfFileIsLoading(false)));
    }
}*/

export function amazonPdfFileFetchData(currentFile) {
    return (dispatch) => {        

        dispatch(amazonPdfFileIsLoading(true))
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }

                let fileName = uuidv4();          

                let url = urlbase + "/amazonpdf";
                let data = { filename: fileName }

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    
                })
                .then(responseAmazon => {
                    console.log(responseAmazon);
                    if (responseAmazon.statusText !== "OK"){
                        throw Error(responseAmazon.statusText);
                    }

                    dispatch(amazonPdfFileIsLoading(false));
                    
                    
                    /*axios.get(urlbase + "/getamazonpdffile/", config)
                    .then(response => {
                        
                        if (response.statusText !== "OK"){
                            throw Error(response.statusText);
                        }
               
                        let newFileName = response.data.fileName;

                        console.log(newFileName);
                        console.log(currentFile.fileName);

                        dispatch(amazonPdfFileFetchDataSuccess(response.data))
                        //dispatch(amazonPdfFileUpdated(response.data))            
                        dispatch(amazonPdfFileIsLoading(false));
            
                    })*/
                        


                   

                }).catch(() => dispatch(amazonPdfFileIsLoading(false)));
    }
}



export function createLabelsEbay(ebayAccount, fileNameList, ebayOrders, listLoading, fileName) {
    return (dispatch) => {
        let newFileName = fileName;
        let listOld = listLoading;
        let list = listLoading;
        list = list.concat(ebayAccount);

        let oldFileNamelist = fileNameList;
        let newfileNameList = fileNameList;
        newfileNameList = newfileNameList.concat({ebayAccount, newFileName}) 


        //dispatch(ebayOrdersIsLoading(true));

        dispatch(ebayOrdersIsLoading(list))
        
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(urlbase + "/ebaymakepdf/" + encodeURIComponent(JSON.stringify(ebayOrders)) + '/' + ebayAccount + '/' + newFileName, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            //list = listLoading;
            dispatch(ebayOrdersIsLoading(listOld));
            dispatch(fileNameEbayPdf(newfileNameList));
            //return response.data

        })        
        .catch(() => {
            dispatch(ebayOrdersIsLoading(listLoading))
            dispatch(fileNameEbayPdf(oldFileNamelist));
        } );
    }
}

export function ebayOrdersUpdate(ebayOrders){
    return {
        type: 'EBAY_ORDERS_UPDATE',
        ebayOrders
    };
}







