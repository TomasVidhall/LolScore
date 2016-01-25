'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = React;


var CircleText = React.createClass({

  render : function(){
    return (
      <View style={[styles.circle, this.props.circleStyle]}>
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  circle:{
    borderWidth: 1,
    borderColor : 'white',
    backgroundColor : 'white',
    borderRadius : 50,
    padding: 10,

  },
  text:{
    fontSize : 20
  }

});

module.exports = CircleText;
