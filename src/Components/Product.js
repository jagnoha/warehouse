import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ProductInfo from './ProductInfo'
import { 
    Button, Label, Grid, Table, Header, Dropdown, Image, Checkbox, Segment, Divider, Input, Icon, Modal, 
 } from 'semantic-ui-react'

 import Price from './Price'
 import ImagesLightBox from './ImagesLightBox'
 import ImagesLightBoxForm from './ImagesLightBoxForm'
 import { connect } from 'react-redux'
 import '../helpers.js'
 import { changeProductsSelected, listingDraftDeleteDatabase, listingsUpdate, listingDeleteDatabase, listingCancelEbay } from '../modules/actions'
 //import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
 import ListingForm from './ListingForm';
 import AmazonTag from './AmazonTag';
 import ebayLogo from '../ebay-brands.svg';
 import '../helpers.js';
 import ImageUploader from 'react-images-upload';
 import ImageList from './ImageList';
 import Moment from 'react-moment';
 import 'moment-timezone';
 import axios from 'axios';
 import '../helpers.js';

 //const urlbase = 'http://10.0.0.216:8083';
 //const urlbase = 'http://192.168.1.11:8083';
//const Product = (key, item, locationsItem, brandItem, userListItem, conditionItem, ebayMarketplaceItem ) => (

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

class Product extends Component {
    
    state = {
        modalOpen: false,
        modalDeleteOpen: false,
        modalCancelOpen: false,
        modalPriceOpen: false,
        lowerPriceItem: null,
        priceItem: null,
        fullItem: null,
        //pictures: this.props.item.pictures.map(item => item),
    }

    

    onDrop = (picture) => {
        console.log(picture);
        /*this.setState({
            pictures: this.state.pictures.concat(picture),
        });*/
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })        
    }

    handleDeleteOpen = () => this.setState({ modalDeleteOpen: true })

    handleCancelOpen = () => this.setState({ modalCancelOpen: true })

    handlePriceOpen = () => {
        this.setState({ modalPriceOpen: true })

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
          }

        axios.get(`https://29508158.ngrok.io/ebaysearch/${this.props.item.partNumbers[0]}/33021/${getConditionCode(this.props.item.condition)}`, config)          
        .then(response => {
      
            this.setState({
                lowerPriceItem: response.data,
                priceItem: {
                    sku: this.props.item.sku,
                    itemId: this.props.item.itemId,
                    pictures: this.props.item.pictures,
                    title: this.props.item.title,
                    price: this.props.item.price,
                    condition: this.props.item.condition,
                    conditionDescription: this.props.item.conditionDescription,
                    quantity: this.props.item.quantity,
                },
                fullItem: this.props.item,
            })
                        

        }).catch(error => {
                alert(error);
            }
        );

    }

    checkSizeTitle = (title) => {
        if (title.length > 80) {
            return false;
        }

        return true;
    }

    checkQuantity = (quantity) => {
        if (Number(quantity) <= 0) {
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
                priceItem: {...this.state.priceItem, [data.id]: data.value}
            })
        }
    
    }


    handleClose = () => { 
        
        this.setState({ modalOpen: false })
    
    }

    handleDeleteClose = () => { 
        
        this.setState({ modalDeleteOpen: false })
    
    }

    handlePriceClose = () => {
        this.setState({ modalPriceOpen: false, lowerPriceItem: null, priceItem: null, fullItem: null })
    }

    handleCancelClose = () => { 
        
        this.setState({ modalCancelOpen: false })
    
    }

    handleCancelListing = () => {

        let listingTemp = {...this.props.item, status: 'offline', itemId: ''}
        let listingsTemp = this.props.listings.filter(item => item.sku !== this.props.item.sku);
        let finalListings = listingsTemp.concat(listingTemp); 

        this.props.listingCancelEbay(this.props.urlBase + '/convertonlineoffline/' + this.props.item.sku, finalListings)

        this.setState({ modalCancelOpen: false, modalOpen: false })

    }

    handleDeleteListing = () => {

        let listingsTemp = this.props.listings.filter(item => item.sku !== this.props.item.sku);
        
        if (this.props.item.status === "offline") {

        this.props.listingDraftDeleteDatabase(this.props.urlBase + '/deleteofflinelisting/' + this.props.item.sku, listingsTemp )
        
        } else {
            this.props.listingDeleteDatabase(this.props.urlBase + '/deletelisting/' + this.props.item.sku, listingsTemp )
        }
        this.setState({ modalDeleteOpen: false, modalOpen: false })
    
    }

    handleDismissForeverPriceListing = () => {
        
        this.setState({
            lowerPriceItem: null,
        })
        
        axios.get(`https://29508158.ngrok.io/dismisspricereviseforever/${this.state.priceItem.sku}`)
        .then(response => {
            
            

            let listingsTemp = this.props.listings.filter(item => item.sku !== this.state.priceItem.sku);
            let newItem = {...this.state.fullItem, ['checkPrice']:false}
            let listingsNew = [...listingsTemp, newItem]     

            //this.props.listingsUpdate(listingsNew);
            this.props.listingsUpdate(listingsNew);

            this.setState(
                { 
                    modalPriceOpen: false, 
                    lowerPriceItem: null, 
                    priceItem: null,
                    fullItem: null,
                }
            )

            //alert(JSON.stringify(response.data));
                        

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
    
    
    }

    handleDismissPriceListing = () => {
        
        let tempItemId = this.state.lowerPriceItem.itemId;

        this.setState({
            lowerPriceItem: null,
        })
        
        axios.get(`https://29508158.ngrok.io/dismisspricerevise/${this.state.priceItem.sku}/${tempItemId}`)
        .then(response => {            
            

            let listingsTemp = this.props.listings.filter(item => item.sku !== this.state.priceItem.sku);
            let newItem = {...this.state.fullItem, ['checkPrice']:null}
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

            //alert(JSON.stringify(response.data));
                        

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
    
    
    }

    handlePriceListing = () => {
        
        this.setState({
            lowerPriceItem: null,
        })

        console.log(this.state.priceItem.price);

        let edited = false;

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
    
    }
    
    handleChecked = onClick => (e, data) => {
        
        if (data.checked === true){
            const selectedItems = this.props.productsSelected.concat(this.props.item.uuid);
            this.props.changeProductsSelected(selectedItems);
        } else {
            const selectedItems = this.props.productsSelected.filter(item => item !== this.props.item.uuid);
            this.props.changeProductsSelected(selectedItems);
        }
        
    }
    
    render(){

    const productsSelected = this.props.productsSelected;
    const uuid = this.props.item.uuid;   

        
    /*if (this.state.toEditProduct === true) {
        return <ListingForm />
    }*/
    
    const imagesTable = (pictures) => {
        return (
            <span>
                
                <ImageList key = {pictures[0]} id = {pictures[0]} imageUrl = {this.props.urlBase+"/images/" + pictures[0] + ".jpg"} />
                <ImageList key = {pictures[pictures.length-1]} id = {pictures[pictures.length-1]} imageUrl = {this.props.urlBase+"/images/" + pictures[pictures.length-1] + ".jpg"} />
                
                
                {/*<ImagesLightBox server={this.props.urlBase+"/images/"} size='tiny' key={0} pictures = {pictures} photoIndex = {0} />
                
                
                <ImagesLightBox server={this.props.urlBase+"/images/"} size='tiny' key={1} pictures = {pictures} photoIndex = {pictures.length-1} />
                */}
            </span>

        )
    }

    const viewStatus = (status, quantity) => {
        if (status === "online"){
            return (
                <Label size='small' color='green'>Online</Label>
            )
        } else if (status === "offline" && Number(quantity) < 1) {
            return (
                <Label size='small' color='red'>Out of Stock</Label>
            )
        } else if (status === "offline" && Number(quantity) > 0) {
            return (
                <Label size='small' color='yellow'>Draft</Label>
            )
        }
    }


    return (

        
        
        
    <Table.Row>
                    
                    <Table.Cell collapsing>
                      <Checkbox slider
                        checked={window.helpers.isProductChecked(productsSelected, uuid)}
                        onClick={this.handleChecked()}
                      >
                      /></Checkbox>
                    </Table.Cell>                    
                    <Table.Cell>
                      {this.props.userListItem}              
                    </Table.Cell>
                    <Table.Cell>
                      <Label color={window.helpers.getColorConnection(this.props.item.status)}>{this.props.item.status}</Label>                
                    </Table.Cell>
                    <Table.Cell>

                    { (this.props.picturesIsLoading.filter(item => item === this.props.item.uuid).length === 0 && this.props.item.pictures !== 'PENDING') ?
                        (this.props.item.pictures.length > 0 ? imagesTable(this.props.item.pictures) : <div className='App'>
                        <Icon name='images' size='big' /></div>) :  
                       <div className='App'><Icon loading name='spinner' size='large' /></div>
                    }

                    

                    
                      
                      </Table.Cell>                    
                    <Table.Cell>
                      
                      {/*this.props.conditionItem*/}
                      {window.helpers.getConditionFromId(this.props.conditions, this.props.item.condition)}
                      <div className='App-secondary-table-title'>{this.props.item.condition === '1' && this.props.item.conditionDescription !== null ? this.props.item.conditionDescription.map(item => item + ' ') : null }</div>
                    </Table.Cell>
                    <Table.Cell>
                    {this.props.brandItem}
                    </Table.Cell>
                    <Table.Cell>
                      <div>{this.props.item.partNumbers[0]}</div><span className='App-secondary-table-title'>{this.props.item.sku}</span>  
                    </Table.Cell>
      
      
      
                    <Table.Cell>
                        <ProductInfo 
                            quantity = {this.props.item.quantity} 
                            hasCompatibility = {this.props.item.hasCompatibility} 
                            title = {this.props.item.title}
                            location = {this.props.locationsItem}
                            ebayMarketplace = {this.props.ebayMarketplaceItem}
                            status = {this.props.item.status}
                            asin = {this.props.item.asin}
                            category = {this.props.item.category}
                        />
                      
                    </Table.Cell>
                    <Table.Cell>                
                      {this.props.item.quantity}
                    </Table.Cell>
                    <Table.Cell>
                        <Price price = {this.props.item.price} />
                        { (this.props.item.checkPrice === true && this.props.item.status === "online" && this.props.picturesIsLoading.filter(item => item === this.props.item.uuid).length === 0 && this.props.item.pictures !== 'PENDING') ?  <span>
                            <Icon size='small' circular bordered inverted color='yellow' name='warning' />
                       </span> : <span></span>}

                        { /*(this.props.item.checkPrice === true && this.props.item.status === "online" && this.props.picturesIsLoading.filter(item => item === this.props.item.uuid).length === 0 && this.props.item.pictures !== 'PENDING') ?  <span>
                        
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
                                
                                
                                
                                
                              <Grid columns={2} divided>
                              <Grid.Row>
                              <Grid.Column>
                                {this.state.priceItem.pictures.length > 0 ? imagesTable(this.state.priceItem.pictures) : <div>
                                <Icon name='images' size='big' /></div>}
                                <h3>{this.state.priceItem.title}</h3>

                                    <div>
                                    <label><h4>Title</h4></label>
                                    <Input fluid id="title" value={this.state.priceItem.title} onChange={this.handleChangeField} placeholder="Title" />
                                
                                    <label><h4>Condition</h4></label>
                                    <Dropdown id="condition" defaultValue={this.state.priceItem.condition} selection 
                                        options={window.helpers.conditionOptions}
                                        onChange={this.handleChangeField} />

                                    { this.state.priceItem.condition !== '0' ?
                                        <span><label><h4>Condition Description</h4></label>
                                            <Input id="conditionDescription" value={this.state.priceItem.conditionDescription} onChange={this.handleChangeField} 
                                             placeholder="Condition Description" /></span> : <span></span>
                                     }         
                
                                    <label><h4>Quantity</h4></label>
                                <Input id="quantity" type="number" value={this.state.priceItem.quantity} onChange={this.handleChangeField} />
                                
                                 </div>
                                
                                 <Segment basic textAlign='center'>

                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='tag' />
                                        Price                                  
                                    </Header>
                                </Divider>
                                 
                                <Input id="price" type="number" step="0.1" value={this.state.priceItem.price} onChange={this.handleChangeField} />
                                
                                </Segment>
                                
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

                    </Modal></span> : <span></span> 
                    
                
                        */ }  





                      
                    </Table.Cell>
                    
                    
                    <Table.Cell><div><Moment format="YYYY/MM/DD HH:mm">{this.props.item.timestamp}</Moment></div> <span className='App-secondary-table-title'>
                    
                    { this.props.item.lastModified ? <Moment format="YYYY/MM/DD HH:mm">{this.props.item.lastModified}</Moment> : <span></span>}
                    
                    </span></Table.Cell>
                    
                    
                    
                    
                    <Table.Cell collapsing>
                      
                    { (this.props.picturesIsLoading.filter(item => item === this.props.item.uuid).length === 0 && this.props.item.pictures !== 'PENDING') ?  <span>
                      <Modal 
                        trigger={<Button onClick = {this.handleOpen} icon='edit' />}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                      >       
                        <Modal.Header>

                          
                            <h3>{viewStatus(this.props.item.status, this.props.item.quantity)} {this.props.item.title}</h3>
                            <p> SKU: {this.props.item.sku}</p>
                            
                            <div>
                                <Label><Image avatar spaced='right' src={ebayLogo} />{this.props.ebayMarketplaceItem}</Label>
                                <AmazonTag amazon={this.props.item.asin} />                            
                            </div>
                        </Modal.Header>
                        <Modal.Content scrolling>
                            <ListingForm pictures = {this.state.pictures} handleClose = {this.handleClose} brands = {this.props.brands} 
                            item = {this.props.item} urlBase = {this.props.urlBase} locations = {this.props.locations} 
                            handleDeleteListing = {this.handleDeleteListing} handleDeleteClose = {this.handleDeleteClose} 
                            modalDeleteOpen = {this.state.modalDeleteOpen} handleDeleteOpen = {this.handleDeleteOpen}
                            modalCancelOpen = {this.state.modalCancelOpen} handleCancelClose = {this.handleCancelClose}
                            handleCancelOpen = {this.handleCancelOpen} handleCancelListing = {this.handleCancelListing}                           
                            />
                        </Modal.Content>
                      </Modal>
                      
                      
                      <Modal 
                        trigger={<Button onClick = {this.handleDeleteOpen} icon='trash' />}
                        open={this.state.modalDeleteOpen}
                        onClose={this.handleDeleteClose}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                      >
                      <Header icon='trash' content='Delete Listing' />
                      <Modal.Content>
                          <h3>Are you sure you want to delete "{this.props.item.title}"</h3>
                      </Modal.Content>

                      <Modal.Actions>
                        <Button onClick = {this.handleDeleteClose} color='red'>
                            <Icon name='remove' /> No
                        </Button>
                        <Button onClick = {this.handleDeleteListing} color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                      </Modal.Actions>

                    </Modal></span> : <span></span> }                     

                       
                    
                      
                     
                      
                    </Table.Cell>   
                               
              </Table.Row>
              
    )

}
}
//)
/*
Product.propTypes = {
    key: PropTypes.string.isRequired,
    item: PropTypes.shape({
        partNumbers : PropTypes.arrayOf(PropTypes.string).isRequired, 
        pictures : PropTypes.arrayOf(PropTypes.string).isRequired, 
        location : PropTypes.arrayOf(PropTypes.string).isRequired, 
        conditionDescription : PropTypes.arrayOf(PropTypes.string),
        uuid : PropTypes.string.isRequired, 
        itemId : PropTypes.string.isRequired,
        timestamp : PropTypes.string.isRequired,
        authorId : PropTypes.string.isRequired,
        sku : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired, 
        description : PropTypes.string.isRequired,
        category : PropTypes.shape({
            CategoryID: PropTypes.string,
            CategoryName: PropTypes.string,                
        }), 
        brand : PropTypes.string.isRequired,
        quantity : PropTypes.number.isRequired,
        condition : PropTypes.oneOf(['0','1','2','3']).isRequired,
        price : PropTypes.string.isRequired, 
        bestOffer : PropTypes.bool.isRequired,
        freeShipping : PropTypes.bool.isRequired,
        domestic : PropTypes.oneOf(['0','1','2','3','4','5']).isRequired,
        international: PropTypes.oneOf(['0','1']).isRequired, 
        length : PropTypes.string.isRequired, 
        width : PropTypes.string.isRequired, 
        depth : PropTypes.string.isRequired, 
        weight : PropTypes.string.isRequired, 
        weightUnit : PropTypes.string.isRequired, 
        compatibilityEbayId : PropTypes.string.isRequired, 
        hasCompatibility : PropTypes.bool.isRequired, 
        status : PropTypes.oneOf(['online', 'offline', 'processing', 'error']).isRequired,
        ebayAccount : PropTypes.string.isRequired, 
        amazonAccount : PropTypes.string.isRequired,
    }).isRequired,
    locationsItem: PropTypes.arrayOf(PropTypes.string),
    brandItem: PropTypes.string.isRequired,
    userListItem: PropTypes.string.isRequired,
    conditionItem: PropTypes.string.isRequired,
    ebayMarketplaceItem: PropTypes.string.isRequired,
}
*/

const mapStateToProps = (state) => {
    return {
        productsSelected: state.productsSelected,
        picturesIsLoading: state.picturesIsLoading,
        urlBase: state.urlBase,
        ebayMarketplaces: state.ebayMarketplaces, 
        brands: state.brands,
        locations: state.locations,
        listingDraftIsLoading: state.listingDraftIsLoading,
        listingDraft: state.listingDraft,
        direction: state.direction,
        clickedColumn: state.clickedColumn, 
        listings: state.listings,
        conditions: state.conditions,
        listingActive: state.listingActive,
        /*
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
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
        //fetchListings: (url, urlListing, clickedColumn, order) => dispatch(listingsFetchData(url, urlListing, clickedColumn, order)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        listingDraftDeleteDatabase: (url, listings) => dispatch(listingDraftDeleteDatabase(url, listings)),
        listingDeleteDatabase: (url, listings) => dispatch(listingDeleteDatabase(url, listings)),
        listingCancelEbay: (url, listings) => dispatch(listingCancelEbay(url, listings)),
        listingsUpdate: (listings) => dispatch(listingsUpdate(listings)),
        
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Product);