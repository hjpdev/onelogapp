import { StyleSheet } from 'react-native'

import Colors from '../../Assets/Styles/Colors'

export const CarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey1
  },
  header: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  template: {
    flex: 4,
    alignContent: 'center'
  },
  chevron: {
    flex: 1
  },
  tag: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    padding: 4,
    width: 60
  },
  time: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
  lastReading: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholder: {
    flex: 1
  }
})
