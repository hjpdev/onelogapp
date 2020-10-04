import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import SavedMacrosForLetter from './SavedMacrosForLetter'
import SavedMacrosHeader from './SavedMacrosHeader'
import { ALPHABET } from '../../Helpers/General'
import { getData, storeData } from '../../Store'
import { getReadings } from '../../Store/Data'

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

  useEffect(() => {
    fetchSavedMacros()
  }, [])

  const sortSavedMacrosByLetter = () => {
    const savedMacrosByLetter: {[day: string]: SavedMacro[]} = {} as any
    ALPHABET.forEach(letter => {
      savedMacrosByLetter[letter] = []
    })
    savedMacros.forEach((reading: SavedMacro) => {
      const firstLetter = reading['name'][0]
      savedMacrosByLetter[firstLetter].push(reading)
    })

    return savedMacrosByLetter
  }

  const generateListItems = () => {
    const savedMacrosByLetter = sortSavedMacrosByLetter()

    return ALPHABET.map((letter) => {
      return <SavedMacrosForLetter letter={letter} readings={savedMacrosByLetter[letter]} key={letter} update={() => fetchSavedMacros()} />
    })
  }

  return(
    <>
    <SavedMacrosHeader />
    <ScrollView>
      {savedMacros && generateListItems()}
    </ScrollView>
    </>
  )
}

export default SavedMacros