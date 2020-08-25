import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

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
    <View>
      <MacroSelector hasThousands updateMacro={setKcal} />
      <MacroSelector hasThousands={false} updateMacro={setCarbs} />
      <MacroSelector hasThousands={false} updateMacro={setSugar} />
      <MacroSelector hasThousands={false} updateMacro={setProtein} />
      <MacroSelector hasThousands={false} updateMacro={setFat} />
    </View>
  )
}

export default MacroReadingInput