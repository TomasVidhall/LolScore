'use strict';
const iconsMap =
  {'na-lcs': require('../images/leagues/na-lcs.png'),
  'eu-lcs': require('../images/leagues/eu-lcs.png'),
  'lck': require('../images/leagues/lck.png'),
  'lpl-china': require('../images/leagues/lpl-china.png'),
  'lms': require('../images/leagues/lms.png')};

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

var CircleImage = require('./CircleImage');

var LeagueLogo = React.createClass({
  render: function(){
    var TouchableElement = TouchableHighlight;
    if(Platform.OS === 'android'){
      TouchableElement = TouchableNativeFeedback;
      TouchableElement.type = 'RippleAndroid';
    }
    return(
      <TouchableElement
        background = {TouchableNativeFeedback.Ripple()}
        onPress={this.props.onSelect}
        >
          <View style={styles.container}>
            <CircleImage src = {{uri: this.props.league.logoUrl}}
             imageStyle={styles.thumbnail}/>

            <Text style={styles.name}>{this.props.league.name}</Text>
          </View>
        </TouchableElement>
    );
  },
});

var styles = StyleSheet.create({
  thumbnail: {
    width:120,
    height: 120
  },
  container: {
    width: 140,
    margin: 10,
    height: 170,
    alignItems: 'center',
  /*  borderWidth: 2,
    borderColor: '#E9F2EF',
    borderRadius: 2,
    backgroundColor: '#6A7372'*/
  },
  name:{
    textAlign: 'center',
    color: '#789ABC',
    fontSize: 15,
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOffset: {width:10, height:10},
    shadowOpacity: 1.0
  }

})

module.exports = LeagueLogo;
