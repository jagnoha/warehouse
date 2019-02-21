import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Input, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon, Card } from 'semantic-ui-react';

import { locationsFetchData, locationUpdateDatabase } from '../modules/actions';
import { connect } from 'react-redux';


class Location extends Component {
  
  state = {
    locationValue: this.props.value,
    editionMode: false,
  }
  
  _onClick = () => {
    this.setState({
      editionMode: true,
    })
  }

  _onClickCancel = () => {
    this.setState({
      editionMode: false,
    })
  }

  _onClickSave = () => {
    this.setState({
      editionMode: false,
    })

    let tempLocations = this.props.locations.filter(item => item.id !== this.props.id);

    let newLocations = tempLocations.concat({id: this.props.id, value: this.state.locationValue});

    this.props.locationUpdate(this.props.urlBase + '/updatelocation/' + this.props.id + '/' + this.state.locationValue, newLocations);

  }

  handleLocationChange = (e, data) => {
        
    this.setState({
      locationValue: data.value,            
    })
    
  }
  
  render(){

    /*if (this.props.userActiveIsLoading === true){
      return (
          <Dimmer active inverted>
              <Loader size='large'>Loading</Loader>
          </Dimmer>
      )
    } */


    return (
    <div>
      <Card>
        <Card.Content textAlign = 'center'>
          <Card.Header>
          
            {    
              !this.state.editionMode ? this.state.locationValue : <Input value = {this.state.locationValue} onChange={this.handleLocationChange} />
            }
          
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          {
            !this.state.editionMode ? 
          <div className='ui two buttons'>
            <Button onClick = {this._onClick} size = 'small' basic color='green'>
              Edit
            </Button>
          </div> :
          
          <div className='ui two buttons'>
            <Button onClick = {this._onClickSave} size = 'small' basic color='green'>
              Save
            </Button>
            <Button onClick = {this._onClickCancel} size = 'small' basic color='red'>
              Cancel
            </Button>
          </div>
        
          }
        </Card.Content>
      </Card>
    </div>
    )
  }
}


class Locations extends Component {

      state = {
        query: "",
        /*itemLocations: this.props.locations.map(item => {
          return (
            {header: item.value}
          )
        })*/
        

      
      }
        
      handleSearchChange = (e, data) => {
        
        this.setState({
            query: data.value,            
        })

        
        
        
      }
      render(){
          return (
            <div>
              <Segment>
              <h2>Locations</h2>
              
              <Input value = {this.state.query} placeholder='Search Location...' onChange={this.handleSearchChange} />
              </Segment>
              <p></p>
              <Grid>
              {this.props.locations.filter(item => item.value.toUpperCase().includes(this.state.query.toUpperCase())
              && item.value !== "" && item.value.length > 1 && this.state.query !== "" && this.state.query.length > 1).map(item => {
                return (<Location key = {item.id} urlBase = {this.props.urlBase} 
                  locationUpdate = {this.props.locationUpdateDatabase} locations = {this.props.locations} 
                  id = {item.id} value = {item.value}/>)
              }).sort()}              
              </Grid>
            </div>
          )
        }
}

//export default Locations;

const mapStateToProps = (state) => {
  return {
      locations: state.locations,
      urlBase: state.urlBase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchLocations: (url) => dispatch(locationsFetchData(url)),
      locationUpdateDatabase: (url, locations) => dispatch(locationUpdateDatabase(url, locations)),
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);