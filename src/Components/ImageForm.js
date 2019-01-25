import React, { Component } from 'react'
import { Image, Modal, Button, Icon } from 'semantic-ui-react'

class ImageForm extends Component {
  
   handleDeletePicture = () => {
       this.props.deletePicture(this.props.id)
   }
    
    render() {


        
      
      
      return (
        <span>
          
       
                

                
                <Modal size="small" centered trigger={<Image size="tiny" src = {this.props.imageUrl}  />}>
                
                <Modal.Content>
                  <Image centered size="huge" src = {this.props.imageUrl}  />                                   
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick = {this.handleDeletePicture} color='red'>
                        <Icon name ='trash' />
                        Delete
                    </Button> 
                </Modal.Actions>
                
                </Modal>

                
        
        
        
        
        
        
        </span>







             
            
            
            
            
         
          
        
      );
    }
  }

export default ImageForm