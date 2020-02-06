import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableOpacity
} from 'react-native';
import PlatinumDoctorItem from './PlatinumDoctorItem';
import SilverDoctorItem from './SilverDoctorItem';
import BasicDoctorItem from './BasicDoctorItem';
import { withNavigation } from 'react-navigation';

export default class DoctorTableViewCell extends Component {

  constructor(props) {
    super(props);
    console.log("cell constructor");
  }

  renderRow = (rowData) => {
    console.log("DoctorTableViewCell ROWDATA");
    console.log(rowData.type);
    console.log(rowData);
    switch(rowData.type) {
      case 3:
        return <PlatinumDoctorItem backgroundColor={'#0000ff'} doctorData={rowData}/>;
      case 2:
        return <SilverDoctorItem backgroundColor={'#0000ff'} doctorData={rowData}/>;
      case 1:
        return <BasicDoctorItem doctorData={rowData}/>;
      default:
        return null;
  }
};

  render() {
    console.log("DoctorTableViewCellPROPS");
    console.log(this.props);
    return (
      <View backgroundColor={'#6dafe2'}>
        {this.renderRow(this.props.data)}
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

// export default withNavigation(DoctorTableViewCell);

AppRegistry.registerComponent('DoctorTableViewCell', () => DoctorTableViewCell);
