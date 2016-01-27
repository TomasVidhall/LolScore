'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
} = React;

const API_URL = "http://api.lolesports.com/api/v1/teams";
const Constants = require('../Constants');
var LoadingBar = require('./LoadingBar');
var PlayerRow = require('./PlayerRow');

var setPlayerRole = function(player){
  switch (player.roleSlug) {
    case 'toplane':
      player.role = "TOP";
      player.roleNumber = 1;
      break;
    case 'jungle':
      player.role = "JGL";
      player.roleNumber = 2;

      break;
    case 'midlane':
      player.role = "MID";
      player.roleNumber = 3;

      break;
    case 'adcarry':
      player.role = "ADC";
      player.roleNumber = 4;

      break;
    case 'support':
      player.role = "SUP";
      player.roleNumber = 5;

      break;


    default:

  }
}

var sortPlayers = function(a, b){
  return (a.roleNumber > b.roleNumber) ? 1 : -1
}

var TeamShow = React.createClass({

  getInitialState: function(){
    return {
        loaded : false,
        dataSource : new ListView.DataSource({
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        })
    }
  },

  componentDidMount : function(){
    this.fetchData();
  },

  fetchData : function(){
    var url = API_URL + "?slug=" + this.props.team.slug +
     "&tournament=" + this.props.tournament.league;
     console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        var players = [];
        var dataBlob = {};
        var starters = [];
        var subs = [];
        for(var i = 0; i < responseData.players.length; i++){
          var player = responseData.players[i];
          setPlayerRole(player);
          if(Constants.playerImages[""+player.name]){
            player.logo = Constants.playerImages[""+player.name];
          }
          else{
            player.logo = require('../images/players/empty.png');
          }

          if(this.props.team.starters.indexOf(player.id) != -1){
            starters.push(player);
          }
          else{
            subs.push(player);
          }
        }
        starters.sort(sortPlayers);
        subs.sort(sortPlayers);
        dataBlob['Starters'] = starters;
        dataBlob['Substitutes'] = subs;
        this.setState({
          loaded : true,
          dataSource : this.state.dataSource.cloneWithRowsAndSections(
            dataBlob),
        });

      })
      .done();
  },

  render: function() {
    if(this.state.loaded){
      return (
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderPlayer}
          renderSectionHeader={this.renderSectionHeader}
          style = {styles.listView}
          showsVerticalScrollIndicator= {true}
          renderSeparator = {this.renderSeparator}
          />
      );
    }
    else{
      return(
        <LoadingBar/>
      );
    }


  },

  renderSectionHeader : function(sectionData, header){
    return(
      <View>
        <Text style={styles.header}>{header}</Text>
      </View>
    );
  },

  renderPlayer: function(player){
    return(
      <PlayerRow
        player={player}

      />
    );
  }

});

var styles = StyleSheet.create({
  container:{
    flex: 1
  },
  listView: {
  },
  listContainer: {
    flexDirection: 'row',
  //  justifyContent: 'center',
    alignItems: 'center',
    flexWrap : 'wrap',
  },
  header : {
    fontSize : 25,
    textAlign : 'center',
    color : 'white'
  },
});

module.exports = TeamShow;
