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

export const BgStyles = StyleSheet.create({
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
    paddingTop: 8
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

export const DoseStyles = StyleSheet.create({
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
    fontSize: 12
  },
  colorHighlight: {
    width: '100%'
  }
})

export const MacroStyles = StyleSheet.create({
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
    color: Colors.darkGrey2
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

export const StatsStyles = StyleSheet.create({
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
    color: Colors.black
  },
  unit: {
    fontSize: 12
  },
  stddev: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightGrey4,
    width: '30%'
  }
})
