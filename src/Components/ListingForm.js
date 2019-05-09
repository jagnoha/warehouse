import React, { Component } from 'react';
import '../App.css';
import '../helpers.js';
import { 
    Button, Form, Input, TextArea, Grid, Header, Image, Message, 
    Menu, Label, Segment, Dropdown, Icon, Checkbox, Modal, Divider } from 'semantic-ui-react';
import ImagesLightBoxForm from './ImagesLightBoxForm'
import { connect } from 'react-redux';
import { brandAddDatabase, locationAddDatabase, listingDraftUpdated, listingDraftUpdateDatabase, 
    listingRelistEbay, listingUpdateDatabase, listingCreateEbay } from '../modules/actions'

import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';
import ImageList from './ImageList';

const uuidv4 = require('uuid/v4');

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileRename);

function getConditionCode(condition){
    if (Number(condition) > 1){
      return "used"
    } else {
      return "new"
    }
  }

  function conditionEbayQuery(condition){
    if (Number(condition) > 1){
      return "2"
    } else {
      return "1"
    }
  }


class ListingForm extends Component {
        
        state = {
            //fields: this.props.item,

            fields: { ...this.props.item, ['pictures']: this.props.item.pictures.map(item => item), ['locationValues']: this.props.item.location.map(item => window.helpers.getLocationFromId(this.props.locations, item)) },

            pictures: this.props.item.pictures.map(item => item),

            currentPartNumbers: this.props.item.partNumbers,
            
            optionsPartNumbers: this.props.item.partNumbers.map(item => ({key: item, value: item, text: item})),
            
            //optionsLocations: this.props.locations.map(item => ({key: item.id, value: item.value, text: item.value})),
            
            optionsLocations: this.props.locations.map(item => ({key: item.id, value: item.id, text: item.value})),
            
            
            
            currentLocations: this.props.item.location.map(item => window.helpers.getLocationFromId(this.props.locations, item)),  
            
            //optionsBrand: this.props.brands.map(item => ({key: item.id, value: item.value, text: item.value})),
            //currentBrand: window.helpers.getBrandFromId(this.props.brands, this.props.item.brand),  
            
            optionsBrand: this.props.brands.map(item => ({key: item.id, value: item.id, text: item.value})),
            optionsEbayAccount: this.props.ebayMarketplaces.map(item => ({key: item.id, value: item.id, text: item.ebayUserId})),

            files: [],

            modalPriceOpen: false,

            lowerPriceItem: null,

            priceItem: null,

            //currentHasCompatibility: this.props.item.hasCompatibility,
            //currentBrand: window.helpers.getBrandFromId(this.props.brands, this.props.item.brand),  
            

        }

        handlePriceOpen = () => {
            this.setState({ modalPriceOpen: true })
    
            let config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
              }
    
            axios.get(`https://29508158.ngrok.io/ebaysearch/${this.state.fields.partNumbers[0]}/33021/${getConditionCode(this.state.fields.condition)}`, config)          
            .then(response => {
          
                this.setState({
                    lowerPriceItem: response.data,
                    priceItem: {
                        sku: this.state.fields.sku,
                        itemId: this.state.fields.itemId,
                        pictures: this.state.fields.pictures,
                        title: this.state.fields.title,
                        price: this.state.fields.price,
                        condition: this.state.fields.condition,
                        conditionDescription: this.state.fields.conditionDescription,
                        quantity: this.state.fields.quantity,
                    },
                })
                            
    
            }).catch(error => {
                    alert(error);
                }
            );
    
        }

        handlePriceClose = () => {
            this.setState({ modalPriceOpen: false, lowerPriceItem: null, priceItem: null })
        }

        handleChangeFieldPrice = (e, data) => {
            
            let doChange = true;

            switch(data.id){
                //case "title":
                //    doChange = this.checkSizeTitle(data.value);
                //    break;
                //case "quantity":
                case "price":    
                    doChange = this.checkQuantity(data.value);
                    break;

            }

            //console.log(data);
            
            if (doChange){
                this.setState({
                    priceItem: {...this.state.priceItem, [data.id]: data.value}
                })
            }
        
        }

        handlePriceListing = () => {
        
            this.setState({
                lowerPriceItem: null,
                fields: { ...this.state.fields, ['price']: this.state.priceItem.price, ['checkPrice']: null },
                modalPriceOpen: false, 
            })
    
            //console.log(this.state.priceItem.price);
    
            /*let edited = false;
    
           if (this.state.fullItem.title !== this.state.priceItem.title ||
              this.state.fullItem.quantity !== this.state.priceItem.quantity ||
              this.state.fullItem.condition !== this.state.priceItem.condition  
            ){
                edited = true;
            } 
            
            axios.get(`https://29508158.ngrok.io/updatepriceonebay/${this.state.priceItem.sku}/${this.state.priceItem.itemId}/
            ${this.state.priceItem.price}/${this.state.priceItem.title}/${this.state.priceItem.quantity}/${this.state.priceItem.condition}/
            ${this.state.priceItem.conditionDescription}/${edited}`)
            .then(response => {
                
                let listingsTemp = this.props.listings.filter(item => item.sku !== this.state.priceItem.sku);
                let newItem = {...this.state.fullItem, 
                    ['checkPrice']:null, 
                    ['price']: this.state.priceItem.price,
                    ['title']: this.state.priceItem.title,
                    ['quantity']: this.state.priceItem.quantity,
                    ['condition']: this.state.priceItem.condition,
                    ['conditionDescription']: this.state.priceItem.conditionDescription,
    
                    
                }
                let listingsNew = [...listingsTemp, newItem]  
                
                this.props.listingsUpdate(listingsNew);
    
                this.setState(
                    { 
                        modalPriceOpen: false, 
                        lowerPriceItem: null, 
                        priceItem: null,
                        fullItem: null,
                    }
                )
                            
    
            }).catch(error => {
                
                    this.setState(
                        { 
                            modalPriceOpen: false, 
                            lowerPriceItem: null, 
                            priceItem: null,
                            fullItem: null, 
                        }
                    )
                    alert(JSON.stringify(error));
                }
            );

                */


        
        }

        handleDismissPriceListing = () => {
        
            this.setState({
                lowerPriceItem: null,
            })
            
            axios.get(`https://29508158.ngrok.io/dismisspricerevise/${this.state.priceItem.sku}`)
            .then(response => {            
                
    
                /*let listingsTemp = this.props.listings.filter(item => item.sku !== this.state.priceItem.sku);
                let newItem = {...this.state.fields, ['checkPrice']:null}
                let listingsNew = [...listingsTemp, newItem]  
                
                this.props.listingsUpdate(listingsNew);*/
    
                this.setState(
                    { 
                        modalPriceOpen: false, 
                        lowerPriceItem: null, 
                        priceItem: null,
                        fields: { ...this.state.fields, ['checkPrice']: null },
                    }
                )
    
                //alert(JSON.stringify(response.data));
                            
    
            }).catch(error => {
                
                    this.setState(
                        { 
                            modalPriceOpen: false, 
                            lowerPriceItem: null, 
                            priceItem: null,
                        }
                    )
                    alert(JSON.stringify(error));
                }
            );
        
        
        }

        handleDismissForeverPriceListing = () => {
        
            this.setState({
                lowerPriceItem: null,
            })
            
            axios.get(`https://29508158.ngrok.io/dismisspricereviseforever/${this.state.priceItem.sku}`)
            .then(response => {            
                
    
                /*let listingsTemp = this.props.listings.filter(item => item.sku !== this.state.priceItem.sku);
                let newItem = {...this.state.fields, ['checkPrice']:null}
                let listingsNew = [...listingsTemp, newItem]  
                
                this.props.listingsUpdate(listingsNew);*/
    
                this.setState(
                    { 
                        modalPriceOpen: false, 
                        lowerPriceItem: null, 
                        priceItem: null,
                        fields: { ...this.state.fields, ['checkPrice']: false },
                    }
                )
    
                //alert(JSON.stringify(response.data));
                            
    
            }).catch(error => {
                
                    this.setState(
                        { 
                            modalPriceOpen: false, 
                            lowerPriceItem: null, 
                            priceItem: null,
                        }
                    )
                    alert(JSON.stringify(error));
                }
            );
        
        
        }
    

        
        handleDrop(files) {
            console.log(files);
            /*var data = new FormData();
           
            files.forEach((file, index) => {
              data.append('file' + index, file);
            });
           
            fetch('/upload', {
              method: 'POST',
              body: data
            });*/
          }

        deletePicture = (value) => {
            this.setState(
                {
                    pictures: this.state.pictures.filter(item => item !== value)
                }
            )
        }

        handleAdditionPartNumbers = (e, { value }) => {
            this.setState({
                optionsPartNumbers: [{ text: value, value }, ...this.state.optionsPartNumbers],
            })
          }
        
        handleChangePartNumbers = (e, { value }) => this.setState(
            { 
                currentPartNumbers: value, 
                fields: { ...this.state.fields,  ['partNumbers']: value }
            })

        
        handleAdditionLocations = (e, { value }) => {
            const locationId = uuidv4();
            
            this.props.locationAddDatabase(this.props.urlBase + '/addlocation/' + locationId + '/' + value.toUpperCase(), 
            locationId, value.toUpperCase);
            
            this.setState({
                optionsLocations: [{ text: value, value: locationId }, ...this.state.optionsLocations],
                fields: { ...this.state.fields,  ['location']: this.state.fields.location.concat(locationId),
            ['locationValues']: this.state.fields.locationValues.concat(value.toUpperCase()) }
            })
            
            
            /*this.setState({
                optionsLocations: [{ text: value, value }, ...this.state.optionsLocations],
            })*/
          }
        
        //handleChangeLocations = (e, { value }) => this.setState({ currentLocations: value })
        handleChangeLocations = (e, { value }) => this.setState({fields: { ...this.state.fields,  
            ['location']: value,
            ['locationValues']: value.map(item => window.helpers.getLocationFromId(this.props.locations, item))        
        }
        })

        /*handleChangeCompatibility = (e, { value }) => this.setState({
            fields: { ...this.state.fields,  ['compatibilityEbayId']: value },
            currentHasCompatibility: value.length > 0 ? true : false,        
        })*/ 
        

        
        
        handleAdditionBrand = (e, { value }) => {
            const brandId = uuidv4();

            this.props.brandAddDatabase(this.props.urlBase + '/addbrand/' + brandId + '/' + value.toUpperCase(), 
            brandId, value.toUpperCase);
            
            this.setState({
                optionsBrand: [{ text: value, value: brandId }, ...this.state.optionsBrand],
                fields: { ...this.state.fields,  ['brand']: brandId }
            })
          }
        
        handleChangeBrand = (e, { value }) => this.setState({fields: { ...this.state.fields,  ['brand']: value }})

        handleSaveForm = () => {

            this.setState(
                {
                    fields: 
                    { ...this.state.fields, 
                        ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                        ['pictures']: this.state.pictures.map(item => item),
                        //['compatibilityManual']: this.props.item.compatibilityManual,
                        
                        /*['hasCompatibility']: this.state.currentHasCompatibility,*/                         
                    }  
                
                }
            )
            
                let tempFields = { ...this.state.fields, 
                    ['conditionDescription']: this.state.fields.condition !== '0' ? [this.state.fields.conditionDescription] : [],
                    ['pictures']: this.state.pictures.map(item => item),                                           
                };

                let listingsTemp = this.props.listings.map(item => { if (item.sku === this.props.item.sku) { return tempFields}  return item })


                /*this.props.listingDraftUpdateDatabase(this.props.urlBase + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(this.state.fields)), this.state.fields, listingsTemp);*/
            
                this.props.listingDraftUpdateDatabase(this.props.urlBase + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(
                    
                    { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                    ['pictures']: this.state.pictures.map(item => item) }
                    
                
                )), 
                
                { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                    ['pictures']: this.state.pictures.map(item => item) }
                
                , listingsTemp);
            
                this.props.handleClose();
            
        }

        handleSaveFormUpload = () => {

            this.setState(
                {
                    fields: 
                    { ...this.state.fields, 
                        ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                        ['pictures']: this.state.pictures.map(item => item),
                        
                        /*['hasCompatibility']: this.state.currentHasCompatibility,*/                         
                    }  
                
                }
            )
            
            /*const testingUrl = "https://mighty-bulldog-12.localtunnel.me";

            this.props.listingCreateEbay(
                testingUrl + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
            encodeURIComponent(JSON.stringify(this.state.fields)),
            testingUrl + '/createListingEbay/' + this.state.fields.sku + '/' + 
            encodeURIComponent(JSON.stringify(this.state.fields)), this.state.fields


            );*/
            let tempFields = { ...this.state.fields, 
                ['conditionDescription']: this.state.fields.condition !== '0' ? [this.state.fields.conditionDescription] : [],
                ['pictures']: this.state.pictures.map(item => item),
                ['status']: 'online',                                           
            };

            let listingsTemp = this.props.listings.map(item => { if (item.sku === this.props.item.sku) { return tempFields}  return item })


                
                this.props.listingCreateEbay(
                    this.props.urlBase + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(this.state.fields)),
                this.props.urlBase + '/createlistingebay/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(
                    
                    { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                    ['pictures']: this.state.pictures.map(item => item) }
                
                )), 
                
                { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                ['pictures']: this.state.pictures.map(item => item) }
                
                , listingsTemp


                );
            
                

            
                this.props.handleClose();
            
        }

        handleSaveFormRelist = () => {

            this.setState(
                {
                    fields: 
                    { ...this.state.fields, 
                        ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                        ['pictures']: this.state.pictures.map(item => item),
                        
                        /*['hasCompatibility']: this.state.currentHasCompatibility,*/                         
                    }  
                
                }
            )
            
            /*const testingUrl = "https://mighty-bulldog-12.localtunnel.me";

            this.props.listingCreateEbay(
                testingUrl + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
            encodeURIComponent(JSON.stringify(this.state.fields)),
            testingUrl + '/createListingEbay/' + this.state.fields.sku + '/' + 
            encodeURIComponent(JSON.stringify(this.state.fields)), this.state.fields


            );*/
            let tempFields = { ...this.state.fields, 
                ['conditionDescription']: this.state.fields.condition !== '0' ? [this.state.fields.conditionDescription] : [],
                ['pictures']: this.state.pictures.map(item => item),
                ['status']: 'online',                                           
            };

            let listingsTemp = this.props.listings.map(item => { if (item.sku === this.props.item.sku) { return tempFields}  return item })


                
                this.props.listingRelistEbay(
                    this.props.urlBase + '/updatedraftlisting/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(this.state.fields)),
                this.props.urlBase + '/relist/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(
                    
                    { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                    ['pictures']: this.state.pictures.map(item => item) }
                
                )), 
                
                { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                ['pictures']: this.state.pictures.map(item => item) }
                
                , listingsTemp


                );
            
                

            
                this.props.handleClose();
            
        }


        handleSaveFormOnline = () => {

            this.setState(
                {
                    fields: 
                    { ...this.state.fields, 
                        ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                        ['pictures']: this.state.pictures.map(item => item),
                        /*['locationValues']: this.state.currentLocations.map(item => item),*/
                        /*['hasCompatibility']: this.state.currentHasCompatibility,*/                         
                    }  
                
                }
            )

            

            let tempFields = { ...this.state.fields, 
                ['conditionDescription']: this.state.fields.condition !== '0' ? [this.state.fields.conditionDescription] : [],
                ['pictures']: this.state.pictures.map(item => item),                                            
            };

            console.log(tempFields);

            let listingsTemp = this.props.listings.map(item => { if (item.sku === this.props.item.sku) { return tempFields}  return item })

            
                this.props.listingUpdateDatabase(this.props.urlBase + '/updatelisting/' + this.state.fields.sku + '/' + 
                encodeURIComponent(JSON.stringify(
                    
                    { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                ['pictures']: this.state.pictures.map(item => item) }
                
                )), 
                
                { ...this.state.fields, ['conditionDescription']: this.state.fields.condition !== '0' ? this.state.fields.conditionDescription : [],
                ['pictures']: this.state.pictures.map(item => item) }
                
                , listingsTemp);
            

                
            
                this.props.handleClose();
            
        }

        handleApplyDeleteListing = () => {
            //this.props.handleDeleteListing();
            this.props.handleClose();
        }

        handleCancelForm = () => {
            //this.props.listingDraftUpdated(this.state.fields);
            this.props.handleClose();
        }

        checkSizeTitle = (title) => {
            if (title.length > 80) {
                return false;
            }

            return true;
        }

        checkQuantity = (quantity) => {
            if (Number(quantity) < 0) {
                return false;
            }

            return true;
        }

        handleChangeField = (e, data) => {
            
            let doChange = true;

            switch(data.id){
                case "title":
                    doChange = this.checkSizeTitle(data.value);
                    break;
                case "quantity":
                case "price":    
                    doChange = this.checkQuantity(data.value);
                    break;

            }

            //console.log(data);
            
            if (doChange){
                this.setState({
                    fields: {...this.state.fields, [data.id]: data.value}
                })
            }
        
        }

        handleCheckField = (e, data) => {

            //console.log(data);
            
                this.setState({
                    fields: {...this.state.fields, [data.id]: data.checked}
                })
            
        }

        handleInit = () => {
            /*this.pond.setOptions(
                {
                    fileRenameFunction: (file) => {
                        return `my_new_name${file.extension}`;
                    }
                }
            )*/
            console.log(this.pond);
        }

        errorMessage = () => {

                   
            
            if (this.state.fields.partNumbers.length === 0){
                return "partnumbersError"
            }

            if (!this.state.fields.brand){
                return "brandError"
            }

            if (Number(this.state.fields.quantity) < 1){
                return "quantityError"
            }
            
            if (this.state.fields.title.length <= 0){
                return "titleError"
            }

            if (Number(this.state.fields.price) <= 0){
                return 'priceError'
            }

            if (this.state.fields.location.length === 0){
                return 'locationError'
            }
            
            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 2 && this.state.fields.domestic === '0'){
                return "domesticError"
            }

            if (this.state.fields.weightUnit === 'oz' && Number(this.state.fields.weight) > 16 && this.state.fields.domestic === '0'){
                return "domesticError"
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 70 && this.state.fields.domestic === '1'){
                return "domesticError"
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 150 && this.state.fields.domestic === '5'){
                return "domesticError"
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 150 && this.state.fields.domestic === '2'){
                return "domesticError"
            }            

            return ""
        }

        validateFields = () => {

            if (this.state.pictures.length === 0){
                return false
            }

            if (Number(this.state.fields.quantity) < 1){
                return false
            }

            if (!this.state.fields.brand){
                return false
            }

            if (this.state.fields.title.length <= 0){
                return false
            }

            if (Number(this.state.fields.price) <= 0){
                return false
            }

            if (this.state.fields.partNumbers.length === 0){
                return false
            }

            if (this.state.fields.location.length === 0){
                return false
            }
            

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 1 && this.state.fields.domestic === '0'){
                return false
            }

            if (this.state.fields.weightUnit === 'oz' && Number(this.state.fields.weight) > 16 && this.state.fields.domestic === '0'){
                return false
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 70 && this.state.fields.domestic === '1'){
                return false
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 150 && this.state.fields.domestic === '5'){
                return false
            }

            if (this.state.fields.weightUnit === 'lbs' && Number(this.state.fields.weight) > 150 && this.state.fields.domestic === '2'){
                return false
            }

            return true
        }

        handleUpdateItem = (fileItems) => {
            if (fileItems.length > 0){
                console.log(fileItems);
                let idPic = uuidv4();


                const data = new FormData();
                data.append('file', fileItems[0].file);
                data.append('name', idPic);

                //data.append('name', fileItems[0].file.name);

                const config = {
                    method: 'POST',
                    body: data,
                    /*headers: {
                      'Content-Type': 'multipart/form-data',
                    },*/
                };
                
                fetch(this.props.urlBase + '/upload', config)
                  .then((response) => {
            
                    //this.setState({uploadingPicture: false});
                    this.setState({
                        pictures: this.state.pictures.concat(idPic),
                    })

                    return response
                
                   })  
                  .catch((error) => {
                    //this.setState({uploadingPicture: false});
                    console.error(error);
                  });

                  
            
            
            }
        }
        
    
        render(){
           const { currentPartNumbers } = this.state
           const renderLabel = label => ({
                    color: 'black',
                    content: label.text,
                    icon: 'warehouse',
                }
            )

            const imagesTable = (pictures) => {
                return (
                    <span>
                        
                        <ImageList key = {pictures[0]} id = {pictures[0]} imageUrl = {this.props.urlBase+"/images/" + pictures[0] + ".jpg"} />
                        <ImageList key = {pictures[pictures.length-1]} id = {pictures[pictures.length-1]} imageUrl = {this.props.urlBase+"/images/" + pictures[pictures.length-1] + ".jpg"} />
                        
                    </span>
        
                )
            }

            /*if (this.props.listingDraftIsLoading === true){
                return (
                    <p>Saving</p>
                )
            }*/

          return (
            <div>
            
            
            <Form>

                <Image.Group>

                       

            <ImagesLightBoxForm 
                server = {this.props.urlBase+"/images/"} 
                size='tiny' 
                pictures = {this.state.pictures}
                deletePicture = {this.deletePicture}
                />

               

            
            
            

            </Image.Group>

            
            <FilePond 
                ref={ref => this.pond = ref}
                allowMultiple={false} 
                name={"file"}
                onupdatefiles={this.handleUpdateItem} 
            
            />
            
            

                
                
                { (this.errorMessage() === "partnumbersError") && 
                    <Message negative>
                        <Message.Header>Missing Part Number!</Message.Header>
                        <p>Add at least one part number</p>
                    </Message>
                }

                <Form.Field>
                    <label>Part Numbers</label>
                    <Dropdown id="partNumbers" /*value={   this.state.fields.partNumbers.map(item => ({value: item, text: item})) }*/
                        selection
                        search
                        value={currentPartNumbers}
                        options={this.state.optionsPartNumbers}
                        allowAdditions 
                        multiple 
                        allowAdditions
                        placeholder='Add Part Numbers'
                        onAddItem={this.handleAdditionPartNumbers}
                        onChange={this.handleChangePartNumbers}
                        noResultsMessage = ""
                        lazyLoad
                        closeOnChange

                        />
                    
                </Form.Field>
                { (this.errorMessage() === "brandError") && 
                    <Message negative>
                        <Message.Header>Missing Brand!</Message.Header>
                        <p>Brand is mandatory</p>
                    </Message>
                }

                <Form.Field>
                    <label>Brand</label>
                    <Dropdown id="partNumbers" /*value={   this.state.fields.partNumbers.map(item => ({value: item, text: item})) }*/
                        selection
                        search
                        value={this.state.fields.brand}
                        options={this.state.optionsBrand}
                        allowAdditions 
                        //multiple 
                        //allowAdditions
                        placeholder='Add Brand'
                        onAddItem={this.handleAdditionBrand}
                        onChange={this.handleChangeBrand}
                        noResultsMessage = ""
                        lazyLoad
                        closeOnChange
                        />
                    
                </Form.Field>

                
                { (this.errorMessage() === "titleError") && 
                    <Message negative>
                        <Message.Header>Missing Title!</Message.Header>
                        <p>Title can't be empty</p>
                    </Message>
                }
                <Form.Field>
                    <label>Title</label>
                    <Input id="title" value={this.state.fields.title} onChange={this.handleChangeField} placeholder="Title" />
                </Form.Field>

                
                <Form.Field>
                    <label>Compatibility Ebay Id</label>
                    
                {   
                    !this.state.fields.hasCompatibility ?
                    
                    <Input id="compatibilityEbayId" value={this.state.fields.compatibilityEbayId} onChange={this.handleChangeField} placeholder="Compatibility Ebay ID" />
                    
                    : 
                    <span>
                        <Label>Has Compatibility</Label>
                        <Button
                            onClick={() => this.setState({
                                fields: {...this.state.fields, hasCompatibility: false },
                            })}

                            circular

                            size='small'
                            
                            icon='edit'

                            color='blue'
                        />
                    </span>
                }


                
                </Form.Field>

                
                    
                {   
                    !this.state.fields.hasCompatibility ?
                    <Form.Field>
                    <label>Url Fitment</label>
                    <Input id="compatibilityUrl" value={this.state.fields.compatibilityUrl} onChange={this.handleChangeField} placeholder="Compatibility Url" />
                    </Form.Field>
                    : <span></span>
                }
                
                

                

                {/*<Form.Field>
                    <label>UPC</label>
                    <Input id="upc" value={this.state.fields.upc} onChange={this.handleChangeField} placeholder="UPC" />
                </Form.Field>*/}
                { (this.errorMessage() === "quantityError") && 
                    <Message negative>
                        <Message.Header>Missing Quantity!</Message.Header>
                        <p>Quantity must be greater than 0</p>
                    </Message>
                }   
                <Form.Field>
                    <label>Quantity</label>
                    <Input type="number" id="quantity" value={this.state.fields.quantity} onChange={this.handleChangeField} />
                </Form.Field>

                { (this.errorMessage() === "priceError") && 
                    <Message negative>
                        <Message.Header>Missing Price!</Message.Header>
                        <p>Price must be greater than 0</p>
                    </Message>
                }   



                <Form.Field>

                { (this.state.fields.checkPrice === true && this.state.fields.status === "online") ?  <span>
                        
                        <Modal 
                        trigger={<Button size='mini' circular color='yellow' onClick = {this.handlePriceOpen} icon='warning' />}
                        open={this.state.modalPriceOpen}
                        onClose={this.handlePriceClose}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                      >
                      <Header icon='hand point down outline' content='Change Price' />
                      <Modal.Content>
                          
                          {this.state.lowerPriceItem !== null &&
                            <div>
                                {/*<p>{JSON.stringify(this.state.priceItem.condition)}</p>
                                <p>{JSON.stringify(this.state.priceItem.conditionDescription)}</p>*/}
                                
                                
                                
                              <Grid columns={2} divided>
                              <Grid.Row>
                              <Grid.Column>
                                {this.state.priceItem.pictures.length > 0 ? imagesTable(this.state.priceItem.pictures) : <div>
                                <Icon name='images' size='big' /></div>}
                                
                                <h3>{this.state.priceItem.title}</h3>
                                <h3>{window.helpers.getConditionFromId(this.props.conditions, this.state.fields.condition)}</h3>

                                    
                                
                                 <Segment basic textAlign='center'>

                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='tag' />
                                        Price                                  
                                    </Header>
                                </Divider>
                                 
                                {/*<label><h4>Price</h4></label>*/}
                                <Input id="price" type="number" step="0.1" value={this.state.priceItem.price} onChange={this.handleChangeFieldPrice} />
                                
                                </Segment>
                                
                                {/*<h3>Status: {window.helpers.getConditionFromId(this.props.conditions, this.state.priceItem.condition)}</h3>*/}
                               </Grid.Column>   
                               <Grid.Column>
                              
                                <Image size='small' src = {this.state.lowerPriceItem.picture}></Image>
                                <h3>{this.state.lowerPriceItem.title}</h3>
                                <h3>Price: {this.state.lowerPriceItem.price}</h3>
                                <h3>Condition: {this.state.lowerPriceItem.condition}</h3>
                                

                                <Segment basic textAlign='center'>
                                
                                    

                                <Grid columns={2} divided>
                                
                                <Grid.Row>
                                
                                <Grid.Column>
                                <h4><a href={this.state.lowerPriceItem.linkUrl} target="_blank">Go to Listing in Ebay</a></h4>
                                </Grid.Column>
                                <Grid.Column>
                                <h4><a href={`https://www.ebay.com/sch/i.html?_nkw=${this.props.item.partNumbers[0]}&_stpos=33021&_fspt=1&LH_PrefLoc=1&LH_BIN=1&_sop=15&LH_ItemCondition=
                                ${conditionEbayQuery(this.props.item.condition)}`} target="_blank">Search Results in Ebay</a></h4>
                                </Grid.Column>
                                
                                </Grid.Row>

                                </Grid>

                                </Segment>
                              
                              
                              </Grid.Column>
                               </Grid.Row>
                               </Grid>
                            </div>
                          }

                          {this.state.lowerPriceItem === null && 
                            
                                <div className='App'><Icon loading name='spinner' size='huge' /></div>
                            
                          }
                          
                          
                          
                          
                      
                      
                      </Modal.Content>

                      <Modal.Actions>                        
                        <Button onClick = {this.handlePriceListing} color='green'>
                            <Icon name='checkmark' /> Apply
                        </Button>
                        <Button onClick = {this.handleDismissPriceListing} color='yellow'>
                            <Icon name='checkmark' /> Dismiss
                        </Button>
                        <Button onClick = {this.handleDismissForeverPriceListing} color='red'>
                            <Icon name='checkmark' /> Dismiss Forever
                        </Button>
                        <Button onClick = {this.handlePriceClose} color='black'>
                            <Icon name='cancel' /> Cancel
                        </Button>
                      </Modal.Actions>

                    </Modal></span> : <span></span> }
































                    <label>Price</label>
                    <Input type="number" step="0.1" id="price" value={this.state.fields.price} onChange={this.handleChangeField} />
                </Form.Field>

                <Form.Field>
                    <label>Best Offer</label>
                    <Checkbox id="bestOffer" toggle checked={this.state.fields.bestOffer} onChange={this.handleCheckField} />
                </Form.Field>

                <Form.Field>
                    <label>Description</label>
                    <TextArea id="description" value={this.state.fields.description} onChange={this.handleChangeField} />
                </Form.Field>
                
                { (this.errorMessage() === "domesticError") && 
                    <Message negative>
                        <Message.Header>Domestic Shipping Service Error!</Message.Header>
                        <p>Change Physical Information or Domestic Shipping Service</p>
                    </Message>
                }
                

                <Form.Field>
                    <label>Domestic Shipping</label>
                    <Dropdown id="domestic" defaultValue={this.state.fields.domestic} selection 
                        options={window.helpers.shippingOptions}
                        onChange={this.handleChangeField} />
                </Form.Field>

                <Form.Field>
                    <label>Free Shipping</label>
                    <Checkbox id="freeShipping" toggle checked={this.state.fields.freeShipping} onChange={this.handleCheckField} />
                </Form.Field>

                <Form.Field>
                    <label>International Shipping</label>
                    <Dropdown id="international" defaultValue={this.state.fields.international} selection 
                        options={window.helpers.internationalShippingOptions}
                        onChange={this.handleChangeField} />
                </Form.Field>
                <Form.Field>
                <Label ><Icon name='balance scale' /> Physical Information</Label>
                </Form.Field>
                <Form.Group inline widths='equal'>
                    <Form.Field>
                        <Input id="length" label="Length" type="number" value={this.state.fields.length} onChange={this.handleChangeField}/>
                    </Form.Field>
                    <Form.Field>
                        <Input id="width" label="Width" type="number" value={this.state.fields.width} onChange={this.handleChangeField} />
                    </Form.Field>
                    <Form.Field>
                        <Input id="depth" label="Depth" type="number" value={this.state.fields.depth} onChange={this.handleChangeField} />
                    </Form.Field>

                    

                </Form.Group>    

                <Form.Group inline widths='equal'>
                    <Form.Field>
                        <Input id="weight" label="Weight" type="number" value={this.state.fields.weight} onChange={this.handleChangeField} />
                    </Form.Field>

                    <Form.Field>
                        <label>Weight Unit</label>
                        <Dropdown id="weightUnit" defaultValue={this.state.fields.weightUnit} selection 
                            options={window.helpers.weightUnit}
                            onChange={this.handleChangeField} />
                    </Form.Field>    
                </Form.Group>

                <Form.Field>
                    <label>Condition</label>
                    <Dropdown id="condition" defaultValue={this.state.fields.condition} selection 
                        options={window.helpers.conditionOptions}
                        onChange={this.handleChangeField} />
                </Form.Field>

                { this.state.fields.condition !== '0' ?
                    <Form.Field>
                        <label>Condition Description</label>
                        <Input id="conditionDescription" value={this.state.fields.conditionDescription} onChange={this.handleChangeField} 
                        placeholder="Condition Description" />
                    </Form.Field> : <span></span>
                }           

                { (this.errorMessage() === "locationError") && 
                    <Message negative>
                        <Message.Header>Missing Location!</Message.Header>
                        <p>Don't forget to add at least one Location</p>
                    </Message>
                }   
                <Form.Field>
                <label>Locations</label>
                    <Dropdown id="locations" /*value={   this.state.fields.partNumbers.map(item => ({value: item, text: item})) }*/
                        selection
                        search
                        value={this.state.fields.location}
                        options={this.state.optionsLocations}
                        allowAdditions 
                        multiple 
                        allowAdditions
                        placeholder='Add Locations'
                        onAddItem={this.handleAdditionLocations}
                        onChange={this.handleChangeLocations}
                        noResultsMessage = ""
                        minCharacters = {2}
                        renderLabel={renderLabel}
                        closeOnChange
                        lazyLoad
                        />
                </Form.Field>

                { this.state.fields.status === 'offline' ?
                <Form.Field>
                    <label>Ebay Account</label>
                    <Dropdown id="ebayAccount" defaultValue={this.state.fields.ebayAccount} selection 
                        options={this.state.optionsEbayAccount}
                        onChange={this.handleChangeField} />    
                </Form.Field>
                : <span></span>
                }

                { this.state.fields.status === "offline" && 
                   <Button color="blue" onClick = {this.handleSaveForm} >Save as Draft</Button>
                }

                { (this.state.fields.status === "offline" && this.validateFields() && !this.props.item.itemId) ? 
                        <Button color="green" onClick = {this.handleSaveFormUpload} >Upload</Button> : <span></span>
                }

                { (this.state.fields.status === "offline" && this.validateFields() && this.props.item.itemId) ? 
                        <Button color="green" onClick = {this.handleSaveFormRelist} >Relist</Button> : <span></span>
                }

                { (this.state.fields.status === "online" && this.validateFields()) &&
                      <Button color="green" onClick = {this.handleSaveFormOnline} >Apply Changes</Button> 
                }

                { (this.state.fields.status === "online" && this.validateFields()) &&                

                <Modal 
                        trigger={<Button color ="yellow" onClick = {this.props.handleCancelOpen}>Convert to Draft</Button>}
                        open={this.props.modalCancelOpen}
                        onClose={this.props.handleCancelClose}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                      >
                      <Header icon='hand point down outline' content='Convert this item to draft again' />
                      <Modal.Content>
                          <h3>Do you want to convert "{this.props.item.title}" to draft again</h3>
                      </Modal.Content>

                      <Modal.Actions>
                        <Button onClick = {this.props.handleCancelClose} color='red'>
                            <Icon name='remove' /> No
                        </Button>
                        <Button onClick = {this.props.handleCancelListing} color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                      </Modal.Actions>

                </Modal>

                }



                <Modal 
                        trigger={<Button color ="red" onClick = {this.props.handleDeleteOpen}>Delete</Button>}
                        open={this.props.modalDeleteOpen}
                        onClose={this.props.handleDeleteClose}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                      >
                      <Header icon='trash' content='Delete Listing' />
                      <Modal.Content>
                          <h3>Are you sure you want to delete "{this.props.item.title}"</h3>
                      </Modal.Content>

                      <Modal.Actions>
                        <Button onClick = {this.props.handleDeleteClose} color='red'>
                            <Icon name='remove' /> No
                        </Button>
                        <Button onClick = {this.props.handleDeleteListing} color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                      </Modal.Actions>

                </Modal>


                
                <Button color="black" onClick = {this.handleCancelForm} /*type='cancel'*/>Cancel</Button>
            </Form>


            </div>
          )
        }
}



const mapStateToProps = (state) => {
    return {
        urlBase: state.urlBase,
        ebayMarketplaces: state.ebayMarketplaces,
        listingDraftIsLoading: state.listingDraftIsLoading,
        listingDraft: state.listingDraft,
        listings: state.listings,
        conditions: state.conditions,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        brandAddDatabase: (url, id, value) => dispatch(brandAddDatabase(url, id, value)),
        locationAddDatabase: (url, id, value) => dispatch(locationAddDatabase(url, id, value)),
        listingDraftUpdated: (listingDraft) => dispatch(listingDraftUpdated(listingDraft)),
        listingDraftUpdateDatabase: (url, listingDraft, listings) => dispatch(listingDraftUpdateDatabase(url, listingDraft, listings)),
        listingUpdateDatabase: (url, listingDraft, listings) => dispatch(listingUpdateDatabase(url, listingDraft, listings)),
        listingCreateEbay: (urlUpdate, urlCreate, listingDraft, listings) => dispatch(listingCreateEbay(urlUpdate, urlCreate, listingDraft, listings)),
        listingRelistEbay: (urlUpdate, urlRelist, listingDraft, listings) => dispatch(listingRelistEbay(urlUpdate, urlRelist, listingDraft, listings)),
        
        //addNewLocation: (newLocation) => dispatch(addNewLocation(newLocation)),
        
    };
  };

  //export default ListingForm;

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);