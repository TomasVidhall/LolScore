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
  RefreshControl,
} = React;

const API_URL = "http://api.lolesports.com/api/v1/leagues?slug=";
const Constants = require('../Constants');

var Standings = require('./Standings');
var LoadingBar = require('./LoadingBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Schedule = require('./Schedule');

var LeagueShow = React.createClass({

  getInitialState: function(){
    return {
      teams: {},
      loaded: false,
      tournament : {description: '', records : [] },
    };
  },

  componentDidMount : function(){
    this.fetchData();
  },

  fetchData : function(){

    fetch(API_URL+this.props.league.slug)
      .then((response) => response.json())
      .then((responseData) => {
        var teams = {};
        var tournaments = {};
        var records = {};
        var latestTournament;
        for(var i = 0; i < responseData.highlanderTournaments.length; i++){
          var tour = responseData.highlanderTournaments[i];
          tour.records = [];
          for(var key in tour.brackets){
            var bracket = tour.brackets[key];
            if(bracket.name = "regular_season"){
              tour.bracket = bracket;
            }
            console.log(bracket);
          }

          tournaments[tour.id] = tour;

          if(!latestTournament || !latestTournament.startDate ||
             tour.startDate > latestTournament.startDate ){
            latestTournament = tour;
          }
        }
        for(var i = 0; i< responseData.highlanderRecords.length; i++){
            var record = responseData.highlanderRecords[i];
            record.percent = record.wins/(record.wins+record.losses);
            tournaments[record.tournament].records.push(record);
            records[record.id] = record;
        }

        for(var i = 0; i < responseData.teams.length; i++){
          var team = responseData.teams[i];
          team.logo = Constants.teamImages[team.acronym];
          teams[team.id] = team;
        }
        this.setState({
          teams : teams,
          tournament : latestTournament,
          tournaments : tournaments,
          records : records,
          loaded: true,
        });

      })
      .done();
  },

  render: function() {
    if(this.state.loaded){
      return (

        <ScrollableTabView
          style={styles.container}
          tabBarUnderlineColor ="black"
          tabBarBackgroundColor = "#e9eaed"
        >
          <View tabLabel="Standings" style={styles.container}>
            <Standings
                navigator = {this.props.navigator}
                records = {this.state.tournament.records}
                teams = {this.state.teams}
                rosters = {this.state.tournament.rosters}
                tournament = {this.state.tournament}
            />
          </View>
          <View tabLabel="Schedule" style={styles.container}>
            <Schedule
              navigator = {this.props.navigator}
              teams = {this.state.teams}
              rosters = {this.state.tournament.rosters}
              tournament = {this.state.tournament}
            />
          </View>
        </ScrollableTabView>

      );
    }
    else{
      return(
        <LoadingBar/>
      );
    }


  },

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
});

module.exports = LeagueShow;
