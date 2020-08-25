import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import MacroSelector from './MacroSelector'

const MacroReadingInput: React.FC = () => {
  const [reading, setReading] = useState({})
  const [kcal, setKcal] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [sugar, setSugar] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)

  useEffect(() => {
    setReading({ kcal, carbs, sugar, protein, fat })
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