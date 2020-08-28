import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'
import PreviousBgReading from './PreviousBgReading'

type PreviousReadingsForDateProps = {
  date: string,
  opened?: boolean
  readings: {[key: string]: any}
}

const PreviousReadingsForDate: React.FC<PreviousReadingsForDateProps> = (props: PreviousReadingsForDateProps) => {
  const { date, opened, readings } = props
  const [isOpen, setIsOpen] = useState(opened || false)

  const generateList = () => {
    return readings.map(reading => {
      return <PreviousBgReading created={reading.created} reading={reading.reading} key={reading.created} />
    })
  }

  return(
    <View>
      <View style={Styles.header}>
        <GradientBorder x={1.0} y={1.0} />
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Text style={Styles.date}>{date}</Text>
          </TouchableOpacity>
          {isOpen &&
          <>
          <GradientBorder x={1.0} y={1.0} />
          <ScrollView horizontal>
            {generateList()}
          </ScrollView>
          </>}
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
    fontSize: 22,
    fontWeight: 'bold',
    padding: 14,
    textAlign: 'center'
  }
})