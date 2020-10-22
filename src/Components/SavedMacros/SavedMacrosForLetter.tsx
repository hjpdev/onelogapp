import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'
import SavedMacro, { TSavedMacro } from './SavedMacro'

type SavedMacrosForLetterProps = {
  letter: string
  readings: TSavedMacro[]
  update: () => void
}

const SavedMacrosForLetter: React.FC<SavedMacrosForLetterProps> = (props: SavedMacrosForLetterProps) => {
  const { letter, readings, update } = props
  const [isOpen, setIsOpen] = useState(false)

  const generateList = () => {
    return readings.map(reading => {
      return <SavedMacro key={reading.id} data={reading} update={() => update()} />
    })
  }

  return(
    <>
    <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={Styles.date}>
        <Text style={Styles.placeholder}>{'▼'}</Text>
        <Text style={Styles.letterText}>{letter.toUpperCase()}</Text>
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
    </>
  )
}

export default SavedMacrosForLetter


const Styles = StyleSheet.create({
  date: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    fontSize: 22,
    padding: 14,
    justifyContent: 'space-between'
  },
  letterText: {
    fontSize: 20,
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
