'use strict';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var CircleText = require('./CircleText');
const Constants = require('../Constants')

var PlayerRow = React.createClass({
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
            <CircleText
            text={this.props.player.role}
            textStyle={styles.role}
            circleStyle={styles.circle}

            />
            <Image
                source={Constants.playerImages[""+this.props.player.name]}
                style={styles.thumbnail}
                resizeMode={Image.resizeMode.contain}

                />
            <Text style={styles.name}>
              {this.props.player.firstName}
              <Text style={styles.alias}> {this.props.player.name} </Text>
               {this.props.player.lastName}
            </Text>

        </View>
      </TouchableElement>
    );
    /*  */
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
    justifyContent : 'flex-end'
  },
  thumbnail: {
    flex: 1,
    width: 50,
    height: 50,
  },
  name:{
    flex: 1,
    fontSize : 10,
    textAlign: 'center',
    color : '#7FDEFF'
  },
  alias:{
    fontSize : 20,
    color: 'gold',
  },
  circle:{
    borderWidth: 1,
    borderColor : 'white',
    backgroundColor : 'white',
    borderRadius : 50,
    padding: 10,
  },
  role:{
    color:'green',
  }


});

module.exports = PlayerRow;
