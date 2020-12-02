import { StyleSheet } from 'react-native';

export const ForDateStyles = StyleSheet.create({
  header: {
    width: '100%'
  },
  date: {
    backgroundColor: '#e6e6e6',
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
    color: '#e6e6e6'
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
    backgroundColor: '#dbdbdb'
  }
});

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
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
