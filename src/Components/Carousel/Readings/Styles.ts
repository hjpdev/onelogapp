import { StyleSheet } from 'react-native'

import Colors from '../../../Assets/Styles/Colors'

export const BgCarouselStyles = StyleSheet.create({
  container: {
    flex: 5,
    paddingBottom: 10,
    backgroundColor: Colors.lightGrey1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reading: {
    justifyContent: 'center',
    color: Colors.black,
    fontSize: 54,
    paddingTop: 8,
  },
  unit: {
    fontSize: 12,
    paddingBottom: 10
  },
  image: {
    height: 30,
    width: 30
  }
})

export const DoseCarouselStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    textAlign: 'center',
    paddingTop: 8,
    color: Colors.black
  },
  unit: {
    fontSize: 12,
  },
  colorHighlight: {
    width: '100%'
  }
})

export const MacroCarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey1,
    width: '100%'
  },
  labels: {
    flexDirection: 'column',
    padding: 20
  },
  label: {
    fontSize: 16,
    color: Colors.darkGrey1
  },
  values: {
    flexDirection: 'column',
    padding: 20
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color: Colors.black
  }
})

export const StatsCarouselStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    color: Colors.black
  },
  unit: {
    fontSize: 12,
  },
  stddev: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey2,
    width: '30%'
  }
})
