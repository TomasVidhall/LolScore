'use strict';

var React = require('react-native');

var {
  Image,
  View,
  StyleSheet
} = React;


var CircleImage = React.createClass({

  render : function(){
    return (
      <View style={[styles.circle, this.props.circleStyle]}>
        <Image source={this.props.src} style ={this.props.imageStyle}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  circle:{
    borderWidth: 1,
    borderColor : 'white',
    backgroundColor : 'black',
    borderRadius : 50,
    padding: 3,

  },
  text:{
    fontSize : 20
  }

});

module.exports = CircleImage;
