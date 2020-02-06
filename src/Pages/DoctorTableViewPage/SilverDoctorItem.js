import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  AppRegistry,
  Linking,
} from 'react-native';

export default class SilverDoctorItem extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
        <View style={styles.silver}>
          <View style={styles.info}>
            <Text> {this.props.doctorName} </Text>
            <Text> {this.props.doctorData.practiceName} </Text>
            <Text> {this.props.doctorData.doctorName} </Text>
              <Text style={ {color: 'blue'}} onPress={() => Linking.openURL('tel://'.concat(this.props.doctorData.doctorPhoneNumber))}>
                  {this.props.doctorData.doctorPhoneNumber}
              </Text>
            <Text style={ {color: 'blue'} } onPress={() => Linking.openURL(this.props.doctorData.doctorWebsite) }>
                {this.props.doctorData.doctorWebsite}
            </Text>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  silver: {
    borderColor: '#6dafe2',
    borderWidth: 10,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    },
    info: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      marginLeft: 140,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginBottom: 20,
    }
});

AppRegistry.registerComponent('SilverDoctorItem', () => SilverDoctorItem);
