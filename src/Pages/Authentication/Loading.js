// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, AppRegistry } from 'react-native'
import firebase from '@react-native-firebase/app';
import {getDoctor} from '../../Services/ItemService';
import {mainColor} from '../../Resources/constants';

export default class Loading extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      console.log("!!!!!!!!!!!!!!!!!USER!!!!!!!!!!!!!!!!!!!!");
      // console.log(user);
      await getDoctor(user.uid, (doctor) => {
              console.log("CALLBACK", doctor);
              this.props.navigation.navigate(user ? 'ReferStartPage' : 'SignUp', {user: doctor})});
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColor,
  }
})

AppRegistry.registerComponent('Loading', () => Loading);
