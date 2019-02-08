import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ProductInfo from './ProductInfo'
import { 
    Button, Label, Table, Header, Image, Grid, Checkbox, Icon, Modal, 
 } from 'semantic-ui-react'

 import Price from './Price'
 import ImagesLightBox from './ImagesLightBox'
 import ImagesLightBoxForm from './ImagesLightBoxForm'
 import { connect } from 'react-redux'
 import '../helpers.js'
 import { changeProductsSelected, listingDraftDeleteDatabase, listingDeleteDatabase } from '../modules/actions'
 //import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
 import ListingForm from './ListingForm';
 import AmazonTag from './AmazonTag';
 import ebayLogo from '../ebay-brands.svg';
 import '../helpers.js';
 import ImageUploader from 'react-images-upload';
 import ImageList from './ImageList';

 //const urlbase = 'http://10.0.0.216:8083';
 //const urlbase = 'http://192.168.1.11:8083';
//const Product = (key, item, locationsItem, brandItem, userListItem, conditionItem, ebayMarketplaceItem ) => (
class Product extends Component {
    
    state = {
        modalOpen: false,
        modalDeleteOpen: false,
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

    handleClose = () => { 
        
        this.setState({ modalOpen: false })
    
    }

    handleDeleteClose = () => { 
        
        this.setState({ modalDeleteOpen: false })
    
    }

    handleDeleteListing = () => {

        let listingsTemp = this.props.listings.filter(item => item.sku !== this.props.item.sku);
        
        if (this.props.item.status === "offline") {

        this.props.listingDraftDeleteDatabase(this.props.urlBase + '/deleteofflinelisting/' + this.props.item.sku, listingsTemp )
        
        } else {
            this.props.listingDeleteDatabase(this.props.urlBase + '/deletelisting/' + this.props.item.sku, listingsTemp )
        }
        this.setState({ modalDeleteOpen: false })
    
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
                        />
                      
                    </Table.Cell>
                    <Table.Cell>                
                      {this.props.item.quantity}
                    </Table.Cell>
                    <Table.Cell>
                        <Price price = {this.props.item.price} />
                      
                    </Table.Cell>
                    <Table.Cell><div>{this.props.item.timestamp}</div> <span className='App-secondary-table-title'>{this.props.item.lastModified}</span></Table.Cell>
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
                            modalDeleteOpen = {this.state.modalDeleteOpen} handleDeleteOpen = {this.handleDeleteOpen} />
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
        
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Product);