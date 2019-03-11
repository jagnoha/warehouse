import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Input, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon, Card } from 'semantic-ui-react';

import { ebayOrdersFetchData, ebayOrdersUpdate, amazonPdfFileFetchData, amazonPdfFileFetchCurrentData } from '../modules/actions';
import { connect } from 'react-redux';
import { ebayMarketplaces } from '../modules/reducers/ebayMarketplaces';
import axios from 'axios';

class AmazonMarketplace extends Component {

  /*state = {
    processing: false,
  }*/

  /*_onAmazonClickGetOrders = () => {
      
      console.log("GET ORDERS!");
      
      
      
      this.setState({processing: true})
      
      this.props.amazonPdfFileFetchData(this.props.amazonPdfFile);
      
      setTimeout(() => {
        this.props.amazonPdfFileFetchCurrentData(this.props.urlBase+'/getamazonpdffile')
      }, 4000);

      setTimeout(() => {
        this.props.amazonPdfFileFetchCurrentData(this.props.urlBase+'/getamazonpdffile')
      }, 8000);

      setTimeout(() => {
        this.setState({processing: false})
      }, 12000);

      
  
  }*/

  _onDownloadPDF = () => {
   
    console.log("DOWNLOAD PDF!");
   

    let fileName = this.props.amazonPdfFile.fileName + '.pdf';

      //if (fileName.length > 0){

          window.open(this.props.urlBase + '/amazonPDF/' + fileName);

    /*

    let fileName = this.props.fileNameEbayPdf.filter(item => item.ebayMarketplace === this.props.id)

    if (fileName.length > 0){

        window.open(this.props.urlBase + '/ebayPDF/' + fileName[0].file);
    
    }
    */
  
  }

  

  render (){

      let rightTime = String(new Date(this.props.amazonPdfFile.lastModified));

      return (
      <div>
    <Card>
      <Card.Content textAlign = 'center'>
        <Card.Header>
          Amazon Labels
        </Card.Header>
        Last Good Request: {rightTime}
          
      </Card.Content>
      <Card.Content extra>
        
      {!this.props.amazonPdfFileIsLoading && !this.props.processing ?
        <div className='ui two buttons'>
          
          
          <Button onClick = {this._onDownloadPDF} size = 'small' basic color='blue'>
            Download File
          </Button>
        </div>
        : <p>Processing</p>
      }
      
      
        
      </Card.Content>
    </Card>
  </div>
      )
  }
}

class EbayMarketplace extends Component {

    

    _onDownloadPDF = () => {
     

      let fileName = this.props.fileNameEbayPdf.filter(item => item.ebayMarketplace === this.props.id)

      if (fileName.length > 0){

          window.open(this.props.urlBase + '/ebayPDF/' + fileName[0].file);
      
      }
      
    
    }

    

    render (){
        return (
        <div>
      <Card>
        <Card.Content textAlign = 'center'>
          <Card.Header>
            {this.props.ebayMarketplace}
          </Card.Header>
          
          Orders: {this.props.ebayOrders.filter(item => item.ebayMarketplace === this.props.id)[0] ? 
            this.props.ebayOrders.filter(item => item.ebayMarketplace === this.props.id)[0].orders.length : '0' }
        
            
        </Card.Content>
        <Card.Content extra>
          
          {!this.props.ebayOrdersIsLoading &&   
          <div className='ui two buttons'>
            
            <Button onClick = {this._onDownloadPDF} size = 'small' basic color='blue'>
              Download File
            </Button>
                
          </div> 
        
          }
        {this.props.ebayOrdersIsLoading &&
          <p>Processing</p> 
        }

        </Card.Content>
      </Card>
    </div>
        )
    }
}



class EbayMarketplaceList extends Component {
    render (){
        return (
            <Grid>
            { this.props.ebayMarketplaces.map(item =>  <EbayMarketplace key = {item.id} 
              ebayMarketplace = {item.ebayUserId} id = {item.id} getOrders = {this.props.getOrders} 
              ebayOrdersIsLoading = {this.props.ebayOrdersIsLoading} 
              fileNameEbayPdf = {this.props.fileNameEbayPdf} ebayOrders = {this.props.ebayOrders} urlBase = {this.props.urlBase} />) }
            </Grid>
        )
    }
}




class Orders extends Component {

  state = {
    processing: false,
  }

  _onAmazonClickGetOrders = () => {
      
    console.log("GET ORDERS!");
    
    
    
    this.setState({processing: true})
    
    this.props.amazonPdfFileFetchData(this.props.amazonPdfFile);
    
    setTimeout(() => {
      this.props.amazonPdfFileFetchCurrentData(this.props.urlBase+'/getamazonpdffile')
    }, 4000);

    setTimeout(() => {
      this.props.amazonPdfFileFetchCurrentData(this.props.urlBase+'/getamazonpdffile')
    }, 8000);

    setTimeout(() => {
      this.setState({processing: false})
    }, 12000);

    

}
    
    _onEbayClickGetOrders = () => {
        
       
 
        //let page = 1;
        //this.props.fetchebayOrders(this.props.urlBase + "/getorders/39d9cfd4-adb6-4a47-abf5-b8d2a18e1352/" + page);        
        //let ebayLoading = this.props.ebayOrdersIsLoading === undefined ? [] : this.props.ebayOrdersIsLoading;

        this.props.fetchebayOrders(this.props.ebayMarketplaces, this.props.ebayOrders, this.props.fileNameEbayPdf);        
    
    }
      
    render(){
        return (
          <div>
            <Segment>
              <h2>Ebay Orders</h2>
              {!this.props.ebayOrdersIsLoading ?
              <Button onClick = {this._onEbayClickGetOrders} size = 'small' basic color='green'>
                Get Orders
              </Button>
              :
              <Button disabled = {true} size = 'small' basic color='green'>
                Get Orders
              </Button>
              }
            
              </Segment>
            
            <EbayMarketplaceList ebayMarketplaces = {this.props.ebayMarketplaces} ebayOrders = {this.props.ebayOrders} 
            getOrders = {this._onClickGetOrders} ebayOrdersIsLoading = {this.props.ebayOrdersIsLoading} 
            fileNameEbayPdf = {this.props.fileNameEbayPdf} urlBase = {this.props.urlBase} />
              <Segment>
              <h2>Amazon Orders</h2>
              
              
              
              
              {!this.props.amazonPdfFileIsLoading && !this.state.processing ?
              
          
                <Button onClick = {this._onAmazonClickGetOrders} size = 'small' basic color='green'>
                Get Orders
                  </Button>
                : 

                <Button disabled = {true} size = 'small' basic color='green'>
                Get Orders
                  </Button>

                }
              
              
              
              
              
              
              
              </Segment>

            <AmazonMarketplace urlBase = {this.props.urlBase} processing = {this.state.processing}
            amazonPdfFileIsLoading={this.props.amazonPdfFileIsLoading} amazonPdfFile={this.props.amazonPdfFile} 
            amazonPdfFileFetchData = {this.props.amazonPdfFileFetchData} 
            amazonPdfFileFetchCurrentData = {this.props.amazonPdfFileFetchCurrentData} />
            
          </div>
        )
      }
}

const mapStateToProps = (state) => {
  return {
      ebayOrders: state.ebayOrders,
      ebayOrdersIsLoading: state.ebayOrdersIsLoading,
      amazonPdfFileIsLoading: state.amazonPdfFileIsLoading,
      amazonPdfFile: state.amazonPdfFile,
      urlBase: state.urlBase,
      ebayMarketplaces: state.ebayMarketplaces,
      fileNameEbayPdf: state.fileNameEbayPdf,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchebayOrders: (ebayAccounts, oldEbayOrders, ebayPdfFilesOld) => dispatch(ebayOrdersFetchData(ebayAccounts, oldEbayOrders, ebayPdfFilesOld)),
      ebayOrdersUpdate: (ebayOrders) => dispatch(ebayOrdersUpdate(ebayOrders)),
      amazonPdfFileFetchData: (currentFile) => dispatch(amazonPdfFileFetchData(currentFile)),
      amazonPdfFileFetchCurrentData: (url) => dispatch(amazonPdfFileFetchCurrentData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);