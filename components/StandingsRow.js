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


var StandingsRow = React.createClass({
  render : function(){
  /*  this.props.team.logoUrl =
    (this.props.team.altLogoUrl != null) ? this.props.team.altLogoUrl :
    this.props.team.logoUrl;*/

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
            <Text style={styles.rank}>{this.props.record.rank}.</Text>
            <Image
              source={this.props.team.logo}
              style={styles.thumbnail}
              resizeMode={Image.resizeMode.contain}

              />
            <Text style={styles.teamName}>{this.props.team.name}</Text>
            <Text style={styles.record}>
            {this.props.record.wins} - {this.props.record.losses}
            </Text>
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
    justifyContent : 'flex-end'
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
  teamName:{
    flex: 1,
    fontSize : 20,
    textAlign: 'center',
    color : '#7FDEFF'
  },
  rank:{
    fontSize : 25,
    color: 'gold',
  }

});

module.exports = StandingsRow;
