/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import axios from 'axios';

window.client = (function () {

    function getListingsFromDB(store, direction, field){
        
        
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getlistings', config)
        .then(response => {
            
            store.dispatch(
                {
                  type: 'UPDATE_LISTINGS',
                  listingsFromDB: response,
                  direction: direction,
                  field: field,
                  //listSorted: sorted,
                }
              )
        
        
        })
        .catch(error => console.log("error"));       
        

       /*Listing.find({}), function(err, resultListing){
        store.dispatch(
            {
              type: 'UPDATE_LISTINGS',
              listingsFromDB: resultListing,
              direction: direction,
              field: field,
              //listSorted: sorted,
            }
          )
       }*/
    }

    function getPicturesFromDB(state){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getonlypictures', config)
        .then(response => {
            
            state.setState({
                listingPictures: response.data,
            })
        
        
        })
        .catch(error => console.log("error"));   
    }



    
    function getLocationsFromDB(store){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getlocations', config)
        .then(response => {
            
            store.dispatch(
                {
                  type: 'UPDATE_LOCATIONS',
                  locationsFromDB: response,
                }
              )
        
        
        })
        .catch(error => console.log("error"));       
        
    }

    function getBrandsFromDB(store){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getbrands', config)
        .then(response => {
            
            store.dispatch(
                {
                  type: 'UPDATE_BRANDS',
                  brandsFromDB: response,
                }
              )
        
        
        })
        .catch(error => console.log("error"));       
        
    }

    function getAmazonAsinList(store, sku){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getamazonasinlist/c7104e07-ed84-4a6c-b57b-1f333b197401/'+sku, config)
        .then(response => {
            //console.log(response.data);
            store.dispatch(
                {
                    type: 'UPDATE_ASIN_LIST',
                    asinListFromQuery: response.data,
                }
            )
            
        
        
        })
        .catch(error => console.log("error"));       
        
    }

    function getAmazonAsinListByQuery(store, query){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getamazonasinlistbyquery/c7104e07-ed84-4a6c-b57b-1f333b197401/'+query, config)
        .then(response => {
            //console.log(response.data);
            store.dispatch(
                {
                    type: 'UPDATE_ASIN_LIST',
                    asinListFromQuery: response.data,
                }
            )
            
        
        
        })
        .catch(error => console.log("error"));       
        
    }

    function getAmazonAsinListAutoparts(sku, partNumbers, brand, brandList){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }

        let listingBrand = brandList.filter((item) => item.id === brand)[0].value;
        let listingPartNumber = partNumbers;

        let query = listingBrand + ' ' + listingPartNumber;
        
        axios.get('http://192.168.1.11:8083/getamazonasinlistbyquery/c7104e07-ed84-4a6c-b57b-1f333b197401/'+query, config)
        .then(response => {
            
            //console.log(response.data);
            console.log("Brand: " + brand + " | PartNumber: " + partNumbers);
            console.log(query);

            if (response.data){

            //let listingBrand = brandList.filter((item) => item.id === brand)[0].value;
          
            let listFiltered = response.data.filter(item => {
                return item.AttributeSets.ItemAttributes.Brand.toUpperCase().includes(listingBrand.toUpperCase()) &&
                //item.AttributeSets.ItemAttributes.Brand.toUpperCase() === listingBrand.toUpperCase() &&
                item.AttributeSets.ItemAttributes.PartNumber.toUpperCase() === listingPartNumber.toUpperCase()
            })

            if (listFiltered.length > 0){
                console.log('>>>>>>>> ASIN: ' + listFiltered[0].Identifiers.MarketplaceASIN.ASIN);
                console.log('>>>>>>>> SKU:' + sku);
                console.log('>>>>>>>> Listing Brand: ' + listingBrand);
                console.log('>>>>>>>> Amazon Brand: '+ listFiltered[0].AttributeSets.ItemAttributes.Brand);
                requestAmazonListing(listFiltered[0].Identifiers.MarketplaceASIN.ASIN, sku);
            }
            }
        
        
        })
        .catch(error => console.log(error));       
        
    }

    async function processAsinListBulk(array, listings, brandList){
        for (const item of array){
            
            let listingInfo = listings.filter(listing => {
                return listing.uuid === item
            })

            console.log(item);
            
            if (!listingInfo[0].asin &&
                listingInfo[0].condition === '0' && listingInfo[0].status === 'online' && !listingInfo[0].title.toUpperCase().includes('LOT OF') && 
                !listingInfo[0].title.toUpperCase().includes('*')
            ){
                 setTimeout(await getAmazonAsinListAutoparts(
                listingInfo[0].sku, listingInfo[0].partNumbers[0], listingInfo[0].brand, brandList)
                ,3000)
            
            }
        
        }

        console.log("done");
        
    } 

    
    function requestAmazonListing(asin, sku){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/addrequestamazonlisting/c7104e07-ed84-4a6c-b57b-1f333b197401/'+asin+'/'+sku, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log("error"));       
        
    }

    function createNewLocation(id, value){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/addlocation/'+id+'/'+value, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log("error"));       
        
    }

    function createNewBrand(id, value){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/addbrand/'+id+'/'+value, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log("error"));       
        
    }

    function updateListing(sku, fields){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/updatelisting/'+sku+'/'+fields, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log("error"));       
        
    }



    function getEbayMarketplacesFromDB(store){
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get('http://192.168.1.11:8083/getebaymarketplaces', config)
        .then(response => {
            
            store.dispatch(
                {
                  type: 'UPDATE_EBAY_MARKETPLACES',
                  ebayMarketplacesFromDB: response,
                }
              )
        
        
        })
        .catch(error => console.log("error"));       
        
    }

    return {
        getListingsFromDB,
        getLocationsFromDB,
        getBrandsFromDB,
        getEbayMarketplacesFromDB,
        getAmazonAsinList,
        requestAmazonListing,
        createNewLocation,
        createNewBrand,
        updateListing,
        getAmazonAsinListByQuery,
        getAmazonAsinListAutoparts,
        processAsinListBulk,
        getPicturesFromDB,
    }

}())