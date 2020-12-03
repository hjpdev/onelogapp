import { StyleSheet } from 'react-native'

import Colors from '../../Assets/Styles/Colors'

export const ForDateStyles = StyleSheet.create({
  header: {
    width: '100%'
  },
  date: {
    backgroundColor: Colors.lightGrey3,
    flexDirection: 'row',
    fontSize: 22,
    padding: 14,
    justifyContent: 'space-between'
  },
  dateText: {
    fontSize: 18,
    flex: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  placeholder: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 22,
    color: Colors.lightGrey3
  },
  chevron: {
    fontSize: 22,
    textAlign: 'center',
    paddingRight: 8,
    flex: 1
  },
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: Colors.lightGrey5
  }
});

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey3,
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
  textContainer: {
    flex: 4
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  placeholder: {
    height: 40,
    width: 30
  }
});

export const BgStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '18%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    tintColor: Colors.black,
    height: 10,
    width: 10
  },
  placeholder: {
    tintColor: Colors.lightGrey1,
    height: 10,
    width: 10
  },
  timeCreated: {
    fontSize: 14
  },
  reading: {
    fontSize: 28,
    paddingVertical: 6
  }
})

export const DoseStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 4,
    width: '23%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    tintColor: Colors.black,
    height: 10,
    width: 10
  },
  placeholder: {
    tintColor: Colors.lightGrey1,
    height: 10,
    width: 10
  },
  timeCreated: {
    fontSize: 14
  },
  reading: {
    width: '100%'
  },
  readingText: {
    width: '100%',
    fontSize: 34,
    textAlign: 'center'
  },
  readingBackground: {
    width: '100%'
  },
  typeText: {
    textAlign: 'center'
  }
})

export const KetoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '23%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    tintColor: Colors.black,
    height: 10,
    width: 10
  },
  placeholder: {
    tintColor: Colors.lightGrey1,
    height: 10,
    width: 10
  },
  timeCreated: {
    fontSize: 14
  },
  reading: {
    fontSize: 34
  },
  readingBackground: {
    width: '100%'
  }
})

export const MacroStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey1,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: '1.1%',
    width: '31%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeCreated: {
    fontSize: 16
  },
  icon: {
    tintColor: Colors.black,
    height: 14,
    width: 14,
    padding: 4,
    marginTop: 4
  },
  placeholder: {
    tintColor: Colors.lightGrey1,
    height: 14,
    width: 14,
    padding: 4,
    marginTop: 4
  },
  reading: {
    fontSize: 38
  },
  readingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: Colors.darkGrey1
  },
  values: {
    flexDirection: 'column',
    padding: 10
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: Colors.black
  }
})
