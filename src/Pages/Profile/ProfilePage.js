import React, { Component } from 'react'
import { Card, Icon, Avatar, Overlay } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  FlatList,
TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import ListView from "deprecated-react-native-listview";
import ImagePicker from 'react-native-image-picker'

import mainColor from '../../Resources/constants'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import Website from './Website'
import { getDoctor, claimDoctorProfile, uploadDoctorImage, uploadLogoImage } from '../../Services/ItemService'
import profileStyles from './ProfileStyle'
import { Dimensions } from 'react-native'
import firebase from '@react-native-firebase/app';
import { Toast } from "native-base";

export default class ProfilePage extends Component {

  constructor(props) {
      super(props);
      console.log("AUTHENTICATION experiment!!!!!!!")
      // console.log(firebase.auth());
      const fbAuthUserID = firebase.auth()._user._user.uid;
      const doctor = props.navigation.getParam("doctor", "Hi");
      console.log("fb auth id", fbAuthUserID);
      console.log("doctor id", doctor.id);
      const isUser = (fbAuthUserID == doctor.id);
      console.log(isUser);
      this.state = {
        userId: fbAuthUserID,
        loading: false,
        doctor: props.navigation.getParam("doctor", "Hi"),
        doctorImageURL: '',
        logoImageURL: '',
        isUser: isUser,
        isEditable: isUser,
        isOverlayVisible: false,
        isEditingEmail: false,
      }
      console.log("DOCTOR:::", this.state.doctor);
      // if(this.state.doctor.id) {
      //   getDoctorImageForProfile(this.state.doctor.id);
      //   getLogoImageForProfile(this.state.doctor.id);
      // }
  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    if (this.state.isEditable) {

    } else {
      Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
    }
  }

  onPressSms = () => {
    if (this.state.isEditable) {

    } else {
      console.log('sms')
    }
  }

  onPressEmail = email => {
    if (this.state.isEditable) {
      this.state.isEditingEmail = !this.state.isEditingEmail;
    } else {
      Linking.openURL(`mailto:${email}?subject=ReferMD&body=body`).catch(err =>
        console.log('Error:', err)
      )
    }
  }

  onPressWebsite = websiteURL => {
    console.log(websiteURL);
    Linking.openURL(websiteURL).catch(err =>
      console.log('Error:', err)
    )
  }

  claimProfile = (doctor) => {
    console.log("Claim Profile");
    // claimDoctorProfile(doctor, fbAuthUserID);
  }

  editAvatar = () => {
    console.log("editAvatar");
    if (this.state.doctor.type == 3 && this.state.isEditable) { // only platinum users can edit their Avatar Image
      this.handleChoosePhoto(uploadDoctorImage);
    } else { // prompt upgrade

    }
  }

  editLogoBackground = () => {
    console.log("editLogoBackground");
    if (this.state.doctor.type == 3 && this.state.isEditable) { // only platinum users can edit their Logo Background Image
      this.handleChoosePhoto(uploadLogoImage);
    } else { // prompt upgrade

    }
  }

  handleChoosePhoto = (uploadFunction) => {
      const options = {
        noData: true,
      }
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          uploadFunction(this.state.doctor, response.uri);
        }
      })
    }

  renderContactHeader = (doctor) => {
    const avatar = doctor.imageURL;
    const avatarBackground = doctor.logoURL;
    const message = "Claim This Profile";
    return (
      <View style={styles.headerContainer1}>
        {this.state.doctor.type == 1 && //If the profile is basic, show "Claim Profile" Button
            <TouchableOpacity style={styles.claimProfileButton} onPress={this.claimProfile}>
              <Text> {message} </Text>
            </TouchableOpacity>
        }
        <View style={styles.coverContainer}>
          <ImageBackground
            source={
              avatarBackground ? {uri: avatarBackground} : require('../../Resources/referMD_logo.png')
            }
            style={styles.coverImage}
            resizeMode= 'contain'
          >
          { this.state.isEditable ?
            <Icon
              raised
              name='edit'
              type='font-awesome'
              color={mainColor}
              onPress={() => this.editLogoBackground()}/> : null}
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer1}>
          <Avatar
            source={{uri: avatar}}
            icon={avatar ? null : {name: 'user', type: 'font-awesome'}}
            showEditButton={this.state.isEditable}
            rounded
            size="large"
            onPress={() => this.editAvatar()}
            disabled={this.state.isEditable}
            activeOpacity={this.state.isEditable ? 0.2 : 1}
          />
          <View style={styles.coverTitleContainer1}>
            <Text style={styles.coverName}>{doctor.doctorName}</Text>
            <Text style={styles.coverBio}>{doctor.practiceName}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderTel = (doctor) => (
    <Tel
      name={doctor.doctorName}
      number={doctor.doctorPhoneNumber}
      onPressSms={this.onPressSms}
      onPressTel={this.onPressTel}
      isEditable={this.state.isEditable}
    />
  )

  renderEmail = (doctor) => (
    <Email
      email={doctor.doctorEmail}
      onPressEmail={this.onPressEmail}
      isEditable={this.state.isEditable}
    />
  )

  renderWebsite = (doctor) => (
      <Website
        website={doctor.doctorWebsite}
        onPressWebsite={this.onPressWebsite}
        isEditable={this.state.isEditable}
      />
  )

  renderDocuments = (doctor) => (
      <FlatList
         data={doctor.documents}
         renderItem={({ item }) => (
           <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
             <Image style={styles.imageThumbnail} />
           </View>
         )}
         //Setting the number of column
         numColumns={3}
         keyExtractor={(item, index) => index.toString()}
       />
  )

  render() {
    const { navigation } = this.props;
    // console.log("here");
    // console.log(this.props);
    console.log(this.state);
    const doctor = this.state.doctor;
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderContactHeader(doctor)}
            {this.renderTel(doctor)}
            {this.renderEmail(doctor)}
            {this.renderWebsite(doctor)}
            {this.renderDocuments(doctor)}
            {Separator()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  claimProfileButton: {
    backgroundColor: mainColor,
    height: Dimensions.get('window').width * (1 / 10),
    width: Dimensions.get('window').width,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  cardContainer1: {
    flex: 1,
  },
  container1: {
    flex: 1,
  },
  coverBio: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  coverContainer: {
    marginBottom: 55,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 5),
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverMetaContainer1: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  coverTitle1: {
    color: '#aaaaaa',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverTitleContainer1: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
  headerContainer1: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 40,
  },
  indicatorTab1: {
    backgroundColor: 'transparent',
  },
  mansonryContainer1: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage1: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer1: {
    flexDirection: 'row',
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  sceneContainer1: {
    marginTop: 10,
  },
  scroll1: {
    backgroundColor: '#FFF',
  },
  tabBar1: {
    backgroundColor: 'transparent',
    marginBottom: -10,
    marginLeft: 130,
    marginRight: 15,
  },
  tabContainer1: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: 'relative',
    zIndex: 10,
  },
  tabRow1: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  tabLabelNumber1: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 2,
  },
  tabLabelText1: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },
  imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
})

// renderHeader = (doctor) => {
//   // const name = 'Drew Moffitt';
//   const name = doctor.name;
//   // const city = 'Tempe';
//   const city = doctor.city;
//   // const country = 'Arizona';
//   const country = doctor.country;
//   const avatar = doctor.imageURL;
//   const avatarBackground = doctor.logoURL;
//
//   return (
//     <View style={styles.headerContainer}>
//       <ImageBackground
//         style={styles.headerBackgroundImage}
//         source={{
//           uri: avatarBackground,
//         }}
//       >
//         <View style={styles.headerColumn}>
//           <Image
//             style={styles.userImage}
//             source={{
//               uri: avatar,
//             }}
//           />
//           <Text style={styles.userNameText}>{name}</Text>
//           <View style={styles.userAddressRow}>
//             <View>
//               <Icon
//                 name="place"
//                 underlayColor="transparent"
//                 iconStyle={styles.placeIcon}
//                 onPress={this.onPressPlace}
//               />
//             </View>
//             <View style={styles.userCityRow}>
//               <Text style={styles.userCityText}>
//                 {city}, {country}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   )
// }

// export default ProfilePage
AppRegistry.registerComponent('ProfilePage', () => ProfilePage);
