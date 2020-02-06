/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {
  Platform,
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {SwitchNavigator} from 'react-navigation';
// import firebase from '@react-native-firebase/app';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import 'react-native-gesture-handler';
import ReferStartPage from './src/Pages/ReferStartPage';
import NewDoctorPage from './src/Pages/NewDoctorPage';
import ReferPage from './src/Pages/ReferPage';
import DoctorsTableViewPage from './src/Pages/DoctorTableViewPage/DoctorsTableViewPage';
import Loading from './src/Pages/Authentication/Loading';
import SignUp from './src/Pages/Authentication/SignUp';
import Login from './src/Pages/Authentication/Login';
import PhoneAuthScreen from './src/Pages/Authentication/PhoneAuthScreen';
import ProfilePage from './src/Pages/Profile/ProfilePage';
import NavigationService from './src/Services/NavigationService';
import ReferPage2 from './src/Pages/ReferPage';

Icon.loadFont();

const MainNavigator = createStackNavigator(
  {
    ReferStartPage: {screen: ReferStartPage},
    NewDoctorPage: {screen: NewDoctorPage},
    ReferPage: {screen: ReferPage, navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
        title: 'Refer a Patient',
        headerLeft: <HeaderBackButton title='Home' backTitleVisible={true} onPress={() => navigation.navigate('ReferStartPage')} />
      })},
    ReferPage2: {screen: ReferPage2},
    DoctorsTableViewPage: {screen: DoctorsTableViewPage},
    Loading: {screen: Loading},
    SignUp: {screen: SignUp},
    Login: {screen: Login},
    ProfilePage: {screen: ProfilePage, title: ""},
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />;
  }
}

//////////////////////////////////////////////////////////////////////
///////////////////////// TAB BAR COMPONENT //////////////////////////
//////////////////////////////////////////////////////////////////////

// const deviceW = Dimensions.get('window').width;
//
// const basePx = 375;
//
// function px2dp(px) {
//   return (px * deviceW) / basePx;
// }

// class Home extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Home</Text>
//       </View>
//     );
//   }
// }
//
// class Profile extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Profile</Text>
//       </View>
//     );
//   }
// }

// export default class Tabs extends Component {
//   state = {
//     selectedTab: 'home',
//   };
//
//   render() {
//     return (
//       <TabNavigator style={styles.container} tabBarStyle={{height: 100}}>
//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'home'}
//           title="Home"
//           tabStyle={{paddingBottom: 25}}
//           selectedTitleStyle={{color: '#3496f0'}}
//           renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666" />}
//           renderSelectedIcon={() => (
//             <Icon name="home" size={px2dp(22)} color="#3496f0" />
//           )}
//           badgeText="1"
//           onPress={() => this.setState({selectedTab: 'home'})}>
//           <ReferPage />
//         </TabNavigator.Item>
//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'profile'}
//           title="Profile"
//           tabStyle={{paddingBottom: 25}}
//           selectedTitleStyle={{color: '#3496f0'}}
//           renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666" />}
//           renderSelectedIcon={() => (
//             <Icon name="user" size={px2dp(22)} color="#3496f0" />
//           )}
//           onPress={() => this.setState({selectedTab: 'profile'})}>
//           <Profile />
//         </TabNavigator.Item>
//       </TabNavigator>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('Tabs', () => Tabs);

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
