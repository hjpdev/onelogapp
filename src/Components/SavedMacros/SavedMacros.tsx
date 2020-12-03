import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import MacroCollectionSummaryModal from './MacroCollection/MacroCollectionSummaryModal'
import ReadingService from '../../Services/ReadingService'
import SavedMacrosForLetter from './SavedMacrosForLetter'
import SavedMacrosHeader from './SavedMacrosHeader'
import { ALPHABET } from '../../Helpers/General'
import { LocalStore } from '../../Store'
import { DataKey, StoredSavedMacroReading } from '../../types'

export interface MacroCollectionEntry {
  amount: number
  reading: StoredSavedMacroReading
}

interface SavedMacrosProps {
  updateReading: Dispatch<SetStateAction<StoredSavedMacroReading>>
}

const SavedMacros: React.FC<SavedMacrosProps> = (props: SavedMacrosProps) => {
  const { updateReading } = props

  const [savedMacros, setSavedMacros] = useState([] as StoredSavedMacroReading[])
  const [collection, setCollection] = useState([] as MacroCollectionEntry[])
  const [showMacroCollectionSummaryModal, setShowMacroCollectionSummaryModal] = useState(false)

  const addEntry = (amount: number, entry: StoredSavedMacroReading): void => {
    const updatedEntries = [...collection, { amount, reading: entry }]
    setCollection(updatedEntries)
  }

  const removeEntry = (key: string): void => {
    const clearedCollection = collection.filter((entry) => `${entry.reading.id}-${entry.amount}` !== key)
    setCollection(clearedCollection)
  }

  const fetchSavedMacros = async () => {
    try {
      const data = await LocalStore.getData(DataKey.savedMacro)
      let { readings } = data
      if (!readings) {
        const response = await ReadingService.getReadings({
          dataKeys: [DataKey.savedMacro]
        })
        readings = response.savedMacros
        await LocalStore.storeData(DataKey.savedMacro, readings)
      }
      setSavedMacros(readings)
    } catch (err) {
      console.log('Error SavedMacros.fetchSavedMacros: ', err)
    }
  }

  useEffect(() => {
    fetchSavedMacros()
  }, [])

  const sortSavedMacrosByLetter = () => {
    const savedMacrosByLetter: {
      [day: string]: StoredSavedMacroReading[]
    } = {} as any
    ALPHABET.forEach((letter) => {
      savedMacrosByLetter[letter] = []
    })
    savedMacros.forEach((reading: StoredSavedMacroReading) => {
      const firstLetter = reading.name[0]
      savedMacrosByLetter[firstLetter].push(reading)
    })

    return savedMacrosByLetter
  }

  const generateListItems = () => {
    const savedMacrosByLetter = sortSavedMacrosByLetter()
    return ALPHABET.map((letter) => (
      <SavedMacrosForLetter
        letter={letter}
        readings={savedMacrosByLetter[letter]}
        key={letter}
        update={() => fetchSavedMacros()}
        addEntry={addEntry}
      />
    ))
  }

  return (
    <>
      <SavedMacrosHeader numberOfEntries={collection.length} onPress={() => setShowMacroCollectionSummaryModal(true)} />
      <ScrollView>{savedMacros && generateListItems()}</ScrollView>
      <MacroCollectionSummaryModal
        isVisible={showMacroCollectionSummaryModal}
        collection={collection}
        onClose={() => setShowMacroCollectionSummaryModal(false)}
        removeEntry={removeEntry}
        clearCollection={() => setCollection([])}
        updateReading={updateReading}
      />
    </>
  )
}

export default SavedMacros
