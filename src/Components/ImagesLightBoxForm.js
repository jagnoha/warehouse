import React, { Component } from 'react'
import { Image, Modal, Button, Icon } from 'semantic-ui-react'
import Lightbox from 'react-image-lightbox'
import ImageUploader from 'react-images-upload'
import ImageForm from './ImageForm'

class ImagesLightBoxForm extends Component {
  
    state = {
      photoIndex: this.props.photoIndex,
      isOpen: false,
      //pictures: this.props.pictures.map(item => item),
    }

    /*deletePicture = (value) => {
        this.setState(
            {
                pictures: this.state.pictures.filter(item => item !== value)
            }
        )
    }*/

    
    
    render() {


        
      const { photoIndex, isOpen } = this.state;
      //const images = this.props.pictures;
      //const images = this.props.pictures;
      
      
      const server = this.props.server;
      
      return (
          
          this.props.pictures.map((item, index) => {
            return (                
                <ImageForm deletePicture = {this.props.deletePicture} key = {item} id = {item} imageUrl = {this.props.server + this.props.pictures[index] + ".jpg"} />
            )
          })
      )
    }
}
export default ImagesLightBoxForm

  
