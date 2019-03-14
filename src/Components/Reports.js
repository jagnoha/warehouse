import React, { Component } from 'react';
import '../App.css';
import { 
    Button, Form, Grid, Header, Image, 
    Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';

import { userActiveFetchData, listingUpdateDatabase } from '../modules/actions';
import { connect } from 'react-redux';
//import Moment from 'react-moment';
import moment from 'moment';
import ReactChartkick, { AreaChart, LineChart, PieChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import '../helpers.js';

ReactChartkick.addAdapter(Chart)






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

    yesterdayResults: this.props.listings.filter(item => item.timestamp > String(moment().subtract(1, 'days').format("YYYY-MM-DD")) &&
    item.timestamp < String(moment().format("YYYY-MM-DD")))
      .map(item => item.authorId).reduce(function (allUsers, user) { 

        if (user in allUsers) {
          allUsers[user]++;
        }
        else {
          allUsers[user] = 1;
        }
          return allUsers;
        }, {}),

    weekResults: this.props.listings.filter(item => item.timestamp > String(moment().subtract(7, 'days').format("YYYY-MM-DD")))
        .map(item => item.authorId).reduce(function (allUsers, user) { 
  
          if (user in allUsers) {
            allUsers[user]++;
          }
          else {
            allUsers[user] = 1;
          }
            return allUsers;
          }, {}),
      monthResults: this.props.listings.filter(item => item.timestamp > String(moment().subtract(30, 'days').format("YYYY-MM-DD")))
        .map(item => item.authorId).reduce(function (allUsers, user) { 
  
          if (user in allUsers) {
            allUsers[user]++;
          }
          else {
            allUsers[user] = 1;
          }
            return allUsers;
          }, {}),

      monthLineal: 
      
      this.props.users.map(itemUsers => {
      
      let allData = 
        
      this.props.listings.filter(item => item.timestamp > String(moment().subtract(30, 'days').format("YYYY-MM-DD")) &&
      item.authorId === itemUsers.id)
      //.map(item => { return ({authorId: item.authorId, timestamp: String(moment(item.timestamp).format("YYYY-MM-DD") )})})
      .map(item => String(moment(item.timestamp).format("YYYY-MM-DD") ) ).reduce(function (allTimes, time) { 
  
        if (time in allTimes) {
          allTimes[time]++;
        }
        else {
          allTimes[time] = 1;
        }
          return allTimes;
        }, {})

        return (
          {"name": itemUsers.username, "data": allData}
        )

      }),
  
      
      /*.reduce(function (allUsers, item){
        
        if (allUsers.filter(itemFilter => item.authorId === itemFilter.authorId)) {
          allUsers[item] = allUsers[item].concat(item.timestamp);
        }
        else {
          allUsers[item] = [item.timestamp]
        }

        return allUsers;

      } , {})*/
      
      /*.map(item => item.authorId).reduce(function (allUsers, user) { 

        //let username = window.helpers.getNameFromId(this.props.users, user);
        //console.log(username);
        
        if (user in allUsers) {
          allUsers[user]++;
        }
        else {
          allUsers[user] = 1;
        }
          return allUsers;
        }, {}),*/
  
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
          
          function formattedPie(todayResults, listUsers){
            
            let newResults = {};

            for (let key in todayResults){
              
              let newKey = window.helpers.getNameFromId(listUsers, key);

              newResults[newKey] = todayResults[key]; 
            
            }

            console.log(newResults);

            
            return newResults
          }
         
          return (
            <div>
              <Segment>
                  <h2>Reports</h2>
                  <Grid columns={4} stackable>
                    <Grid.Column>
                      <PieChart title="Today" legend="bottom" data={formattedPie(this.state.todayResults, this.props.users)} />
                    </Grid.Column>
                    <Grid.Column>
                      <PieChart title="Yesterday" legend="bottom" data={formattedPie(this.state.yesterdayResults, this.props.users)} />
                    </Grid.Column>
                    <Grid.Column>
                      <PieChart title="Last 7 Days" legend="bottom" data={formattedPie(this.state.weekResults, this.props.users)} />
                    </Grid.Column>
                    <Grid.Column>
                      <PieChart title="Last 30 Days" legend="bottom" data={formattedPie(this.state.monthResults, this.props.users)} />
                    </Grid.Column>
                  </Grid>
                  <AreaChart title="Last 30 Days" data={this.state.monthLineal} legend="bottom" />
              </Segment>
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