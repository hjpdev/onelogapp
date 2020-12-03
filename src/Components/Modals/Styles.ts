import { StyleSheet } from 'react-native'

import Colors from '../../Assets/Styles/Colors'

export const SuccessStyles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100
  }
})

export const DeleteConfirmationStyles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    backgroundColor: Colors.lightGrey2,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  name: {
    fontSize: 16,
    padding: 6,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    margin: 6
  }
})

export const ModifyBgStyles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 300,
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
    alignItems: 'center'
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginVertical: 10
  },
  deleteText: {
    textAlign: 'center'
  }
})

export const ModifyDoseStyles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 300,
    backgroundColor: Colors.lightGrey1,
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  switch: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 8
  },
  switchText: {
    fontSize: 16
  },
  deleteContainer: {
    width: '100%'
  },
  deleteText: {
    textAlign: 'left',
    padding: 6
  }
})

export const ModifyKetoStyles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 300,
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
    alignItems: 'center'
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginBottom: 12
  },
  deleteText: {
    textAlign: 'center'
  }
})

export const ModifyMacroStyles = StyleSheet.create({
  modal: {},
  container: {
    backgroundColor: Colors.lightGrey1,
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginVertical: 10
  },
  deleteText: {
    textAlign: 'center'
  }
})

export const ModifySavedMacroStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 2
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginVertical: 10
  },
  deleteText: {
    textAlign: 'center'
  }
})
