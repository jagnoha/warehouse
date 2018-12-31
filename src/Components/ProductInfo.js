import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../helpers.js'
import { 
    Image, Label, Icon
 } from 'semantic-ui-react';

 import LocationWarning from './LocationWarning';
 import AmazonTag from './AmazonTag';
 import ebayLogo from '../ebay-brands.svg';
 
class ProductInfo extends Component {
    render(){

    return (
    <div>
        {window.helpers.outOfStock(this.props.quantity)}
        {this.props.hasCompatibility ? <Label size='small' color='blue'><Icon name='car' />Fitments</Label> : ""} 
        <h3>{this.props.title}</h3>
        <div>
            <LocationWarning length = {this.props.location.length} qty = {this.props.quantity} status = {this.props.status} />
        </div>
                      
        <div>
            {this.props.location.map((item, index) => 
                <Label key={index} color='black'><Icon name='warehouse' />{item}</Label>
            )}


        </div>
                      
                      
                      
        <div>
            <br></br>
            <Label><Image avatar spaced='right' src={ebayLogo} />{this.props.ebayMarketplace}</Label>
            <AmazonTag amazon={this.props.asin} />
            
        </div> 
    </div>)
}
}
    //)
/*
ProductInfo.propTypes = {
    quantity: PropTypes.string.isRequired,
    hasCompatibility: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.oneOf(['online', 'offline', 'processing', 'error']).isRequired,
    ebayMarketplace: PropTypes.string.isRequired,
}
*/
export default ProductInfo;