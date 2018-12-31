import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'


//const Price = (price) => {
class Price extends Component {    
    render(){
        if (Number(this.props.price) <= 0){
        return <span><Icon color='blue' name='warning sign' />USD$ {this.props.price}</span>
    } else {
        return <span>USD$ {this.props.price}</span>
    }
}

}
/*
Price.propTypes = {
    price: PropTypes.string.isRequired,
}
*/
export default Price
