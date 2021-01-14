import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


const width = Dimensions.get('window').width


const BackButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btnContainerStyle}>
        <Text style={styles.btnTextStyle}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainerStyle: {
    backgroundColor: 'gray',
    margin: width / 50,
    paddingVertical: 8,
    width: width / 4,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  }
})

export default BackButton