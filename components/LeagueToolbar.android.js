'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} = React;

var Constants = require('../Constants.js');

var toolbarActions = [
  
];

var LeagueToolbar = React.createClass({
    render : function(){
      return (

          <ToolbarAndroid
            title={this.props.league.name}
            actions={toolbarActions}
            style ={styles.toolbar}
            logo={Constants.leagueImages[this.props.league.slug]}
          />
      );
    }
});

var styles = StyleSheet.create({
    container : {
      flex : 1,

    },
    toolbar:{
      height: 50,
      backgroundColor: 'e9eaed',
    },
});

module.exports = LeagueToolbar;
