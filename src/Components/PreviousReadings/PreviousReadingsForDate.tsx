import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'

type PreviousReadingsForDateProps = {
  date: string
}

const PreviousReadingsForDate: React.FC<PreviousReadingsForDateProps> = (props: PreviousReadingsForDateProps) => {
  const { date } = props
  
  const [isOpen, setIsOpen] = useState(false)

  return(
    <View>
      <View style={Styles.header}>
        <GradientBorder x={1.0} y={1.0} />
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Text style={Styles.text}>{date}</Text>
          </TouchableOpacity>
          {isOpen &&
          <ScrollView horizontal>

          </ScrollView>}
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
  text: {
    fontSize: 20,
    padding: 14,
    textAlign: 'center'
  }
})