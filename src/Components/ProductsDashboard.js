import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import ProductsTable from './ProductsTable'
import ProductsDashboardPagination from './ProductsDashboardPagination'
import ProductsFilterByCondition from './ProductsFilterByCondition'
import ProductsFilterByStatus from './ProductsFilterByStatus'
import ProductsFilterByMarketplace from './ProductsFilterByMarketplace'
import ProductsFilterByUser from './ProductsFilterByUser'
import ProductsFilterBySearch from './ProductsFilterBySearch'
import ActionProductsSelected from './ActionProductsSelected'

//const ProductsDashboard = ({listings, locationsList, brandsList, usersList, conditionsList, ebayMarketplacesList} ) => (

class ProductsDashboard extends Component {
    render(){
        /*return (
            <div>
                <p>Hola</p>
            </div>
        )*/
    return (
    <div>
    <ActionProductsSelected />
    <ProductsFilterByCondition />
    <ProductsFilterByStatus /> 
    <ProductsFilterByMarketplace />
    <ProductsFilterByUser />
    <ProductsFilterBySearch />     
    <ProductsTable 
        /*listings = {this.props.listings}
        productsByPage = {this.props.productsByPage}
        activePage = {this.props.activePage} 
        productsListGrouped = {this.props.productsListGrouped}  
        locationsList = {this.props.locationsList} 
        brandsList = {this.props.brandsList} 
        usersList = {this.props.usersList} 
        conditionsList = {this.props.conditionsList}
        ebayMarketplacesList = {this.props.ebayMarketplacesList}*/
    />

    <ProductsDashboardPagination 
          /*productsListGrouped = {this.props.productsListGrouped}
          productsByPage = {this.props.productsByPage} 
          activePage = {this.props.activePage}
          productsListSorted = {this.props.productsListSorted}*/          
    /> 
     
    </div>
    
    
    )
//)}

    }
}
    /*
ProductsDashboard.propTypes = {
    listings: PropTypes.arrayOf(
        PropTypes.shape({
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
            amazonAccount : PropTypes.string.isRequired ,
        })
    ).isRequired,
    locationsList: PropTypes.arrayOf(
        PropTypes.shape({
             id : PropTypes.string.isRequired,
             value : PropTypes.string.isRequired,
        })
    ).isRequired,
    brandsList: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired, 
            value : PropTypes.string.isRequired,
        })
    ).isRequired,
    usersList: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired, 
            value : PropTypes.string.isRequired,
        })
    ).isRequired,
    conditionsList: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired, 
            value : PropTypes.string.isRequired,
        })
    ).isRequired,
    ebayMarketplacesList: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired, 
            ebayUserId : PropTypes.string.isRequired,
        })
    ).isRequired,
}
 */
export default ProductsDashboard

   