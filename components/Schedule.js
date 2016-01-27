'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  View,
  Text
} = React;

var ScheduleRow = require('./ScheduleRow');

const API_URL = "http://api.lolesports.com/api/v1/scheduleItems?leagueId=";



var Schedule = React.createClass({
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2
      })
    };
  },

  componentDidMount : function(){
    this.fetchData();
  },

  sortScheduleItems : function(a,b){
    return (a.scheduledTime > b.scheduledTime) ? 1 : -1
  },

  fetchData : function(){

    fetch(API_URL+this.props.tournament.league)
      .then((response) => response.json())
      .then((responseData) => {
        var scheduleItems = [];
        var dataBlob = {};
        for(var i = 0; i < responseData.scheduleItems.length; i++){
          var item = responseData.scheduleItems[i];
          if(item.bracket == this.props.tournament.bracket.id){
            item.match = this.props.tournament.bracket.matches[item.match];

            var section = "" + item.tags.blockLabel + item.tags.subBlockLabel;
            if(!dataBlob[section]){
              dataBlob[section] = [];
            }
            dataBlob[section].push(item);

          }
        }
        for(var key in dataBlob){
          var day = dataBlob[key];
          day.sort(this.sortScheduleItems);
        }

        this.setState({
          loaded: true,
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob)
        });
      })
      .done();
  },


  render : function(){
    return (
      <ListView ref={(c) => this._input = c}
        dataSource = {this.state.dataSource}
        renderRow = {this.renderMatch}
        renderSectionHeader={this.renderSectionHeader}
        style = {styles.listView}
        showsVerticalScrollIndicator= {true}
        />
    );
  },

  renderSectionHeader : function(sectionData, header){
    console.log(sectionData, header);
    return(
      <View>
        <Text style={styles.header}>
          WEEK {header[0]} DAY {header[1]}
        </Text>
      </View>
    );
  },

  renderMatch : function(scheduleItem){
  /*  var roster = this.props.rosters[record.roster];
    var team = this.props.teams[roster.team];
    roster = {roster}
    team = {team}
    onSelect = {() => this.selectTeam(team)}*/
    return (
      <ScheduleRow
        scheduleItem = {scheduleItem}
        match = {scheduleItem.match}
        teams = {this.props.teams}
        rosters = {this.props.rosters}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  header : {
    fontFamily : 'Square',
    fontSize : 32,
    color : 'gold',
    textAlign : 'center'
  }

});

module.exports = Schedule;
