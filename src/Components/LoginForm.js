import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';
import { 
  Button, Form, Grid, Header, Image, 
  Menu, Dimmer, Loader, Segment, Dropdown, Icon } from 'semantic-ui-react';
  import { userActiveFetchData, ebayMarketplacesFetchData } from '../modules/actions';

  import { connect } from 'react-redux';

class LoginForm extends Component {
  
  state = {
    fields: {
      username: '',
      password: '',
    }
  }

  componentDidMount(){
    //this.props.fetchLocations(this.props.urlBase+'/getlocations');
    //this.props.fetchBrands(this.props.urlBase+'/getbrands');
    this.props.fetchEbayMarketplaces(this.props.urlBase+'/getebaymarketplaces');
    //this.props.fetchListings(this.props.urlBase+'/getlistings', this.props.clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
  }

  handleOnChangeField = (e, data) => {
    this.setState(
      {
        fields: {...this.state.fields, [data.id]: data.value}
      }
    )
  }

  handleClickLogin = () => {
    
    console.log(this.state.fields.username);
    console.log(this.state.fields.password);
    
    this.props.userActiveFetchData(this.props.urlBase + '/finduser/' + this.state.fields.username + '/' + this.state.fields.password);
  }


  
  
  render() {

    if (this.props.userActiveIsLoading === true){
      return (
          <Dimmer active inverted>
              <Loader size='large'>Loading</Loader>
          </Dimmer>
      )
    } 

      return (
        <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src={logo} /> Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input value = {this.state.fields.username} id = "username" fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleOnChangeField} />
                <Form.Input
                  value = {this.state.fields.password}
                  id = "password"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleOnChangeField}
                />
    
                <Button color='teal' onClick = {this.handleClickLogin} fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            
          </Grid.Column>
        </Grid>
      </div>
      )
    }
  }


  //export default LoginForm;

  const mapStateToProps = (state) => {
    return {
        //users: state.users,
        userActive: state.userActive,
        urlBase: state.urlBase,
        userActiveIsLoading: state.userActiveIsLoading,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userActiveFetchData: (url) => dispatch(userActiveFetchData(url)),
        fetchEbayMarketplaces: (url) => dispatch(ebayMarketplacesFetchData(url))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
//export default Listings;