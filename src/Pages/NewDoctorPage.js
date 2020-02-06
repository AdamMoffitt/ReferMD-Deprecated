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
/*********************** NewDoctorPage *****************************/
/*************************************************************************/

const referoptionsarray = ["Consult Only", "Evaluate"];

// And now we can use these
export default class NewDoctorPage extends Component {

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

  addDoctor() {
    console.log(this.state);
    addDoctor1(this.state);
    this.props.navigation.navigate('ReferPage');
  }

  handleChange = amount => {
    this.setState({ amount })
  }

  static navigationOptions = {
    title: 'Add Doctor',
  }

  // TODO: ADD DOCTOR SPECIALTY PICKER
  render() {

    return (
      <View style={styles.container}>
        <Form ref="form">
          <Image
            source={require('../Resources/referMD_logo.png')}
            style={styles.image}
            />
          <TextInput
            style={styles.textInput}
            name = "firstName"
            placeholder="Doctor's First Name"
            onChangeText={text => this.setState({firstName: text})}
            />
          <TextInput
            style={styles.textInput}
            name = "lastName"
            placeholder="Doctor's Last Name"
            onChangeText={text => this.setState({lastName: text})}
            />
          <TextInputMask
            placeholder="Phone Number"
            style={styles.textInput}
            value={this.state.phoneNumberFormat}
            onChangeText={(phoneNumberFormat) => {
              let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '');
              this.setState({phoneNumberFormat: phoneNumberFormat, phoneNumber: phoneNumber})
            }}
            type={'cel-phone'}
            maxLength={this.state.phoneNumberFormat.toString().startsWith("1") ? 18 : 16}
            options={
              this.state.phoneNumber.startsWith("1") ?
              {
                dddMask: '9 (999) 999 - '
              } : {
                dddMask: '(999) 999 - '
              }
            }
            />
          <TextInput
            style={styles.textInput}
            name = "email"
            placeholder="Email"
            onChangeText={text => this.setState({email: text})}
            />
        </Form>
        <Button onPress={() => this.addDoctor()} title="Add Doctor" />
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

AppRegistry.registerComponent('NewDoctorPage', () => NewDoctorPage);
