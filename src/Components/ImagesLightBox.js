import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import Lightbox from 'react-image-lightbox'
import ImageUploader from 'react-images-upload'

class ImagesLightBox extends Component {
  
    state = {
      photoIndex: this.props.photoIndex,
      isOpen: false,
      pictures: this.props.pictures,
    }

    
    
    render() {
      const { photoIndex, isOpen } = this.state;
      //const images = this.props.pictures;
      const images = this.state.pictures;
      
      
      const server = this.props.server;
      
      return (
        <span>
          
          
          <Image size={this.props.size} src = {this.props.server + this.props.pictures[photoIndex] + ".jpg"} 
          onClick={() => this.setState({ isOpen: true })}
          >
          
        </Image>
        
          
          {isOpen && (
            <Lightbox
              mainSrc={server + images[photoIndex]+".jpg"}
              nextSrc={server + images[(photoIndex + 1) % images.length] + ".jpg"}
              prevSrc={server + images[(photoIndex + images.length - 1) % images.length]+ ".jpg"}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )}
          
        </span>
      );
    }
  }

export default ImagesLightBox

  
