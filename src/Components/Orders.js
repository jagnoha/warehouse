import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Input, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon, Card } from 'semantic-ui-react';

import { ebayOrdersFetchData, ebayOrdersUpdate } from '../modules/actions';
import { connect } from 'react-redux';
import { ebayMarketplaces } from '../modules/reducers/ebayMarketplaces';



class EbayMarketplace extends Component {

    _onClickGetOrders = () => {
        this.props.getOrders(this.props.id)
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
          
          {this.props.ebayOrdersIsLoading.filter(item => item === this.props.id).length < 1  ? 
          <div className='ui two buttons'>
            <Button onClick = {this._onClickGetOrders} size = 'small' basic color='green'>
              Get Orders
            </Button>
            <Button /*onClick = {this._onClickCancel}*/ size = 'small' basic color='blue'>
              Generate Labels
            </Button>
          </div> : <p>Processing</p> 
        
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
              ebayOrdersIsLoading = {this.props.ebayOrdersIsLoading} ebayOrders = {this.props.ebayOrders} />) }
            </Grid>
        )
    }
}


class Orders extends Component {
    
    _onClickGetOrders = (ebayMarketplace) => {
        
       
 
        //let page = 1;
        //this.props.fetchebayOrders(this.props.urlBase + "/getorders/39d9cfd4-adb6-4a47-abf5-b8d2a18e1352/" + page);        
        let ebayLoading = this.props.ebayOrdersIsLoading === undefined ? [] : this.props.ebayOrdersIsLoading;
        this.props.fetchebayOrders(ebayMarketplace, this.props.ebayOrders, ebayLoading);        
    
    }
      
    render(){
        return (
          <div>
            <Segment>
              <h2>Orders</h2>
              </Segment>
            
            <EbayMarketplaceList ebayMarketplaces = {this.props.ebayMarketplaces} ebayOrders = {this.props.ebayOrders} 
            getOrders = {this._onClickGetOrders} ebayOrdersIsLoading = {this.props.ebayOrdersIsLoading} />
            
          </div>
        )
      }
}

const mapStateToProps = (state) => {
  return {
      ebayOrders: state.ebayOrders,
      ebayOrdersIsLoading: state.ebayOrdersIsLoading,
      urlBase: state.urlBase,
      ebayMarketplaces: state.ebayMarketplaces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchebayOrders: (ebayAccount, oldEbayOrders, listLoading) => dispatch(ebayOrdersFetchData(ebayAccount, oldEbayOrders, listLoading)),
      ebayOrdersUpdate: (ebayOrders) => dispatch(ebayOrdersUpdate(ebayOrders)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);