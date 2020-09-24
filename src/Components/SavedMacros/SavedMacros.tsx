import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import SavedMacrosHeader from './SavedMacrosHeader'
import SavedMacrosForLetter from './SavedMacrosForLetter'
import { getData, storeData } from '../../Store'
import { getReadings } from '../../Store/Data'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

type SavedMacro = {
  id: string
  created: Date
  name: string
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
  unit: string
  amount: number
  times_added: number
}

const SavedMacros: React.FC = () => {
  const [savedMacros, setSavedMacros] = useState([] as any)

  useEffect(() => {
    const fetchSavedMacros = async () => {
      try {
        const data = await getData('savedMacros')
        let { readings } = data
        if (!readings) {
          const response = await getReadings({ dataKeys: ['savedMacros'] })
          readings = response['savedMacros']
          await storeData('savedMacros', { readings })
        }
        setSavedMacros(readings)
      } catch(err) {
        console.log('Error SavedMacros.fetchSavedMacros: ', err)
      }
    }
    fetchSavedMacros()
  }, [])

  const sortSavedMacrosByLetter = () => {
    const savedMacrosByLetter: {[day: string]: SavedMacro[]} = {} as any
    letters.forEach(letter => {
      savedMacrosByLetter[letter] = []
    })
    savedMacros.forEach(reading => {
      const firstLetter = reading['name'][0]
      savedMacrosByLetter[firstLetter].push(reading)
    })

    return savedMacrosByLetter
  }

  const generateListItems = () => {
    const savedMacrosByLetter = sortSavedMacrosByLetter()

    return letters.map((letter) => {
      return <SavedMacrosForLetter letter={letter} readings={savedMacrosByLetter[letter]} key={letter} />
    })
  }

  return(
    <>
    <SavedMacrosHeader />
    <ScrollView>
      {generateListItems()}
    </ScrollView>
    </>
  )
}

export default SavedMacros