'use strict';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

const Constants = require('../Constants');

var ScheduleRow = React.createClass({

  getInitialState: function(){
    var roster1 = this.props.rosters[this.props.match.input[0].roster];
    var roster2 = this.props.rosters[this.props.match.input[1].roster];
    var team1 = this.props.teams[roster1.team];
    var team2 = this.props.teams[roster2.team];
    var winner = {};
    var homeScore = "";
    var awayScore = "";

    if(this.props.match.standings){
      if(this.props.match.standings.result[0][0].roster === roster1.id){
        homeScore = 1;
        awayScore = 0;
      }
      else{
        homeScore =0;
        awayScore = 1;
      }
    }

    return {
      time : this.props.scheduleItem.scheduledTime,
      homeTeam : {team: team1, score: homeScore},
      awayTeam : {team: team2, score: awayScore},
    };
  },


  render : function(){

    var TouchableElement = TouchableHighlight;
    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback;
      TouchableElement.type = 'RippleAndroid';
    }
    return (
      <TouchableElement
          background = {TouchableNativeFeedback.Ripple()}
          onPress={this.props.onSelect}
      >
          <View style={styles.row}>
            <View style={styles.noFlex}>
              <Text style={[styles.team]}>
                {this.state.homeTeam.team.acronym}
              </Text>
              <Image
                source={this.state.homeTeam.team.logo}
                style={styles.thumbnail}
                resizeMode={Image.resizeMode.contain}
               />
            </View>

            <Text style={styles.score}>{this.state.homeTeam.score} - {this.state.awayTeam.score} </Text>

            <View style={styles.noFlex}>
              <Image
                source={this.state.awayTeam.team.logo}
                style={styles.thumbnail}
                resizeMode={Image.resizeMode.contain}
               />
               <Text style={[styles.team]}>
                 {this.state.awayTeam.team.acronym}
              </Text>
            </View>


        </View>
      </TouchableElement>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection : 'row',
    padding: 15,
    borderWidth: 1,
    borderColor : 'white',
    borderRadius : 2,
    margin :2,
    alignItems: 'center',
    justifyContent : 'center',
  },
  noFlex:{
    flex: 0.2,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'center',
  },
  thumbnail: {
    flex: 0.75,
    width: 50,
    height: 60,
  },
  record: {
    flex: 0.5,
    textAlign: 'center',
    color: 'white'
  },
  team:{
    fontSize : 25,
    color: 'white',
  },
  score:{
    fontSize : 25,
    color: '7FDEFF',
    textAlign : 'center',
  },


});

module.exports = ScheduleRow;
