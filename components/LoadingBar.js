'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid
} = React;

var LoadingBar = React.createClass({
    render : function(){
      return (
        <View style={styles.container}>
          <ProgressBarAndroid/>
        </View>
      );
    }
});

var styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    }
});

module.exports = LoadingBar;
