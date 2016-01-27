/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  ToolbarAndroid,
  BackAndroid,
  View,
  ScrollView
} = React;

var LeagueGrid = require('./components/LeagueGrid');
var LeagueShow = require('./components/LeagueShow');
var TeamShow = require('./components/TeamShow');
var LeagueToolbar = require('./components/LeagueToolbar');


var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1){
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef){
  _navigator = navigationOperations;
  if(route.name == 'index'){
    return(
        <View style={styles.container}>
          <ToolbarAndroid
          logo = {require("./images/lol_logo.png")}
          style ={styles.toolbar}
          />

          <LeagueGrid navigator = {navigationOperations}/>
        </View>
      );
  }
  else if(route.name == 'league'){
    console.log("ROUTE league");
    return(
      <View style={styles.container}>
        <LeagueToolbar
          league = {route.league}
          navigator = {navigationOperations}
        />
        <LeagueShow navigator = {navigationOperations}
        league={route.league}/>

      </View>
      );
  }
  else if(route.name == 'team'){
    console.log("ROUTE team");
    return(
      <View style={styles.container}>
        <ToolbarAndroid
          title={route.team.name}
          titleColor ='white'
          actions={[]}
          style ={styles.toolbar}
          logo={route.team.logo}
        />
        <TeamShow navigator = {navigationOperations}
        team = {route.team}
        tournament = {route.tournament}/>
      </View>
      );
  }
  else {
    return(
      <View>
        <Text style={styles.welcome}>League of Legends</Text>
      </View>);
  }
};

var lolscore = React.createClass({
  render: function() {
    var route = {name : 'index'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={route}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#565E60',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  toolbar:{
    height: 50,
    backgroundColor: '#e9eaed',
  }
});

AppRegistry.registerComponent('lolscore', () => lolscore);
