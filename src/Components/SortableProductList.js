import React, {Component} from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { clickOnColumn, changeDirection, sortListings, changeActivePage, listingsFetchData, changeProductsSelected } from '../modules/actions';
import SelectAllItems from './SelectAllItems';

class SortableProductList extends Component {
  
    /*state = {
      columnTemp: null,
      data: this.props.listings,      
      direction: null,
    }*/
  
    
    handleSort = clickedColumn => () => {
        this.props.changeProductsSelected([]);
        this.props.changeActivePage(1);    
        this.props.clickOnColumn(clickedColumn); 
        this.props.changeDirection(this.props.direction);
        //const { columnTemp, data, direction } = this.state;
        this.props.sortListings(this.props.listings, clickedColumn, this.props.direction === 'ascending' ? 'desc' : 'asc' );
        //this.props.fetchListings('http://192.168.1.11:8083/getlistings', clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
        
        //if (this.props.changeDirection === 'ascending')
        
       
      
      
      
      //window.client.getListingsFromDB(store, this.state.direction, clickedColumn)
  
     /* if (columnTemp !== clickedColumn) {
        
        
  
            this.setState((state, props) =>({
          
        columnTemp: clickedColumn,
          
          data: _.sortBy(state.data, (item => {
            if (clickedColumn === 'price'){
              return parseFloat(item[clickedColumn]);
            } else {
              return item[clickedColumn];
            }
            
          })),
          
          direction: 'ascending',        
        }));     */
  
        /*store.dispatch({
          type: 'UPDATE_FIELD_DIRECTION',
          fieldValue: clickedColumn,
          directionValue: direction,
        })*/
  /*
        
        
  
        
        
        
        return
    }*/
    
      /*this.setState((state, props) => ({
        data: state.data.reverse(),      
        direction: state.direction === 'ascending' ? 'descending' : 'ascending',      
      }))*/
      
      /*store.dispatch({
        type: 'UPDATE_FIELD_DIRECTION',
        fieldValue: clickedColumn,
        directionValue: direction, //=== 'ascending' ? 'descending' : 'ascending',
      })
  
      store.dispatch({
        type: 'SORT_PRODUCT_LIST',
        listSorted: this.state.data,
      });*/
  
      

      
    }
    
    render() {
      //const { columnTemp, data, direction } = this.state
      //const column = this.props.column;
      //console.log("ESTA ES LA COLUMNA:" + this.props.column);
      const listingsFiltered = this.props.listingsFiltered;
      const productsByPage = this.props.productsByPage;
      const activePage = this.props.activePage;
    
      //const listingsInPage = listingsFiltered.chunk(productsByPage)[Number(activePage)-1].map(item => item.uuid) 


      return (
        
          <Table.Header>
              
              <Table.Row>
                
              
                

                <SelectAllItems />

                
  
  
  
                <Table.HeaderCell sorted={this.props.clickedColumn === 'authorId' ? this.props.direction : null}
                  onClick={this.handleSort('authorId')}>
                  User
                </Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'status' ? this.props.direction : null}
                   onClick={this.handleSort('status')}>
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Pictures
                </Table.HeaderCell>
                
                <Table.HeaderCell sorted={this.props.clickedColumn === 'condition' ? this.props.direction : null}
                  onClick={this.handleSort('condition')}>
                  Condition
                </Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'brand' ? this.props.direction : null}
                  onClick={this.handleSort('brand')}
                  //onClick={this.props.clickOnColumn('brand')}

                  >
                  Brand
                </Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'partNumbers' ? this.props.direction : null}
                  onClick={this.handleSort('partNumbers')}
                ><div>Part Number</div><span className='App-secondary-table-title'>SKU</span></Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.clickedColumn === 'title' ? this.props.direction : null}
                  onClick={this.handleSort('title')}
                ><div>Product Name</div><span className='App-secondary-table-title'>Locations</span></Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'quantity' ? this.props.direction : null}
                  onClick={this.handleSort('quantity')}>
                  Available
                </Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'price' ? this.props.direction : null}
                  onClick={this.handleSort('price')}>
                  Price
                </Table.HeaderCell>
                <Table.HeaderCell sorted={this.props.clickedColumn === 'timestamp' ? this.props.direction : null}
                  onClick={this.handleSort('timestamp')}>
                  <div>Date Created</div><span className='App-secondary-table-title'>Last Modified</span>
                </Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
              
            </Table.Header>
            
            
      )
    }
  }

  //export default SortableProductList

  const mapStateToProps = (state) => {
    return {
        /*locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,*/
        listings: state.listings,
        listingsFiltered: state.listingsFiltered,
        clickedColumn: state.clickedColumn,
        direction: state.direction,
        activePage: state.activePage,
        productsByPage: state.productsByPage,
        /*hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        conditions: state.conditions,
        users: state.users,
        ebayMarketplaces: state.ebayMarketplaces,
        activePage: state.activePage,
        productsByPage: state.productsByPage, */     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        clickOnColumn: (clickedColumn) => dispatch(clickOnColumn(clickedColumn)),
        changeDirection: (direction) => dispatch(changeDirection(direction)),
        sortListings: (listings, clickedColumn, order) => dispatch(sortListings(listings, clickedColumn, order)),
        changeActivePage: (activePage) => dispatch(changeActivePage(activePage)),
        fetchListings: (url, clickedColumn) => dispatch(listingsFetchData(url, clickedColumn)),
        changeProductsSelected: (list) => dispatch(changeProductsSelected(list)),
        
        //fetchListings: (url) => dispatch(listingsFetchData(url)),
        //fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SortableProductList);