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
          title="League of Legends"
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
        <ToolbarAndroid
          title={route.league.name}
          titleColor ='white'
          actions={[]}
          style ={styles.toolbar}
          logo={{uri : route.league.logoUrl}}


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
          logo={{uri : route.team.logoUrl}}
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
    backgroundColor: 'black',
  }
});

AppRegistry.registerComponent('lolscore', () => lolscore);
