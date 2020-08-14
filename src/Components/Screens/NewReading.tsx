import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ScreenStyles } from '../../Assets/Styles/Screen'

const NewReadingScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.container} testID={'new-reading-screen'}>
        <View style={Styles.row}>
          <View style={{ ...Styles.topPill, alignItems: 'flex-end' }}>
            <TouchableOpacity>
              <Text style={Styles.text}>{'Macro'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...Styles.topPill, alignItems: 'flex-start' }}>
            <TouchableOpacity>
              <Text style={Styles.text}>{'Bg'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.row}>
          <View style={{ ...Styles.bottomPill, alignItems: 'flex-end' }}>
            <TouchableOpacity>
              <Text style={Styles.text}>{'Keto'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...Styles.bottomPill, alignItems: 'flex-start' }}>
            <TouchableOpacity>
              <Text style={Styles.text}>{'Dose'}</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#ebebeb'
  },
  topPill: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#ebebeb',
    margin: 20
  },
  bottomPill: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    margin: 20
  },
  text: {
    fontSize: 18,
    fontFamily: 'roboto',
    fontWeight: 'bold',
    backgroundColor: '#ebebeb',
    padding: 50,
    color: '#3f3d3d',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1a1919',
    borderBottomWidth: 8,
    borderBottomColor: '#252424',
    width: 160,
    height: 120,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default NewReadingScreen
