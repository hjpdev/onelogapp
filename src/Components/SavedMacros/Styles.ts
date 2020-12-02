import { StyleSheet } from 'react-native';

export const NewSavedMacroModalStyles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1.5,
    borderBottomWidth: 2,
    flex: 0
  },
  modal: {
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: 'grey',
    borderRadius: 2
  }
});

export const SavedMacroStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: '1.1%',
    width: '31%'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  icon: {
    tintColor: 'black',
    height: 14,
    width: 14,
    padding: 4,
    marginTop: 4
  },
  name: {
    flex: 5
  },
  nameText: {
    fontSize: 14,
    textAlign: 'center'
  },
  readingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 8
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: '#3f3d3d'
  },
  values: {
    flexDirection: 'column',
    padding: 10
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'black'
  }
});

export const SavedMacrosForLetterStyles = StyleSheet.create({
  date: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    fontSize: 22,
    padding: 14,
    justifyContent: 'space-between'
  },
  letterText: {
    fontSize: 20
  },
  placeholder: {
    paddingLeft: 8,
    fontSize: 22,
    color: '#e6e6e6'
  },
  chevron: {
    fontSize: 22,
    textAlign: 'center',
    paddingRight: 8
  },
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#dbdbdb'
  }
});

export const SavedMacrosHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
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
  textContainer: {
    flex: 4
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  numberOfEntries: {
    color: 'red',
    textAlign: 'right',
    paddingTop: 6,
    paddingRight: 4,
    fontSize: 10,
    fontWeight: 'bold',
    height: 40,
    width: 30
  }
});
