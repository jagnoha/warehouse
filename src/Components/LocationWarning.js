import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Icon} from 'semantic-ui-react'


//const LocationWarning = ({length, qty, status}) => {
class LocationWarning extends Component {
    render(){
        if (this.props.length === 0 && this.props.qty > 0 && this.props.status === 'offline'){
        return <Label color='teal' size="small"><Icon name='warning sign' />Still in the pallet</Label>
    } else if (this.props.length === 0 && this.props.qty > 0 && this.props.status === 'online'){
        return <Label color='yellow' size="small"><Icon name='warning sign' />Missing Location</Label>
    } else {
        return <p></p>
    }
    
}
}
//}
/*
LocationWarning.propTypes = {
    length: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['online', 'offline', 'processing', 'error']).isRequired,
}
*/
export default LocationWarning