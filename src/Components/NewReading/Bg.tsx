import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { delay } from '../../Helpers/General'
import { submitReading, update } from '../../Helpers/Data'

type NewBgReadingProps = {
  onBack: () => void
}

export const NewBgReading: React.FC<NewBgReadingProps> = (props: NewBgReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (reading > 0) {
      if (reading < 1) { delay(500) }
      try {
        const data = dateTime ? { reading, created: dateTime } : { reading }
        await submitReading('bg', data)
        await update('bg')
        setShowSuccessModal(true)
        await delay(1000)
        setShowSuccessModal(false)
      } catch (err) {
        console.log('Error bg handleSubmit: ', err)
      }
    }
  }

  return(
    <>
    <NewReadingHeader text={'New Bg Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
      <Text style={Styles.unit}>{'mmol/L'}</Text>
      <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.submit}>
        <Text style={Styles.submitText}>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}


const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '90%'
  },
  submit: {
    padding: 20,
    backgroundColor: '#c4c4c4'
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  unit: {
    fontSize: 20
  }
})
