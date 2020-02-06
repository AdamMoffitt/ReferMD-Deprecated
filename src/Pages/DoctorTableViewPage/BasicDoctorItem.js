import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  AppRegistry,
} from 'react-native';

export default class BasicDoctorItem extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
        <View style={styles.basic}>
          <View style={styles.info}>
            <Text> {this.props.doctorData.doctorName} </Text>
            <Text> {this.props.doctorData.doctorPhoneNumber} </Text>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  basic: {
    borderColor: '#6dafe2',
    borderWidth: 10,
    borderRadius: 15,
    height: 50,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
    },
    info: {
      marginLeft: 140,
      flexDirection: 'row',
    }
});

AppRegistry.registerComponent('BasicDoctorItem', () => BasicDoctorItem);
