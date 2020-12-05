import { StyleSheet } from 'react-native'

import Colors from '../../Assets/Styles/Colors'

export const ChevronStyles = StyleSheet.create({
  chevronSymbol: {
    padding: 18,
    paddingVertical: 38,
    fontSize: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.lightGrey4
  }
})

export const ChoiceButtonsStyles = StyleSheet.create({
  buttons: {
    backgroundColor: Colors.lightGrey2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2
  },
  submitButton: {
    width: '50%',
    borderRightWidth: 0.5
  },
  closeButton: {
    width: '50%',
    borderRightWidth: 1
  },
  buttonText: {
    padding: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export const GradientBorderStyles = StyleSheet.create({
  border: {
    height: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const MacroAmountSelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hundreds: {
    width: 40,
    height: 60
  },
  textInput: {
    paddingBottom: 6,
    paddingLeft: 10,
    height: 34
  },
  text: {
    paddingBottom: 6,
    paddingLeft: 10
  }
})

export const MacroReadingInputStyles = StyleSheet.create({
  container: {
    width: '80%'
  },
  savedMacroOptions: {
    flexDirection: 'row',
    marginTop: 24
  }
})

export const MacroSelectorStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  selectors: {
    flexDirection: 'row',
    borderLeftWidth: 0.5
  },
  label: {
    textAlignVertical: 'bottom',
    paddingBottom: 8,
    paddingLeft: 8
  },
  thousands: {
    width: 32,
    height: 60
  },
  hundreds: {
    width: 40,
    height: 60
  },
  decimalPoint: {
    textAlignVertical: 'bottom',
    paddingBottom: 6
  }
})

export const ModifyTimeSelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  picker: {
    height: 100,
    width: 90,
    justifyContent: 'center'
  },
  pickerItem: {
    height: '100%'
  },
  textContainer: {
    justifyContent: 'center'
  },
  text: {
    fontSize: 24
  }
})

export const PlusSymbolStyles = StyleSheet.create({
  text: {
    paddingHorizontal: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 100,
    borderWidth: 1,
    marginVertical: 4
  }
})

export const TimeSelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  date: {
    borderRightWidth: 1
  },
  picker: {
    height: 120,
    width: 90,
    justifyContent: 'center'
  },
  pickerItem: {
    height: '100%'
  },
  textContainer: {
    justifyContent: 'center'
  },
  text: {
    fontSize: 24
  }
})

export const WheelSelectorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7
  },
  picker: {
    height: 200,
    width: 140,
    justifyContent: 'center'
  },
  pickerItem: {
    height: '100%'
  },
  textContainer: {
    justifyContent: 'center'
  },
  text: {
    fontSize: 40
  }
})
