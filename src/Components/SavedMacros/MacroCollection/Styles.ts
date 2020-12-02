import { StyleSheet } from 'react-native';

export const ConfirmationModalStyles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
  },
  modal: {
	  alignItems: 'center'
  }
});

export const EntryStyles = StyleSheet.create({
  header: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    fontSize: 22,
    padding: 4,
    paddingVertical: 8,
    justifyContent: 'space-around'
  },
  chevron: {
    fontSize: 12,
    textAlign: 'center',
    paddingRight: 8,
    marginRight: 14
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%'
  },
  remove: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 14
  },
  readingContainer: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  labels: {
    flexDirection: 'column',
    padding: 10,
  },
  label: {
    fontSize: 12,
    color: '#3f3d3d'
  },
  values: {
    flexDirection: 'column',
    padding: 10
  },
  value: {
    fontSize: 12,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'black'
  },
});

export const CollectionSummaryModalStyles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    width: '80%',
    height: '50%',
    flex: 0,
    top: '20%',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
  },
  readingContainer: {
    width: '90%',
    margin: 4,
    marginVertical: 18,
    borderRadius: 2,
    borderWidth: 1.2,
    flexDirection: 'row',
    backgroundColor: '#ebebeb',
    justifyContent: 'space-between'
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: '#3f3d3d'
  },
  numbers: {
    flexDirection: 'row',
    width: '50%'
  },
  values: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-around'
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'black'
  },
  percentages: {
    width: '40%',
    justifyContent: 'center'
  },
  percentage: {
    textAlign: 'right'
  },
  entries: {
    width: '100%'
  }
});
