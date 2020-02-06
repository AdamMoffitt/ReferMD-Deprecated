
	/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {Picker, Text, View, StyleSheet, AppRegistry} = ReactNative;
import { PricingCard } from 'react-native-elements';

export default class Upgrade extends React.Component<{}, $FlowFixMeState> {
  state = {
  };

  render() {
    
    return (
      <PricingCard
        color="#4f9deb"
        title="Silver"
        price="$10/Month"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: 'GO SILVER', icon: 'flight-takeoff' }}
      />;
      <PricingCard
        color="#4f9deb"
        title="Platinum"
        price="$100/Month"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: 'GO PREMIUM', icon: 'flight-takeoff' }}
      />;
    );
  }

}


// <PickerIOS
//           selectedValue={this.state.subspecialtyIndex}
//           key={this.state.subspecialty}
//           onValueChange={subspecialtyIndex => this.setState({subspecialtyIndex})}>
//           {specialties[this.state.specialty].map(
//             (subspecialty, subspecialtyIndex) => (
//               <PickerItemIOS
//                 key={this.state.specialty + '_' + subspecialtyIndex}
//                 value={subspecialtyIndex}
//                 label={subspecialty}
//               />
//             ),
//           )}
//         </PickerIOS>

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('Upgrade', () => Upgrade);
