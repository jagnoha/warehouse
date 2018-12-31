import React, {Component} from 'react'

import { 
    Label, Icon
 } from 'semantic-ui-react'


class AmazonTag extends Component { 
    
    render(){   
    const amazon = this.props.amazon;

    if (amazon !== 'pending' && amazon !== undefined && amazon !== ''){
      return (
        <Label color='yellow'>
          <Icon color='black' name='amazon' size='big' /><span className='App-label'>Asin: {amazon} </span> 
        </Label>
      )
    } else if (amazon === 'pending') {
      return (
        <Label color='yellow'>
          <Icon color='black' name='amazon' size='big' /><Icon color='black' size='big' name='spinner' /> 
        </Label>
      )
    } else {
        return <span></span>
    }
    
}
}

export default AmazonTag;
  