'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
} = React;

var StandingsRow = require('./StandingsRow');

var Standings = React.createClass({
  getInitialState: function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.props.records.sort(function(a, b){
      if(a.wins > b.wins){
        return -1;
      }
      return 1;
    });
    this.setRanks(this.props.records);
    return {
      dataSource: ds.cloneWithRows(this.props.records),
    };
  },

  setRanks: function(records){
    var rank = 1;
    var numAtCurrentRank = 0;
    var previousWins = records[0].wins;
    for(var i = 0; i < records.length ; i++){
      var record = records[i];
      if(record.wins < previousWins){
        previousWins = record.wins;
        rank+= numAtCurrentRank;
        numAtCurrentRank = 1;
      }else {
        numAtCurrentRank += 1;

      }
      record.rank = rank;
    }
  },

  selectTeam : function(team){
    this.props.navigator.push({
        title : team.name,
        name : 'team',
        team : team,
        tournament: this.props.tournament
    });
  },

  render : function(){
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRecord}
        style = {styles.listView}
        showsVerticalScrollIndicator= {true}
        />
    );
  },

  renderRecord : function(record){
    var roster = this.props.rosters[record.roster];
    var team = this.props.teams[roster.team];
    return (
      <StandingsRow
        record = {record}
        roster = {roster}
        team = {team}
        onSelect = {() => this.selectTeam(team)}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 1
  },

});

module.exports = Standings;
