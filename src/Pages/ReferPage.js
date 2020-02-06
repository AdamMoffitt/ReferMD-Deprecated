/**
 * This component is the main component where a
 * doctor can refer a patient to a primary care physician.
 *
 */

'use strict';

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
} from 'react-native';
import {thisExpression} from '@babel/types';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
// import Picker from 'react-native-picker';
import ReferForm from './ReferForm';
import PropTypes from 'prop-types'
import DoctorTableViewCell from './DoctorTableViewPage/DoctorTableViewCell';

// firebase.functions().useFunctionsEmulator('http://localhost:5000');

async function sendReferralEmails(doctorParms, patientParms) {
  console.log('send doctor email');
  console.log(doctorParms);
  console.log('send patient email');
  console.log(patientParms);
  try {
    // Create or sign the user into a anonymous account
    await firebase.auth().signInAnonymously();
    console.log('signed in');
    /**************** SEND PATIENT EMAIL *******************/
    var sendPatient = firebase
      .functions()
      .httpsCallable('sendReferralEmailToPatient');
    sendPatient({patientParms})
      .then(function(result) {
        console.log('Send Patient Cloud Function called successfully.', result);
      })
      .catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        // [START_EXCLUDE]
        console.error(
          'There was an error when calling the Send Patient Cloud Function',
          error,
        );
        window.alert(
          'There was an error when calling the Send Patient Cloud Function:\n\nError Code: ' +
            code +
            '\nError Message:' +
            message +
            '\nError Details:' +
            details,
        );
      });
    /**************************************************/

    /******************** SEND DOCTOR EMAIL******************************/
    var sendDoctor = firebase
      .functions()
      .httpsCallable('sendReferralEmailToDoctor');
    sendDoctor({doctorParms})
      .then(function(result) {
        console.log('Send Doctor Cloud Function called successfully.', result);
      })
      .catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        // [START_EXCLUDE]
        console.error(
          'There was an error when calling the Send Doctor Cloud Function',
          error,
        );
        window.alert(
          'There was an error when calling the Send Doctor Cloud Function:\n\nError Code: ' +
            code +
            '\nError Message:' +
            message +
            '\nError Details:' +
            details,
        );
      });
    /**************************************************/
  } catch (e) {
    console.error(e);
  }
}

/*********************************************************************************/
/***************************** ON REFER PRESSED **********************************/
/*********************************************************************************/
function onReferPressed(values) {
  console.log('refer pressed');
  console.log(values);
  console.log('values printed');

  const doctorParms = {
    patientFirstName: values.firstName,
    patientLastName: values.lastName,
    patientEmail: encodeURIComponent(values.email),
    patientPhoneNumber: encodeURIComponent(values.phoneNumber),
    patientNotes: encodeURIComponent(values.notes),
    referringDoctorName: encodeURIComponent('Dr. Moffitt'), // referringDoctorName,
    referringDoctorEmail: encodeURIComponent('dmoffitt@arizonarms.com'), // referringDoctorEmail,
    referringDoctorPhoneNumber: '4802735608', // referringDoctorPhoneNumber,
    referringDoctorAddress: encodeURIComponent(
      '1701 E. Thomas Road\nBuilding 1 Suite 101\n Phoenix, AZ, 85016',
    ), // referringDoctorAddress,
    referringDoctorWebsite: encodeURIComponent('www.arizonarms.com'), // referringDoctorWebsite,
    referringDoctorImageURL: encodeURIComponent(
      'https://firebasestorage.googleapis.com/v0/b/medrefer-react-native.appspot.com/o/Drew%20Moffitt%20MD.JPG?alt=media&token=003e12ec-5b86-4b34-b390-e04494c2e455',
    ),
    dest: encodeURIComponent('admoffitt15@gmail.com'),
  };

  // sendReferralEmailToDoctor(doctorParms);

  const patientParms = {
    dest: values.email,
    patientFirstName: values.firstName,
    doctorName: 'Dr. Moffitt', // referringDoctorName,
    doctorEmail: 'dmoffitt@arizonarms.com', // referringDoctorEmail,
    doctorPhoneNumber: '4802735608', // referringDoctorPhoneNumber,
    doctorWebsite: 'www.arizonarms.com', // referringDoctorAddress,
    doctorAddress:
      '1701 E. Thomas Road\nBuilding 1 Suite 101\n Phoenix, AZ, 85016', // referringDoctorWebsite,
    doctorImageURL:
      'https://firebasestorage.googleapis.com/v0/b/medrefer-react-native.appspot.com/o/Drew%20Moffitt%20MD.JPG?alt=media&token=003e12ec-5b86-4b34-b390-e04494c2e455',
  };

  sendReferralEmails(doctorParms, patientParms);
  // sendReferralEmailToPatient(patientParms);

  // const sendReferralEmailToDoctor = firebase
  //   .functions()
  //   .httpsCallable('sendReferralEmailToDoctor');

  // sendReferralEmailToDoctor(doctorParms)
  //   .then(({data}) => {
  //     console.log(data.someResponse); // hello world
  //   })
  //   .catch(httpsError => {
  //     console.log(httpsError.code); // invalid-argument
  //     console.log(httpsError.message); // Your error message goes here
  //     console.log(httpsError.details.foo); // bar
  //   });

  // const sendReferralEmailToPatient1 = firebase
  //   .functions()
  //   .httpsCallable('sendReferralEmailToPatient');

  // sendReferralEmailToPatient1(patientParms)
  //   .then(({data}) => {
  //     console.log(data.someResponse); // hello world
  //   })
  //   .catch(httpsError => {
  //     console.log(httpsError.code); // invalid-argument
  //     console.log(httpsError.message); // Your error message goes here
  //   });
}

/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/

/*************************************************************************/
/*************************************************************************/

export default class ReferPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
    };
  }

  static navigationOptions = {
    title: 'Refer',
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    const { navigation } = this.props;
    const doctor = navigation.getParam('doctor');
    console.log("doctor parms here!!!!!!!");
    console.log(doctor);
    var cellHeight = 50;
    if (doctor.type == 3) {
      console.log('platinum');
      cellHeight = 200;
    } else if (doctor.type == 2) {
      console.log('silver');
      cellHeight = 120;
    } else {
      console.log('basic');
      cellHeight = 50;
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../Resources/referMD_logo.png')}
          style={styles.image}
        />
        <DoctorTableViewCell
          label={doctor.name}
          type={doctor.type}
          practiceName={doctor.practiceName}
          doctorName={doctor.name}
          doctorEmail={doctor.email}
          doctorPhoneNumber={doctor.phoneNumber}
          doctorWebsite={doctor.website}
          height={cellHeight}/>
        <ReferForm selectedReferOption='Evaluate' referOptions={['Consult Only', 'Evaluate']}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

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

AppRegistry.registerComponent('ReferPage', () => ReferPage);
