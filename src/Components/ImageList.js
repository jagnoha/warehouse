import React, { Component } from 'react'
import { Image, Modal, Button, Icon } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload';

class ImageList extends Component {
  
       
    render() {


        
      
      
      return (
        <span>
          
       
                

                
                <Modal size="small" centered trigger={  
                
                   <Image size="tiny" src = {this.props.imageUrl}  
                   />
                

                //<img data-piio= {this.props.imageUrl} />
                
                /*<LazyLoadImage 
                  height={70}   
                  width={90}
                  effect="blur"
                  visibleByDefault = {true}
                  src={this.props.imageUrl}                  
                  />*/

                }>
                
                <Modal.Content>
                  <Image centered size="huge" src = {this.props.imageUrl}  />                                   
                </Modal.Content>
                
                
                </Modal>

                
        
        
        
        
        
        
        </span>







             
            
            
            
            
         
          
        
      );
    }
  }

export default ImageList