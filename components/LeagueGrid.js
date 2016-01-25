'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} = React;

const API_URL = "http://api.lolesports.com/api/v1/leagues";
var _usedLeagues = {'na-lcs': true, 'eu-lcs':true,
                  'lck' : true, 'lpl-china': true,
                  'lms' : true, 'na-cs': false,
                  'eu-cs': false
                };

var LeagueLogo = require('./LeagueLogo')
var LoadingBar = require('./LoadingBar')

var LeagueGrid = React.createClass({

  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount : function(){
    this.fetchData();
  },

  fetchData : function(){
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        var list = [];
        for(var key in responseData.leagues){
          if(_usedLeagues[responseData.leagues[key].slug])
          list.push(responseData.leagues[key]);
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(list),
          loaded: true,
        });
      })
      .done();
  },

  selectLeague : function(league){
    this.props.navigator.push({
        title : league.name,
        name : 'league',
        league : league,
    });
  },

  render: function() {
    if(this.state.loaded){
      return (
        <ListView
          style = {styles.listView}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderLeague}
          contentContainerStyle={styles.listContainer}
          />
      );
    }
    else{
      return(
        <LoadingBar/>
      );
    }

  },

  renderLeague: function(league){

    return(
      <LeagueLogo
        league={league}
        onSelect={() => this.selectLeague(league)}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap : 'wrap',
  },
});

module.exports = LeagueGrid;
