import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import MacroReadingInput from '../Minor/MacroReadingInput'
import NewReadingHeader from '../Minor/NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import { delay } from '../../Helpers/General'
import { submitReading, update } from '../../Helpers/Data'

type NewMacroReadingProps = {
  onBack: () => void
}

export const NewMacroReading: React.FC<NewMacroReadingProps> = (props: NewMacroReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState({})
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (Object.keys(reading).length > 0) {
      if (!Object.keys(reading).every(macro => { return reading[macro] === 0 })) {
        try {
          const data = dateTime ? { ...reading, created: dateTime } : { ...reading }

          await submitReading('macro', data)
          await update('macro')
          setShowSuccessModal(true)
          await delay(1000)
          setShowSuccessModal(false)
        } catch(err) {
          console.log('Error macro handleSubmit: ', err)
        }
      }
    }
  }

  return(
    <>
    <NewReadingHeader text={'New Macro Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <MacroReadingInput updateReading={setReading} />
      <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.submit}>
        <Text style={Styles.submitText}>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewMacroReading


const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    padding: 16,
    backgroundColor: '#b8b8b8'
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})
