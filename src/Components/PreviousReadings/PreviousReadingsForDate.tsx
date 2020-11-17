import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'

type PreviousReadingsForDateProps = {
  date: string
  readings: {[key: string]: any}
  Template: any
  update: (dataKey: string) => void
  opened?: boolean
}

const PreviousReadingsForDate: React.FC<PreviousReadingsForDateProps> = (props: PreviousReadingsForDateProps) => {
  const { date, opened, readings, Template, update } = props
  const [isOpen, setIsOpen] = useState(opened || false)

  const generateList = () => readings.map((reading) => <Template key={reading.id} data={reading} update={update} />)

  return (
    <View>
      <View style={Styles.header}>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={Styles.date}>
          <Text style={Styles.placeholder}>▶︎</Text>
          <Text style={Styles.dateText}>{date}</Text>
          <Text style={Styles.chevron}>{ isOpen ? '▼' : '▶︎'}</Text>
        </TouchableOpacity>
        {isOpen
          && (
          <>
            <GradientBorder x={1.0} y={1.0} />
            <View style={Styles.view}>
              {generateList()}
            </View>
          </>
          )}
        <GradientBorder x={1.0} y={1.0} />
      </View>
    </View>
  )
}

export default PreviousReadingsForDate

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
    fontSize: 18,
    flex: 4,
    textAlign: 'center',
    fontWeight: 'bold',
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
})
