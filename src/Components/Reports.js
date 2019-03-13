import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';

import { userActiveFetchData, listingUpdateDatabase } from '../modules/actions';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment'




/*class Report extends Component {

}*/

function createToday(todayDay, todayList){
  let countedUsers = todayList.reduce(function (allUsers, user) { 
    if (user in allUsers) {
      allUsers[user]++;
    }
    else {
      allUsers[user] = 1;
    }
    return allUsers;
  }, {});
}

class Reports extends Component {
  
  state = {
    beforeDate: moment().subtract(30, 'days').add(4, 'hours'),
    currentDate: moment().add(4, 'hours'),
    /*today: createToday(String(moment().format("YYYY-MM-DD")), 
    this.props.listings.filter(item => item.timestamp > String(moment().format("YYYY-MM-DD"))).map(item => item.authorId) ),
    */
   today: this.props.listings.filter(item => item.timestamp > String(moment().format("YYYY-MM-DD"))).map(item => item.authorId),
   todayResults: this.props.listings.filter(item => item.timestamp > String(moment().format("YYYY-MM-DD")))
      .map(item => item.authorId).reduce(function (allUsers, user) { 
        if (user in allUsers) {
          allUsers[user]++;
        }
        else {
          allUsers[user] = 1;
        }
          return allUsers;
        }, {}),
  }

  /*componentDidMount(){

  
    let todayList = this.state.today;
    
    let countedUsers = todayList.reduce(function (allUsers, user) { 
      if (user in allUsers) {
        allUsers[user]++;
      }
      else {
        allUsers[user] = 1;
      }

      return allUsers;
    
    
      }, {});

      setTimeout(() => {
        this.setState({
          todayResults: countedUsers,
        })
      }
      ,300)

      setInterval(() => {
          this.setState({
            todayResults: countedUsers,
          })
        }
      ,10000)


  }*/

  createListDays = () => {
    
    let listDays = [];

    for (let i = 0; i < 30; i++){
      listDays.concat(this.state.beforeDate.add(i+1, 'days'));
    }

    return listDays;
  
  }


  filterList = (userId, dateAfter) => {
    let quantity = this.props.listings.filter(item => item.authorId === userId && item.timestamp > dateAfter).length;
    return <h1>{quantity}</h1>
  }

  /*createToday = () => {
    //let todayList = this.state.today;
    let todayList = this.props.listings.filter(item => item.timestamp > String(moment().format("YYYY-MM-DD"))).map(item => item.authorId);
    let countedUsers = todayList.reduce(function (allUsers, user) { 
      if (user in allUsers) {
        allUsers[user]++;
      }
      else {
        allUsers[user] = 1;
      }

      return allUsers;
    
    
      }, {});

      /*this.setState({
        todayResults: countedUsers,
      })*/
//      return countedUsers;

//}

  
  
  
  render(){
          

          return (
            <div>
              <p>Aqui van los Reports</p>
              <p>Today {String(this.state.currentDate)}</p>
              <p>Last 30 days: {String(this.state.beforeDate)}</p>
              <p>
              { 
                this.filterList('5', String(moment().format("YYYY-MM-DD")))}</p>
            </div>
          )
        }
}

//export default Reports;

const mapStateToProps = (state) => {
  return {
      urlBase: state.urlBase,
      listings: state.listings,
      users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      listingUpdateDatabase: (url, listingDraft, listings) => dispatch(listingUpdateDatabase(url, listingDraft, listings)),
      userActiveFetchData: (url) => dispatch(userActiveFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);