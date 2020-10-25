import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import GradientBorder from '../../Minor/GradientBorder'
import { formatName } from '../../../Helpers/General'
import { TSavedMacro } from '../SavedMacro'

type MacroCollectionEntryProps = {
  amount: number
  reading: TSavedMacro
  removeEntry: (key: string) => void
}

const MacroCollectionEntry: React.FC<MacroCollectionEntryProps> = (props: MacroCollectionEntryProps) => {
  const { amount, reading, removeEntry } = props
  const [isOpen, setIsOpen] = useState(false)

  const ratio = parseFloat((amount / reading.amount).toFixed(2))

  return(
	<>
	<GradientBorder x={1.0} y={1.0} />
	  <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={Styles.header}>
      <TouchableOpacity onPress={() => removeEntry(`${reading.id}-${amount}`)}>
        <Text style={Styles.remove}>{'X'}</Text>
      </TouchableOpacity>
      <View style={Styles.headerText}>
        <Text>{`${formatName(reading.name)}`}</Text><Text>{`  ${(ratio * reading.amount).toFixed(0)} ${reading.unit}`}</Text>
      </View>
      <View>
        <Text style={Styles.chevron}>{ isOpen ? '▼' : '▶︎'}</Text>
      </View>
	  </TouchableOpacity>
	  {isOpen &&
	  <>
	  <GradientBorder x={1.0} y={1.0} />
	  <View style={Styles.readingContainer}>
      <View style={Styles.labels}>
        <Text style={Styles.label}>{'Kcal:'}</Text>
        <Text style={Styles.label}>{'Carbs:'}</Text>
        <Text style={Styles.label}>{'Sugar:'}</Text>
        <Text style={Styles.label}>{'Protein:'}</Text>
        <Text style={Styles.label}>{'Fat:'}</Text>
      </View>

      <View style={Styles.values}>
        <Text style={Styles.value}>{ (ratio * reading.kcal).toFixed(2) }</Text>
        <Text style={Styles.value}>{ (ratio * reading.carbs).toFixed(2) }</Text>
        <Text style={Styles.value}>{ (ratio * reading.sugar).toFixed(2) }</Text>
        <Text style={Styles.value}>{ (ratio * reading.protein).toFixed(2) }</Text>
        <Text style={Styles.value}>{ (ratio * reading.fat).toFixed(2) }</Text>
      </View>
	  </View>
	  </>}
	<GradientBorder x={1.0} y={1.0} />
	</>
  )
}


export default MacroCollectionEntry


const Styles = StyleSheet.create({
  header: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    fontSize: 22,
    padding: 4,
    paddingVertical: 8,
    justifyContent: 'space-between'
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
    width: '50%'
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
})
