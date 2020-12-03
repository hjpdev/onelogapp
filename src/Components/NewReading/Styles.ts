import { StyleSheet } from 'react-native'

import Colors from '../../Assets/Styles/Colors'

export const BgStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: Colors.lightGrey6
  },
  submitText: {
    fontSize: 18
  },
  unit: {
    fontSize: 20
  }
})

export const DoseStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '90%'
  },
  unit: {
    fontSize: 20
  },
  switch: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: Colors.lightGrey6
  },
  submitText: {
    fontSize: 18
  }
})

export const KetoStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  unit: {
    fontSize: 20
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: Colors.lightGrey6
  },
  submitText: {
    fontSize: 18
  }
})

export const MacroStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: Colors.lightGrey6
  },
  submitText: {
    fontSize: 18
  }
})

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey6,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  backIcon: {
    height: 30,
    width: 30
  },
  previousReadingsIcon: {
    height: 40,
    width: 30
  },
  headerTextContainer: {
    flex: 4
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  }
})

export const SelectionStyles = StyleSheet.create({
  newReadings: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  newReading: {
    alignItems: 'center',
    width: '100%',
    padding: 42
  },
  newReadingText: {
    fontSize: 22
  }
})
