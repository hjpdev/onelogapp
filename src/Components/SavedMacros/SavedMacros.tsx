import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

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
  const [savedMacros, setSavedMacros] = useState([])

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        let data = await getData('savedMacros')
        if (!data || !data.savedMacros) {
          const savedMacros = await getReadings({ dataKeys: ['savedMacros'] })
          await storeData('savedMacros', savedMacros)
          data = await getData('savedMacros')
        }
        if (data && data.savedMacros) {
          setSavedMacros(data.savedMacros)
        }
      } catch(err) {
        console.log('Error PreviousReadings.fetchReadings: ', err)
      }
    }
    fetchReadings()
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
    <ScrollView style={Styles.container}>
      {generateListItems()}
    </ScrollView>
    </>
  )
}

export default SavedMacros


const Styles = StyleSheet.create({
  container: {
    height: '92%'
  }
})
