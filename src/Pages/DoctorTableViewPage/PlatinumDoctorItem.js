import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableOpacity,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import NavigationService from '../../Services/NavigationService.js';

export default class PlatinumDoctorItem extends Component {

  constructor(props) {
    super(props);
    console.log("platinum props");
    console.log(props);
  }

  render() {
    const doctor = this.props.doctorData;
    return (
        <View style={styles.platinum}>
        <TouchableOpacity style={styles.platinumImageView} onPress={event => NavigationService.navigate('ProfilePage', {doctor: doctor})}>
            <Image
              source={{
                uri: doctor.imageURL
              }}
              style={styles.image}
            />
            <Text style={{color: 'blue'}}> View Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.info} onPress={event => NavigationService.navigate('ReferPage2', {doctor: doctor, doctorTableViewCell: this})}>
            <Text> {doctor.practiceName} </Text>
            <Text> {doctor.doctorName} </Text>
            <Text> {doctor.doctorEmail} </Text>
            <Text style={ {color: 'blue'}} onPress={() => Linking.openURL('tel://'.concat(doctor.doctorPhoneNumber))}>
                {doctor.doctorPhoneNumber}
            </Text>
            <Text style={ {color: 'blue'}} onPress={() => Linking.openURL(doctor.doctorWebsite)}>
                {doctor.doctorWebsite}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  platinum: {
    borderColor: '#6dafe2',
    borderWidth: 10,
    borderRadius: 15,
    height: 200,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
    },
  platinumImageView: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },
  info: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  image: {
    width: 100,
    height: 120
  },
});

// export default withNavigation(PlatinumDoctorItem);


AppRegistry.registerComponent('PlatinumDoctorItem', () => PlatinumDoctorItem);
