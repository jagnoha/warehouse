import React, { Component } from 'react';
import '../App.css';
import '../helpers.js';
import { 
    Button, Form, Input, TextArea, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon, Checkbox, Modal } from 'semantic-ui-react';
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

const uuidv4 = require('uuid/v4');

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileRename);




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

            //currentHasCompatibility: this.props.item.hasCompatibility,
            //currentBrand: window.helpers.getBrandFromId(this.props.brands, this.props.item.brand),  
            

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

        validateFields = () => {
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

            if (this.state.pictures.length === 0){
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

                <Form.Field>
                    <label>Quantity</label>
                    <Input type="number" id="quantity" value={this.state.fields.quantity} onChange={this.handleChangeField} />
                </Form.Field>

                <Form.Field>
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

                { this.state.fields.status === "offline" ?
                   <Button color="blue" onClick = {this.handleSaveForm} >Save as Draft</Button> : <span></span>
                }

                { (this.state.fields.status === "offline" && this.validateFields() && !this.props.item.itemId) ? 
                        <Button color="green" onClick = {this.handleSaveFormUpload} >Upload</Button> : <span></span>
                }

                { (this.state.fields.status === "offline" && this.validateFields() && this.props.item.itemId) ? 
                        <Button color="green" onClick = {this.handleSaveFormRelist} >Relist</Button> : <span></span>
                }

                { (this.state.fields.status === "online" && this.validateFields()) ?
                    <Button color="green" onClick = {this.handleSaveFormOnline} >Apply Changes</Button> : <span></span>
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
                        <Button onClick = {this.props.handleDeleteClose} color='green'>
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