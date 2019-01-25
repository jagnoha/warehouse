/*import {
    Types,
} from './actions';
import _ from 'lodash';
const uuid = require('uuid/v4');

const listings = [
    { "_id" : "5bcf444a60158b7aaff7cb64", "partNumbers" : [ "12108.01" ], "pictures" : [ "62d968f0-bdb0-40ac-b892-2fcb67801608", "36cdbc47-dc51-4b69-89c0-b1fc50783b38", "7eab753e-741e-47b3-8498-d24ad547304c", "98c6ec6f-baa5-49d8-a665-ba4a29144c7c", "ae918dac-e339-4b3a-af81-a642b335fbf9", "d766061a-77f6-4e98-b5fb-348e7a1a0076" ], "location" : [ "9b202e38-4e39-465e-822e-9f1475855c68" ], "conditionDescription" : [ "NEW OUT OF THE BOX" ], "compatibilityManual" : [ ], "uuid" : "4868d577-59fd-4c99-9b8f-6b019b73144d", "itemId" : "231926394919", "timestamp" : "2018-10-23T15:54:50.362Z", "authorId" : "0", "sku" : "231926394919", "title" : "Jeep Cj Wrangler Yj Tj Lj 76-06 New Hard Door Storage Bags X 12108.01", "description" : "Jeep Cj Wrangler Yj Tj Lj 76-06 New Hard Door Storage Bags X 12108.01", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "4b69e3dc-c770-424c-865b-bfe68b7470fa", "quantity" : 1, "condition" : "1", "price" : "133", "bestOffer" : false, "freeShipping" : true, "domestic" : "2", "international" : "0", "length" : "20", "width" : "20", "depth" : "20", "weight" : "20", "weightUnit" : "lbs", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb65", "partNumbers" : [ "22258" ], "pictures" : [ "2bf1d527-9c69-4036-a71d-6454a6b3d1df", "c36606ef-a945-4d94-97a0-1d2e7d8406b5", "22fe219a-05d8-4444-81e1-6f33e4f96b34", "26db0e7b-7187-4147-bc66-d028836c1d03", "5e616e69-22d2-410e-bc1f-50b7e5cb1d29", "e69c9d1a-d1c2-4b85-a642-0559e2b3d0bb" ], "location" : [ "e86a589b-c5ad-4ab7-b719-65a521d85b4c" ], "conditionDescription" : [ "New MISSING SOME CLIPS" ], "compatibilityManual" : [ ], "uuid" : "de002e29-ca6d-493f-8739-fda289a2051e", "itemId" : "232176551600", "timestamp" : "2018-10-23T15:54:50.372Z", "authorId" : "0", "sku" : "232176551600", "title" : "U.A  WIPER BLADES  22258 14 1/2\" huge LOT OF 80 14\"", "description" : "U.A  WIPER BLADES  22258 14 1/2\" huge LOT OF 80 14\"", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "6d8ea123-84af-48cf-974e-1431e0331854", "quantity" : 1, "condition" : "1", "price" : "150", "bestOffer" : false, "freeShipping" : true, "domestic" : "2", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "10", "weightUnit" : "lbs", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb66", "partNumbers" : [ "13713.35" ], "pictures" : [ "4f65e438-8d55-459e-8ddc-bc5969ea91ab", "d6ffd7d2-47bb-4f15-8cc6-3292f88787a6", "e00d3a2d-39ca-4ee4-ac00-3ff4785403a3", "d627e941-522b-4d71-9f76-e9610ceaf0d9" ], "location" : [ "9b202e38-4e39-465e-822e-9f1475855c68" ], "conditionDescription" : [ "NEW OUT OF THE BOX" ], "compatibilityManual" : [ ], "uuid" : "9524fd40-956c-4dea-9a33-3a2cd8f0e82d", "itemId" : "331842222407", "timestamp" : "2018-10-23T15:54:50.373Z", "authorId" : "0", "sku" : "331842222407", "title" : "Upper Soft Door Kit Blk Diamond 88-95(YJ) 13713.35", "description" : "Upper Soft Door Kit Blk Diamond 88-95(YJ) 13713.35", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "4b69e3dc-c770-424c-865b-bfe68b7470fa", "quantity" : 1, "condition" : "1", "price" : "199.99", "bestOffer" : false, "freeShipping" : true, "domestic" : "2", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "20", "weightUnit" : "lbs", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb68", "partNumbers" : [ "BR14257E03" ], "pictures" : [ "9dc272c0-545f-4953-9560-2a69ad8d4788", "61ce2bc6-16c0-4662-a8b8-9dbe25d22b01", "7bcbcaa3-2716-4e37-ab21-a17a9ee9a5d0", "2c77ed5f-b935-4385-b92b-d469a9c29fa3" ], "location" : [ "df72d3ba-adb4-4773-ac74-9a38e1e3d507" ], "conditionDescription" : [ "" ], "compatibilityManual" : [ ], "uuid" : "714e95ad-2bd1-406f-ab4d-3463e77a43d1", "itemId" : "232176551592", "timestamp" : "2018-10-23T15:54:50.385Z", "authorId" : "0", "sku" : "232176551592", "title" : "IKO BEARING br14257e03", "description" : "IKO BEARING br14257e03", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "176d1d94-ea20-45b8-ad1b-a8138bf898f7", "quantity" : 1, "condition" : "0", "price" : "29", "bestOffer" : false, "freeShipping" : true, "domestic" : "0", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "15", "weightUnit" : "oz", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0, "lastModified" : "2018-11-09T22:11:07.631Z", "asin" : "B00DBOHBLS" },
{ "_id" : "5bcf444a60158b7aaff7cb69", "partNumbers" : [ "05010011AA" ], "pictures" : [ "e7e210e8-0040-4f16-b71d-37f9c3e83508", "0dd1b187-5875-4180-8657-ca44149ebc93", "ad86e3cd-f4b8-4fe1-8966-602720f84a4c", "75daf8be-b628-43ff-9522-edc2f88beb76", "902fe1d5-3ec8-4f14-8e9c-935796716554" ], "location" : [ "fb3e7894-38d2-448a-a9db-c7c0b4600057" ], "conditionDescription" : [ "New Out of Box" ], "compatibilityManual" : [ ], "uuid" : "e6f98004-e51d-4ab3-9158-4a9dd7b1335b", "itemId" : "232182675621", "timestamp" : "2018-10-23T15:54:50.399Z", "authorId" : "0", "sku" : "232182675621", "title" : "MOPARGENUINE MOPAR OEM DRUM BRAKE LEVER # 5010011AA", "description" : "MOPARGENUINE MOPAR OEM DRUM BRAKE LEVER # 5010011AA", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "a10ead28-91a9-49b9-bd8f-fdaec77bed2f", "quantity" : 5, "condition" : "1", "price" : "38", "bestOffer" : false, "freeShipping" : true, "domestic" : "0", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "15", "weightUnit" : "oz", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb6a", "partNumbers" : [ "11508.03" ], "pictures" : [ "c023fc8c-d5c3-43da-ab90-725a9affe1c5", "143c7434-3cf7-4e0f-8fd6-611aa7fd3564", "e5cfe937-8289-4783-b319-6e3e3df4293a", "3444e3ae-c7ac-4b61-bc42-65290167dac1", "72edba12-e5f0-4535-a981-5920c853e061", "987e20b6-fe0e-4174-b15f-506099f54a00", "350062c5-b0f7-4c9d-b336-8dc0077e1a20" ], "location" : [ "d6507fdb-b451-4b63-87b6-0c715fd46b72" ], "conditionDescription" : [ "NEW OUT OF THE BOX WITH SOME scratches" ], "compatibilityManual" : [ ], "uuid" : "e06a7458-3f5a-410a-8bda-6416ca43bee6", "itemId" : "331819800367", "timestamp" : "2018-10-23T15:54:50.652Z", "authorId" : "0", "sku" : "331819800367", "title" : "TOW HITCH OUT OF THE BOX WITH SOME SCRATCHES 11508.03 universal", "description" : "TOW HITCH OUT OF THE BOX WITH SOME SCRATCHES 11508.03 universal", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "4b69e3dc-c770-424c-865b-bfe68b7470fa", "quantity" : 1, "condition" : "1", "price" : "135", "bestOffer" : false, "freeShipping" : true, "domestic" : "2", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "4", "weightUnit" : "lbs", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb6b", "partNumbers" : [ "600-0093" ], "pictures" : [ "d7eb6807-d6b0-4037-bf6f-c122baf6991a", "960e85dd-86d4-4a61-ac55-b53e8cabf474", "061ebea6-d2cf-4e54-b66b-28a9137e5dd4", "0c585223-837d-47c9-bc09-6bc02413c71a", "8a2bb2ce-774b-40b6-a144-6dbf6d344076", "43d0f1db-390a-4456-8682-c83ae4227297", "ef4f1b2a-f755-440a-84c9-317253e5e7c1", "a818da55-af22-4eda-a7a2-5914b6b0abb5", "1cfe8491-ec26-4650-9fa5-9ce3bc8eedb1", "529dc986-acc2-4328-ba35-093a47993efb", "3118c59a-a1e4-4bb0-9e73-36d6cc6cacd6", "b35090ac-145d-4834-a9d4-b05392d5fc6d" ], "location" : [ "e86a589b-c5ad-4ab7-b719-65a521d85b4c" ], "conditionDescription" : null, "compatibilityManual" : [ ], "uuid" : "82c06678-c9ad-4395-9a23-f0f048af6fa1", "itemId" : "332064256706", "timestamp" : "2018-10-23T15:54:50.669Z", "authorId" : "0", "sku" : "332064256706", "title" : "U.A CABIN SCREW-ON LOCK UNIVERSAL 600-0093  (3 7/8\" X 3 3/4\")", "description" : "U.A CABIN SCREW-ON LOCK UNIVERSAL 600-0093  (3 7/8\" X 3 3/4\")", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "6d8ea123-84af-48cf-974e-1431e0331854", "quantity" : "16", "condition" : "0", "price" : "29", "bestOffer" : false, "freeShipping" : true, "domestic" : "0", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "15", "weightUnit" : "oz", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 },
{ "_id" : "5bcf444a60158b7aaff7cb6c", "partNumbers" : [ "12403.2" ], "pictures" : [ "146c109f-aeb8-4779-87b6-b1f257472be1", "6c7478a3-e123-4409-b158-4bfdd2ccc08d", "4c1c50f5-f0b5-437d-8950-50bc3d3df720", "ef8e2d6f-7914-418d-91bb-7c98802c234f", "5f521126-6c15-49bd-800e-61ca92445996", "8c7dfdca-dfc4-4b83-9d71-8bd5c278a800", "5b3d7c38-3853-4788-8ba4-06945d55e832", "d756ae81-f0a2-4948-80a7-e9f9971359e0" ], "location" : [ "9b202e38-4e39-465e-822e-9f1475855c68" ], "conditionDescription" : [ "NEW OUT OF THE BOX" ], "compatibilityManual" : [ ], "uuid" : "e108dafc-f6d0-4ac8-bdba-e1d537fea215", "itemId" : "331842222421", "timestamp" : "2018-10-23T15:54:50.680Z", "authorId" : "0", "sku" : "331842222421", "title" : "Jeep 97-01 Xj Cherokee Tail Light Rh Passenger Side  X 12403.20 DEPO 03201774", "description" : "Jeep 97-01 Xj Cherokee Tail Light Rh Passenger Side  X 12403.20 DEPO 03201774", "category" : { "CategoryID" : "6763", "CategoryName" : "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts" }, "brand" : "2de21ecc-1236-429e-b4b7-0f8388156b50", "quantity" : 1, "condition" : "1", "price" : "50", "bestOffer" : false, "freeShipping" : true, "domestic" : "2", "international" : "0", "length" : "8", "width" : "8", "depth" : "8", "weight" : "6", "weightUnit" : "lbs", "compatibilityEbayId" : "", "hasCompatibility" : false, "status" : "online", "ebayAccount" : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "amazonAccount" : "", "__v" : 0 }]

  const ebayMarketplaces = [
    {id : "eaf3bb1c-c7dc-4322-a037-d34d8b94899e", "ebayUserId" : "the_surplus_giant", "clientID" : "OrrShlom-surplus3-PRD-9246ab013-0bb7ceb6", "clientSecret" : "PRD-246ab013c215-6e44-4a97-a4db-107e", "devId" : "5f98e45d-572e-44d9-976b-3eb813c0ed97", "authToken" : "AgAAAA**AQAAAA**aAAAAA**UN7JWw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmIKjDpeLpQWdj6x9nY+seQ**e54DAA**AAMAAA**lKS4zXbaldNs2AkyzD/nOrDv4EYp6EGzQr+2Pspr/n6KutDSgv0SixWQ0RMkg+DRIxh3HAp8+r3ZCrJ2IedVxtylQPI5mJQNG29H8dJoZnSuTBJNK9p0jtUXkggh5DNAGzXlTr4ZKUKjj/DEXs/sdB4EzVWlYXrKwjE/497vh5Dzn57YzmGTcJIUSH5NJZ7ulbg0Eb5DgkYUCaYjA2v8UxtI/WkV4Q/moEGHX7mVQgVJYNjP9ulNpXUgntsIyhA16Cr3p3mdxxTVXrm5Ywa+NuTwAWX/EnWqXLAk0BjR5omAjHWrn3QRlv9eeydyvT4Jb/Apx2nq8kRRCl9GTyREu9Jd8FxT6596X/UmvrZlDl1cOw8OrdZ3BquuHb9763dN2uaBL/Zjf0rmsUydG19itMTV5QBq2frgOJKOPWOw5NCotDKH5doieqXWuSADiNmYzIM4CyXv3QlNS5Sor4LIjYU9zcwlrAUGR7KnQuSng9ugR1p6lSlhZTYSaBZSnufFvlXXjjuGlVwfDScub8pQcVhq11JIdCs85JDaDMDoDGAUsPKeIUGlJA/0TkYk+ZPKUN7hZuI3PRu+B8Kvnj+I4F+tvsrDJs0FpBeJFuoFTQQsGpvEttwMK8yTzsnkH2n1xQXZy16CN7X7ktd+jPVeZOtyvU4mor4FnBTRosFRUrQSWBA0WdGW5FMIZ3LEM1HJRaQMqS2B43/T5sPOMic2erHA4D1mLybt93cpNRIZzF/FOL22Np9xf2Qx/ZOCKi+C", "refreshToken" : "v^1.1#i^1#I^3#p^3#f^0#r^1#t^Ul4xMF8zOkYxRjNBRUI2NURDMzA3NUU5OEJCQkM5MDA2RTRFQTcxXzJfMSNFXjI2MA=="},
    {id : "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352", "ebayUserId" : "uaintl-2008", "clientID" : "JavierGo-uaintl-PRD-638ccaf50-5721461e", "clientSecret" : "PRD-38ccaf509288-8769-4a95-a2fa-d737", "devId" : "52526491-c6a5-4617-ab19-a349013b04e8", "authToken" : "AgAAAA**AQAAAA**aAAAAA**9Gv0Ww**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wDmIOiCpWFow+dj6x9nY+seQ**mjEDAA**AAMAAA**X43XkJCPbWDg1aYkEBrixn/uFXu6xJYmFoB5eUQu4AmGFgSxTWZJiwi3Jj/JGveb+87Fs15kXccAFPWqIGvJVC4BpYQP8GYfJtzMIJhsNQ7/+Vk8+lbCxfwWesx1bOFxMoD9J7AIrd6Zp5LbA84XOQ4T1D/o0PXUo8zwLVpq7Z4VetEb44hhnaqdEG4DQHa5qA4eXwvaN4C6rmozHUUvEQx/zI55AeCNPRd0UOruFMcQQahLUM1ve6aaRAfd7dfZ0L6tG2alCYBKVsiOQHZJidr8Dhs/2kjhHA5a1XbrUsOr/DMp7nNMXfDuzm36xEP25IXTauM9BPlKu6hYzmn48VTkgMhBuuCGvgXHYaXXluvmDmBZyEMdfIKp1WnHltpUsdajiYCAvkaCCeYax6M/UqnNrfplmEChUluXiiolv8chon5xbd8pULaGw4bIS2+anDfZFY+8QSgGih5W1PsNJa/h6hIJ5hHj/DuNj6RK4Zn/w56twr9k0MKQ/FS8McXrwTP3Cuv/MnpjcQP2wqxDC+tkwtz4NACln29L7dn4rN0efcUSKxi+di2tNl/Yhtd3c0MPZY6jzdkqYGxrmskQcfqDnMOuFm7HFAVEzBg8p+WfBfQuG8whsxkiW6g97CiJ5vUebDYqp3XG67WU6qCgIHnYrTWRK4stfOB6YIyxsMUXRplsWHCduSjYYXCkmch6e7LB9pbF8xTq+Itso2osgwZFJr4wOt330ttbF2xF9k7/SzRzaMTA/t3Mb5Totfki", "refreshToken" : "v^1.1#i^1#r^1#I^3#p^3#f^0#t^Ul4xMF8xMTo0QkZEMUFEMDc3RkRFRUM1OTVDMzI3N0UyMEZGOTk0Ml8yXzEjRV4yNjA="},
  ]
  
  const brands = [
    { id : "0bd3bf72-7731-4fd1-9714-58aa16884d3e", value : "ALLOY USA" },
    { id : "38bf4bde-2132-4dfb-94ff-94299abd2069", value : "HELLA" },
  ]
  
  const locations = [
    { id : "4c865bd2-a500-46fb-9e11-2fc2cae26cbe", value : "62G" },
    { id : "bc9278d3-b388-4ffe-aeaf-bda791fb697d", value : "121C" },
  ]
  
  const users = [
    {
      id: '0',
      username: 'admin',
      password: 'MAGIC3232!',
      group: '0',
    },
    {
      id: '1',
      username: 'orr',
      password: 'MAGIC3232!',
      group: '1'
    },
    {
      id: '2',
      username: 'dekel',
      password: 'dekel',
      group: '1',
    },
    {
      id: '3',
      username: 'jagnoha',
      password: 'jagnoha',
      group: '2',
    },
    {
      id: '4',
      username: 'robert',
      password: 'robert',
      group: '2',
    },
    {
      id: '5',
      username: 'jordan',
      password: 'jordan',
      group: '2',
    }
  ];
  
  const conditions = [
    {
      id: '0',
      type: 'New'
    },
    {
      id: '1',
      type: 'New (Other)'
    },
    {
      id: '2',
      type: 'Used'
    },
    {
      id: '3',
      type: 'Manufacturer refurbished'
    }
  ];

function reducers(
    state = {
        rawList: listings,
        rawLocations: locations,
        rawBrands: brands,
        rawEbayMarketplaces: ebayMarketplaces,
        productsList: listings,
        productsListSorted: [],  
        productsByPage: 5,  
        activePage: 1,
        productsSelected: [],
        conditionsList: conditions,
        brandsList: brands,
        locationsList: locations,
        usersList: users,
        usersFilterActive: 'ALL',
        ebayMarketplaceFilterActive: 'ALL',
        statusFilterActive: 'ALL',
        conditionsFilterActive: 'ALL',        
        checkAll: false,
        valueSearch: '',
        checkedSearch: false,
        userActive: null,
        partNumber: '',
        locationItem: [],
        globalDirection: null,
        globalColumn: null,
        asinList: [],
        dashboardMessages: [],
    },
    action){

        switch (action.type) {
            case Types.SORT_PRODUCT_LIST:
                return Object.assign({}, state,{
                    productsListSorted: action.listSorted,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })

            case Types.UPDATE_LISTINGS:
                return Object.assign({}, state,{
                    rawList: action.listingsFromDB.data,
                    productsListSorted: action.direction === 'ascending' ? _.sortBy(action.listingsFromDB.data, (item => {
                        if (action.field === 'price'){
                          return parseFloat(item[action.field]);
                        } else {
                          return item[action.field];
                        }
                        
                      })).reverse() : _.sortBy(action.listingsFromDB.data, (item => {
                        if (action.field === 'price'){
                          return parseFloat(item[action.field]);
                        } else {
                          return item[action.field];
                        }
                        
                      })),

                })

            case Types.UPDATE_FIELD_DIRECTION:
                return Object.assign({}, state, {
                    globalDirection: action.directionValue,
                    globalColumn: action.fieldValue,
                    productsSelected: [],
                    activePage: 1,
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })

            case Types.UPDATE_ASIN_LIST:
                return Object.assign({}, state, {
                    asinList: action.asinListFromQuery,
                })
            
            case Types.UPDATE_LOCATIONS:
                return Object.assign({}, state, {
                    rawLocations: action.locationsFromDB.data,
                    locationsList: action.locationsFromDB,
                })
                
            case Types.UPDATE_DASHBOARD_MESSAGES:
                return Object.assign({}, state, {
                    rawLocations: action.locationsFromDB.data,
                    dashboardMessages: action.list,
                })
            
            case Types.UPDATE_EBAY_MARKETPLACES:
                return Object.assign({}, state, {
                    rawEbayMarketplaces: action.ebayMarketplacesFromDB.data,
                })
            
            case Types.UPDATE_BRANDS:
                return Object.assign({}, state, {
                    rawBrands: action.brandsFromDB.data,
                    brandsList: action.brandsFromDB,
                })
            
            case Types.ADD_PRODUCT_SELECTED:
                return Object.assign({}, state, {
                    productsSelected: action.listSelected.concat(action.id),
                    locationItem: [],
                    asinList: [],
                })
                
            case Types.CHANGE_PARTNUMBER:
                return Object.assign({}, state, {
                    partNumber: action.partNumber,
                    asinList: [],
                })
            
            case Types.DELETE_PRODUCT_SELECTED:
                return Object.assign({}, state, {
                    productsSelected: action.listSelected.filter(item => item !== action.id),
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_ACTIVE_PAGE:
              //case 'CHANGE_ACTIVE_PAGE':  
                return Object.assign({}, state, {
                    activePage: Number(action.activePage),
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_USER_FILTER:
                return Object.assign({}, state, {
                    usersFilterActive: action.usersFilterActive,
                    activePage: 1,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_EBAY_MARKETPLACE_FILTER:
                return Object.assign({}, state, {
                    ebayMarketplaceFilterActive: action.ebayMarketplaceFilterActive,
                    activePage: 1,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_STATUS_FILTER:
                return Object.assign({}, state, {
                    statusFilterActive: action.statusFilterActive,
                    activePage: 1,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })

            case Types.CHANGE_CONDITION_FILTER:
                return Object.assign({}, state, {
                    conditionsFilterActive: action.conditionsFilterActive,
                    activePage: 1,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })

            case Types.UNCHECK_ALL:
                return Object.assign({}, state, {
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHECK_ALL:
                return Object.assign({}, state, {
                    productsSelected: action.productsSelected,
                    checkAll: true,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_VALUE_SEARCH:
                return Object.assign({}, state, {
                    valueSearch: action.valueSearch,
                    productsSelected: [],
                    checkAll: false,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.CHANGE_CHECKED_SEARCH:
                return Object.assign({}, state, {
                    checkedSearch: action.checkedSearch,
                    productsSelected: [],
                    checkAll: false,
                    activePage: 1,
                    locationItem: [],
                    asinList: [],
                })
            
            case Types.UPDATE_LOCATION_ITEM:
                return Object.assign({}, state, {
                    locationsList: state.locationsList.data.concat({id: action.id, value: action.newLocation}),
                    productsSelected: [],
                    checkAll: false,
                    locationItem: action.locationItem,
                    asinList: [],

                })
            
            case Types.ADD_NEW_LOCATION: {
                const newLocationsList = state.locationsList.data.concat({id: action.id, value: action.newLocation});
                window.client.createNewLocation(action.id, action.newLocation);

                return Object.assign({}, state, {
                    locationsList: newLocationsList,
                    productsSelected: [],
                    checkAll: false,
                    asinList: [],
                })
            }
            
            case Types.ADD_NEW_BRAND: {
                const id = uuid();
                const newBrandList = state.brandsList.data.concat({id: id, value: action.newBrand});
                window.client.createNewBrand(id, action.newBrand);

                return Object.assign({}, state, {
                    brandsList: newBrandList,
                    productsSelected: [],
                    checkAll: false,
                    asinList: [],
                })
            }
            
            case Types.CHANGE_PRODUCT_BY_PAGE:                

                return Object.assign({}, state, {
                    productsByPage: action.productByPageValue,
                    productsSelected: [],
                    checkAll: false,
                    activePage: 1,
                    asinList: [],
                })
            
            case Types.CHANGE_ACTIVE_USER:                

                return Object.assign({}, state, {
                    userActive: action.userActive,
                    productsSelected: [],
                    checkAll: false,
                    activePage: 1,
                    productsByPage: 25,
                    usersFilterActive: 'ALL',
                    ebayMarketplaceFilterActive: 'ALL',
                    statusFilterActive: 'ALL',
                    conditionsFilterActive: 'ALL',
                    valueSearch: '',        
                    checkedSearch: false,
                    locationItem: [],
                    asinList: []
                })
            default:
                return state
        }

    }

export default reducers
*/

import { combineReducers } from 'redux';
import { locationsHasErrored, locationsIsLoading, locations } from './reducers/locations';
import { listingsHasErrored, listingsIsLoading, listings, listingsFiltered } from './reducers/listings';
import { brandsHasErrored, brandsIsLoading, brands } from './reducers/brands';
import { ebayMarketplacesHasErrored, ebayMarketplacesIsLoading, ebayMarketplaces } from './reducers/ebayMarketplaces';
import { conditions } from './reducers/conditions';
import { users } from './reducers/users';
import { activePage } from './reducers/activePage';
import { productsByPage } from './reducers/productsByPage';
import { clickedColumn, direction } from './reducers/clickedColumn';
import { filterByCondition, filterByStatus, filterByUser, filterByMarketplace, searchIsChecked, filterBySearch } from './reducers/filters';
import { productsSelected } from './reducers/productsSelected';
import { productsInPage } from './reducers/productsInPage';
import { picturesHasErrored, picturesIsLoading } from './reducers/pictures';
import { urlBase} from './reducers/urlBase';
import { newBrand } from './reducers/newBrand';
import { newLocation } from './reducers/newLocation';
import { listingDraft, listingDraftHasErrored, listingDraftIsLoading } from './reducers/listingDraft';
import { userActive, userActiveHasErrored, userActiveIsLoading } from './reducers/userActive';





export default combineReducers({
    locations,
    locationsHasErrored,
    locationsIsLoading,
    listings,    
    listingsHasErrored,
    listingsIsLoading,
    brands,
    brandsHasErrored,
    brandsIsLoading,    
    ebayMarketplacesHasErrored,
    ebayMarketplacesIsLoading,
    ebayMarketplaces,
    conditions,
    users,
    activePage,
    productsByPage,
    clickedColumn,
    direction,
    filterByCondition,
    filterByStatus,
    filterByUser,
    filterByMarketplace,
    listingsFiltered,
    filterBySearch,
    searchIsChecked,
    productsSelected,
    productsInPage,
    picturesHasErrored,
    picturesIsLoading,
    urlBase,
    newBrand,
    newLocation,
    listingDraft,
    listingDraftHasErrored,    
    listingDraftIsLoading,
    userActive,
    userActiveHasErrored,    
    userActiveIsLoading,
    
});