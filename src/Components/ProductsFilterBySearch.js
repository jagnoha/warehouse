import React, { Component } from 'react';
import '../App.css';
import { Form, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeActivePage, changeFilterBySearch, changeSearchIsChecked, changeProductsSelected } from '../modules/actions';

class ProductsFilterBySearch extends Component {
    
    state = {
        valueSearch: this.props.filterBySearch,        
    }

    handleSearchChange = (e, data) => {
        //console.log(data.value);
        
        this.setState({
            valueSearch: data.value,            
        })

        
        //this.props.changeFilterBySearch(e.target.value);
        
    }

    handleClick = () => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        //console.log(this.state.valueSearch);
        this.props.changeFilterBySearch(this.state.valueSearch.trim());
        this.props.changeSearchIsChecked(true);
    }

    deleteSearchWord = () => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);
        this.props.changeFilterBySearch('');
        this.setState({valueSearch: ''})
        this.props.changeSearchIsChecked(false);
    }
    
    

    render(){
        
        const listingsFiltered = this.props.listingsFiltered;

        if (!this.props.searchIsChecked){
            return (
                <div>
                <Input placeholder='Search SKU, Title, MPN...' onChange={this.handleSearchChange}
                 value={this.state.valueSearch} />
                <Button onClick={this.handleClick} >Search</Button>
                <Label basic size='large'>{listingsFiltered} product(s)</Label>
            </div>
            )
        }

        return (
            <div>
                <Input 
                    icon = {{ name: 'delete', link: true, onClick: this.deleteSearchWord}}
                    placeholder='Search SKU, Title, MPN...' onChange={this.handleSearchChange}
                    disabled={true}
                    value={this.state.valueSearch} />
                    <Label basic size='large'>{listingsFiltered} product(s)</Label>
                
            </div>
        )
        
        
        /*return (
            <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Search SKU, Title, MPN...' name='search' value={this.state.valueSearch} onChange={this.handleSearchChange} />            
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
       
      </div>
        )*/
    }
    
    /*handleClick = () => {
    
        
        this.props.changeFilterBySearch(this.state.valueSearch);
        this.props.changeSearchIsChecked(true);
      }
    
      handleSearchChange = (e, data) => {
        console.log(data.value);
        
        this.setState({
            valueSearch: data.value,
        })

        
        //this.props.changeFilterBySearch(e.target.value);
        
      }
    
      deleteSearchWord = () => {
        this.props.changeFilterBySearch('');
        this.props.changeSearchIsChecked(false);
      }
    
    render(){
        if (this.props.searchIsChecked === true){
            return (
            <div>
              <Input 
                  icon = {{ name: 'delete', link: true, onClick: this.deleteSearchWord}}
                  placeholder='Search SKU, Title, MPN...' 
                  onChange={this.handleSearchChange}
                  value={this.state.valueSearch}
                  
                  
                />
                <Button icon='search' onClick={this.handleClick} />
                 
            </div>
            )
          } else {
              return (
              <div>
                    <Input 
                  placeholder='Search SKU, Title, MPN...' 
                  onChange={this.handleSearchChange}
                  //onClick={this.handleClick}
                  value={this.state.valueSearch}
                  
                  />
                  <Button icon='search' onClick={this.handleClick} />
                  
                
              </div>
              )
          }
    }*/
 


}

const mapStateToProps = (state) => {
    return {
        filterBySearch: state.filterBySearch,
        searchIsChecked: state.searchIsChecked,
        listingsFiltered: state.listingsFiltered,
        /*locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,
        listings: state.listings,
        hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,
        activePage: state.activePage,
        productsByPage: state.productsByPage,*/      
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeFilterBySearch: (valueSearch) => dispatch(changeFilterBySearch(valueSearch)),
        changeSearchIsChecked: (bool) => dispatch(changeSearchIsChecked(bool)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        /*fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))*/
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterBySearch);