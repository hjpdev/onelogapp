import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import MacroReadingInput from '../../Minor/MacroReadingInput'
import { NewReadingHeader } from '../NewReadingHeader'
import SuccessModal from '../../Minor/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import { delay } from '../../../Helpers/General'
import { submitReading, update } from '../../../Store/Data'

export const NewMacroReading: React.FC = () => {
  const [reading, setReading] = useState<{[key: string]: string | number}>({})
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (Object.keys(reading).length > 0) {
      if (!Object.keys(reading).every(macro => { return reading[macro] === 0 })) {
        try {
          const data = dateTime ? { ...reading, created: dateTime } : { ...reading }

          await submitReading({ table: 'macro', data })
          await update({ dataKey: 'macroReadings' })
          
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
    <NewReadingHeader headerText={'Macro'} dataKey={'macroReadings'} />
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
    backgroundColor: '#e6e6e6'
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})
