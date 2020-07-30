import { StyleSheet } from 'react-native'

export const BgLayoutStyles = StyleSheet.create({
  bgLayoutContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bgLayoutContentReading: {
      flex: 4,
      width: '80%'
    },
    bgLayoutContent: {
      flex: 5,
      flexDirection: 'row'
    },
    bgLayoutImageContainer: {
      flex: 1,
      paddingBottom: 10
    },
    bgLayoutImage: {
      alignSelf: 'center',
      height: 30,
      width: 30
    },
    bgLayoutReading: {
      flex: 2,
      alignSelf: 'center',
      fontSize: 54,
      paddingTop: 16
    },
    bgLayoutUnit: {
      alignSelf: 'center',
      fontSize: 12,
      paddingBottom: 10
    },
    bgLayoutTime: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    },
    bgLayoutTag: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 4,
      color: 'white',
      backgroundColor: 'black',
      width: 60
    },
    bgLayoutHeader: {
      flex: 1,
      flexDirection: 'row',
      width: '100%'
    }
  }
)

export const DoseLayoutStyles = StyleSheet.create({
  doseLayoutContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  doselayoutContent: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%'
  },
  doseLayoutText: {
    fontSize: 54,
    textAlign: 'right',
    paddingRight: 12
  },
  doseLayoutUnit: {
    fontSize: 12,
    alignSelf: 'center',
    paddingRight: 12
  },
  doseLayoutTime: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
  doseLayoutTag: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    color: 'white',
    backgroundColor: 'black',
    width: 60
  },
  doseLayoutType: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: 'black',
    color: 'white',
  },
  doseLayoutHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  }
})

export const MacroLayoutStyles = StyleSheet.create({
  macroReadingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  macroLayoutContentContainer: {
    flex: 5,
    width: '80%'
  },
  macroLayoutHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  macroLayoutTime: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
  macroLayoutTag: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    color: 'white',
    backgroundColor: 'black',
    width: 60
  },
  macroLayoutTable: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  macroLayoutTableHeaders: {
    flexDirection: 'column',
    padding: 20
  },
  macroLayoutTableHeader: {
    fontSize: 16
  },
  macroLayoutTableValues: {
    flexDirection: 'column',
    padding: 20
  },
  macroLayoutTableValue: {
    fontSize: 16,
    alignSelf: 'flex-end'
  },
  macroReadingReading: {
    fontSize: 10,
    lineHeight: 14
  }
})
