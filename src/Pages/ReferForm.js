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
import {Formik, Form, useField} from 'formik';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'

/*********************** ReferForm *****************************/
/*************************************************************************/

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  phoneNumber: Yup.string()
    .required('Required'),
    email: Yup.string()
    .email('Invalid email address')
});

const referoptionsarray = ["Consult Only", "Evaluate"];

// And now we can use these
export default class ReferForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedReferOption: props.selectedReferOption,
      referOptions: props.referOptions
    };
    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }
  }

  render() {
    return (
      <View>
        <Formik
          initialValues={{email: ''}}
          onSubmit={values => onReferPressed(values)}
          validationSchema={SignupSchema}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder="Patient First Name"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder="Patient's Last Name"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                placeholder="Phone Number"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
              />
              <Button onPress={handleSubmit} title="Refer" />
            </View>
          )}
        </Formik>
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

AppRegistry.registerComponent('ReferForm', () => ReferForm);
