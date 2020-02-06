'use strict';
import * as Yup from 'yup';
import React, {Component} from 'react';
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
} from 'react-native';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import { addDoctor1 } from '../Services/ItemService';
import Form from 'react-native-form'
import { TextInputMask } from 'react-native-masked-text'
import DoctorTableViewCell from './DoctorTableViewCell';

/*********************** NewDoctorPage *****************************/
/*************************************************************************/

const referoptionsarray = ["Consult Only", "Evaluate"];

// And now we can use these
export default class ReferPage2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      phoneNumberFormat: ''
    };
  }

  handleChange = amount => {
    this.setState({ amount })
  }

  static navigationOptions = {
    title: 'Refer a Patient 2',
  }

  // TODO: ADD DOCTOR SPECIALTY PICKER
  render() {
    const { navigation } = this.props;
    const doctor = navigation.getParam('doctor');
    var cellHeight = 50;
    if (doctor.type == 3) {
      console.log('platinum');
      cellHeight = 200;
    } else if (doctor.type == 2) {
      console.log('silver');
      cellHeight = 120;
    } 
    return (
      <View style={styles.container}>
        {navigation.getParam('doctorTableViewCell')}
        <DoctorTableViewCell
          label={doctor.name}
          type={doctor.type}
          practiceName={doctor.practiceName}
          doctorName={doctor.name}
          doctorEmail={doctor.email}
          doctorPhoneNumber={doctor.phoneNumber}
          doctorWebsite={doctor.website}
          height={cellHeight}/>
        <Button onPress={() => this.addDoctor()} title={"Refer Patient to Doctor " + doctor.lastName} />
      </View>
    );
  }
}
/*************************************************************************/
/*************************************************************************/

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 100,
  },
  textInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  notes: {
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

AppRegistry.registerComponent('ReferPage2', () => ReferPage2);
