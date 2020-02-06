// This is the home page

'use strict';
import * as Yup from 'yup';
import React, {Component} from 'react';
import { Icon } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  AppRegistry,
  TouchableOpacity,
  Picker
} from 'react-native';
import {Formik, Form, useField} from 'formik';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import {specialties} from '../Resources/specialties'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NavigationService from '../Services/NavigationService.js';

/*********************** ReferStartPage *****************************/
/*************************************************************************/

export default class ReferStartPage extends Component {

  constructor(props) {
    super(props);
    console.log("ASDF");
    const user = props.navigation.getParam('user');
    console.log("refer start page ", user);
    this.state = {
      specialty: 'Obstetrics and Gynecology',
      subSpecialty: 'General Surgery',
      subspecialtyIndex: 3,
      user: user
    };
  };

  static navigationOptions = ({ navigation }) => {
     const user = navigation.getParam('user', {});
     return {
       title: '',
       headerLeft: null,
       headerRight: () => (
         <Icon
           name="account-circle"
           underlayColor="#aaaaaa"
           iconStyle={styles.profileIcon}
           onPress={() => {
              console.log("button pressed");
              NavigationService.navigate('ProfilePage', { doctor: {
                doctorName: user.name,
                doctorPhoneNumber: user.phoneNumber,
                doctorEmail: user.email,
                doctorWebsite: user.website,
                practiceName: user.practiceName,
                imageURL: user.imageURL,
                logoURL: user.logoURL,
                type: user.type,
                id: user.id,
              }})}}
         />
       ),
    }
  };



  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          <Image
            source={require('../Resources/referMD_logo.png')}
            style={styles.image}
          />
          <View style={styles.referBySpecialty}>
            <View style={styles.picker}>
              <Picker
                  style={styles.specialtyPicker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.specialty}
                  onValueChange={(specialty, specialtyIndex, name) => {
                      this.setState({ specialty: specialty })}}>
                    {Object.keys(specialties).map((key, index) =>
                    {
                      const specialty = specialties[key];
                      return (<Picker.Item label={specialty.name} value={specialty.name} key={key} />)}
                    )}
              </Picker>
              {/*<Picker
                  style={styles.subSpecialtyPicker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.subSpecialty}
                  onValueChange={(subSpecialty, specialtyIndex) => this.setState({ subSpecialty: subSpecialty })}>
                    {specialties[this.state.specialty].subSpecialties.map((subSpecialty, index) =>
                    {
                      return (<Picker.Item label={subSpecialty} value={subSpecialty} key={index} />)}
                    )}
              </Picker> */}
            </View>
            <Button onPress={() => this.props.navigation.navigate('DoctorsTableViewPage', {specialty: this.state.specialty})} title="Refer By Specialty" />
          </View>
          <View style={styles.buttons}>
            <Text>Or</Text>
            <Button onPress={() => this.props.navigation.navigate('NewDoctorPage')} title="Refer to New Doctor" />
          </View>
      </View>
    );
  }
}
/*************************************************************************/


/*************************************************************************/

const styles = StyleSheet.create({
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },
  container: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
      image: {
        resizeMode: 'contain',
        flex: 3,
        width: 300,
        height: 100,
      },
      referBySpecialty: {
        justifyContent: 'flex-start',
        flex: 3,
        // backgroundColor: '#aaaaaa',
        marginBottom: 50,
      },
            picker: {
              width: 300,
              flexDirection: 'row',
              flex: 1,
              // backgroundColor: '#a34aa5',
            },
                specialtyPicker: {
                  margin: 10,
                  flex: 1,
                  // backgroundColor: '#f34aa5'
                },
                subSpecialtyPicker: {
                  margin: 10,
                  flex: 1,
                },
                    pickerItem: {
                      fontSize: 15,
                    },
      buttons: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 3,
        width: 300,
        height: 100,
    },
});

AppRegistry.registerComponent('ReferStartPage', () => ReferStartPage);
