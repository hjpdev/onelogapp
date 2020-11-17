import React, { Dispatch, SetStateAction, ReactText, useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import SavedMacrosForLetter from './SavedMacrosForLetter'
import SavedMacrosHeader from './SavedMacrosHeader'
import MacroCollectionSummaryModal from './MacroCollection/MacroCollectionSummaryModal'
import { ALPHABET } from '../../Helpers/General'
import { getData, storeData } from '../../Store'
import { getReadings } from '../../Store/Data'
import { TSavedMacro } from './SavedMacro'

export type TMacroCollectionEntry = {
  amount: number
  reading: TSavedMacro
}

type SavedMacroProps = {
  updateReading: Dispatch<SetStateAction<{ [key: string]: ReactText; }>>
}

const SavedMacros: React.FC<SavedMacroProps> = (props: SavedMacroProps) => {
  const { updateReading } = props

  const [savedMacros, setSavedMacros] = useState<TSavedMacro[]>([])
  const [collection, setCollection] = useState<TMacroCollectionEntry[]>([])
  const [showMacroCollectionSummaryModal, setShowMacroCollectionSummaryModal] = useState<boolean>(false)

  const addEntry = (amount: number, entry: TSavedMacro): void => {
    const updatedEntries = [...collection, { amount, reading: entry }]
    setCollection(updatedEntries)
  }

  const removeEntry = (key: string): void => {
    const clearedCollection = collection.filter((entry) => `${entry.reading.id}-${entry.amount}` !== key)
    setCollection(clearedCollection)
  }

  const fetchSavedMacros = async () => {
    try {
      const data = await getData('savedMacros')
      let { readings } = data
      if (!readings) {
        const response = await getReadings({ dataKeys: ['savedMacros'] })
        readings = response.savedMacros
        await storeData('savedMacros', { readings })
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
    const savedMacrosByLetter: {[day: string]: TSavedMacro[]} = {} as any
    ALPHABET.forEach((letter) => {
      savedMacrosByLetter[letter] = []
    })
    savedMacros.forEach((reading: TSavedMacro) => {
      const firstLetter = reading.name[0]
      savedMacrosByLetter[firstLetter].push(reading)
    })

    return savedMacrosByLetter
  }

  const generateListItems = () => {
    const savedMacrosByLetter = sortSavedMacrosByLetter()

    return ALPHABET.map((letter) => <SavedMacrosForLetter letter={letter} readings={savedMacrosByLetter[letter]} key={letter} update={() => fetchSavedMacros()} addEntry={addEntry} />)
  }

  return (
    <>
      <SavedMacrosHeader numberOfEntries={collection.length} onPress={() => setShowMacroCollectionSummaryModal(true)} />
      <ScrollView>
        {savedMacros && generateListItems()}
      </ScrollView>
      <MacroCollectionSummaryModal isVisible={showMacroCollectionSummaryModal} collection={collection} onClose={() => setShowMacroCollectionSummaryModal(false)} removeEntry={removeEntry} clearCollection={() => setCollection([])} updateReading={updateReading} />
    </>
  )
}

export default SavedMacros
