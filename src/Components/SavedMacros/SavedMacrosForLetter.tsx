import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import SavedMacro from './SavedMacro'
import GradientBorder from '../Minor/GradientBorder'

type SavedMacrosForLetterProps = {
  letter: string
  readings: {[key: string]: any}
}

const SavedMacrosForLetter: React.FC<SavedMacrosForLetterProps> = (props: SavedMacrosForLetterProps) => {
  const { letter, readings } = props
  const [isOpen, setIsOpen] = useState(false)

  const generateList = () => {
    return readings.map(reading => {
      return <SavedMacro key={reading.id} data={reading} />
    })
  }

  return(
    <View>
      <View style={Styles.header}>
        <GradientBorder x={1.0} y={1.0} />
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={Styles.date}>
            <Text style={Styles.placeholder}>{'▶︎'}</Text>
            <Text style={Styles.dateText}>{letter}</Text>
            <Text style={Styles.chevron}>{ isOpen ? '▼' : '▶︎'}</Text>
          </TouchableOpacity>
          {isOpen &&
          <>
          <GradientBorder x={1.0} y={1.0} />
          <View style={Styles.view}>
            {generateList()}
          </View>
          </>}
        <GradientBorder x={1.0} y={1.0} />
      </View>
    </View>
  )
}

export default SavedMacrosForLetter


const Styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: 'bold',
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
})
