import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  AppRegistry
} from 'react-native';
import TableView from 'react-native-tableview';
import DoctorTableViewCell from './DoctorTableViewCell';
const { Section, Item } = TableView;
import { getDoctors, getDoctorsBySpecialty } from '../../Services/ItemService'

export default class DoctorsTableViewPage extends Component {

  constructor(props) {
    super(props);
    // this.getDoctorsForTableView();
    const specialty = this.props.navigation.getParam('specialty');
    console.log("specialty table view");
    console.log(specialty);
    this.getDoctorsBySpecialty(specialty);
    this.state = {
      loading: true,
      doctors: [],
      showMessage: false,
      specialty: specialty,
    }
  }

  static navigationOptions = ({ navigation }) => {
  console.log("navigation options");
  console.log(navigation.getParam('specialty'));
  return {
    title: `${navigation.getParam('specialty')}`,
    headerBackTitle: 'Home'
  };
};

  getDoctorsForTableView = async () => {
    const doctors = await getDoctors();
    console.log("!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!#$!@#");
    console.log(doctors);
    console.log("!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!#$!@#");
    this.setState({ loading: false, doctors: doctors });
  }

  getDoctorsBySpecialty = async (specialty) => {
    const doctors = await getDoctorsBySpecialty(specialty);
    console.log("!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!#$!@#");
    console.log(doctors);
    console.log("!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!#$!@#");
    const showMessage = false;
    if (!doctors && doctors.length <= 0) {
      showMessage = true;
    }
    this.setState({ loading: false, doctors: doctors, showMessage: showMessage});
  }

  addDoctor = () => {
    console.log("add doctor to Table View");
    var doctors = this.state.doctors;
  }

  render() {
    const { navigation } = this.props;
    // const doctors = navigation.getParam('doctors');
    // console.log(doctors);

    console.log("Doctor Table View");
    console.log(this.props);
    const loading = this.state.loading;
    const doctors = this.state.doctors;
    const showMessage = this.state.showMessage;

    if (loading == true) {
          return (
            <ActivityIndicator
              style={{marginTop: 200}}
              size="large"
            />
          );
        }

    return (
        <TableView
         style={{ flex: 1 }}
         editing={navigation.getParam('editing')}
         reactModuleForCell="DoctorTableViewCell"
         onPress={ event => doctors[event.selectedIndex].type != 3 ? navigation.navigate('ReferPage', {doctor: doctors[event.selectedIndex]}) : console.log("")}
         separatorColor={'#aaaaaa'}
         backgroundColor={'#6dafe2'}
       >
         <Section>
         {doctors.map(function(doctor) {
            console.log("doctor:", doctor);
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
               <Item
                 label={doctor.name}
                 type={doctor.type}
                 id={doctor.id}
                 imageURL={doctor.imageURL}
                 logoURL={doctor.logoURL}
                 practiceName={doctor.practiceName}
                 doctorName={doctor.name}
                 doctorEmail={doctor.email}
                 doctorPhoneNumber={doctor.phoneNumber}
                 doctorWebsite={doctor.website}
                 height={cellHeight}
                 navigation={navigation}
               >
               </Item>
             );
           })}
         </Section>
       </TableView>
    )
  }

  // <View>
  // <Text>
  //   {loading ? 'Loading doctors' : 'Loaded doctors'}
  // </Text>
  // {loading && <ActivityIndicator />}

}

AppRegistry.registerComponent('DoctorsTableViewPage', () => DoctorsTableViewPage);
