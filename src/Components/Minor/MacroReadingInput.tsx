import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import MacroSelector from './MacroSelector'

type MacroReadingInputProps = {
  updateReading: (reading: {[macro: string]: number}) => any
}

const MacroReadingInput: React.FC<MacroReadingInputProps> = (props: MacroReadingInputProps) => {
  const { updateReading } = props

  const [kcal, setKcal] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [sugar, setSugar] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)

  useEffect(() => {
    const reading = { kcal, carbs, sugar, protein, fat }
    updateReading(reading)
  }, [kcal, carbs, sugar, protein, fat])

  return(
    <View style={Styles.container}>
      <View style={Styles.input}>
        <Text style={Styles.label}>{'Kcal: '}</Text>
        <MacroSelector hasThousands updateMacro={setKcal} />
      </View>
      <View style={Styles.input}>
        <Text style={Styles.label}>{'Carbs: '}</Text>
        <MacroSelector hasThousands={false} updateMacro={setCarbs} />
      </View>
      <View style={Styles.input}>
        <Text style={Styles.label}>{'Sugar: '}</Text>
        <MacroSelector hasThousands={false} updateMacro={setSugar} />
      </View>
      <View style={Styles.input}>
        <Text style={Styles.label}>{'Protein: '}</Text>
        <MacroSelector hasThousands={false} updateMacro={setProtein} />
      </View>
      <View style={Styles.input}>
        <Text style={Styles.label}>{'Fat: '}</Text>
        <MacroSelector hasThousands={false} updateMacro={setFat} />
      </View>
    </View>
  )
}

export default MacroReadingInput


const Styles = StyleSheet.create({
  container: {
    width: '60%'
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    textAlignVertical: 'bottom',
    paddingBottom: 6
  }
})
