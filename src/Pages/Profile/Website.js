import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import mainColor from '../../Resources/constants'

class Website extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    const { containerStyle, onPressWebsite, website, isEditable } = this.props;
    return (
      <TouchableOpacity onPress={() => {
        this.textInput.current.focus();
        onPressWebsite(website)
        }}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.iconRow}>
              <Icon
                name="desktop-mac"
                underlayColor="transparent"
                iconStyle={styles.websiteIcon}
                onPress={() => onPressWebsite(website)}
              />
          </View>
          <View style={styles.websiteRow, isEditable ? {flex: 4} : {flex:7}}>
            <View style={styles.websiteColumn}>
              <TextInput editable={isEditable} keyboardType={'url'} style={styles.websiteText} ref={this.textInput}>{website}</TextInput>
            </View>
          </View>
          { isEditable ?
            <View style={styles.editTextView}>
              <Text style={styles.editText}> Click to Edit </Text>
            </View> : null }
        </View>
      </TouchableOpacity>
  )}
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  websiteColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  websiteIcon: {
    color: mainColor,
    fontSize: 30,
  },
  websiteNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  websiteNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  websiteRow: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  websiteText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  editTextView: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  editText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#aaaaaa',
  }
})


export default Website
