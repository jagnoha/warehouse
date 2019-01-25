import React, { Component } from 'react'
import { Image, Modal, Button, Icon } from 'semantic-ui-react'

class ImageList extends Component {
  
       
    render() {


        
      
      
      return (
        <span>
          
       
                

                
                <Modal size="small" centered trigger={<Image size="tiny" src = {this.props.imageUrl}  />}>
                
                <Modal.Content>
                  <Image centered size="huge" src = {this.props.imageUrl}  />                                   
                </Modal.Content>
                
                
                </Modal>

                
        
        
        
        
        
        
        </span>







             
            
            
            
            
         
          
        
      );
    }
  }

export default ImageList