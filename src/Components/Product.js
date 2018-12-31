import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ProductInfo from './ProductInfo'
import { 
    Button, Label, Table, Checkbox, Icon, Placeholder
 } from 'semantic-ui-react'

 import Price from './Price'
 import ImagesLightBox from './ImagesLightBox'
 import { connect } from 'react-redux'
 import '../helpers.js'
 import { changeProductsSelected } from '../modules/actions'


//const Product = (key, item, locationsItem, brandItem, userListItem, conditionItem, ebayMarketplaceItem ) => (
class Product extends Component {    
    
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
    
    const imagesTable = (pictures) => {
        return (
            <span>
                
                
                <ImagesLightBox server={"http://192.168.1.11:8083/images/"} size='tiny' key={0} pictures = {pictures} photoIndex = {0} />
                
                
                <ImagesLightBox server={"http://192.168.1.11:8083/images/"} size='tiny' key={1} pictures = {pictures} photoIndex = {pictures.length-1} />
                
            </span>

        )
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
                      
                      {this.props.conditionItem}
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
                      
      
                      <Button icon='edit' />  
                      <Button icon='trash' />
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
        /*locations: state.locations,
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
        productsByPage: state.productsByPage,*/      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Product);