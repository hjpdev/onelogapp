import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { submitReading } from '../../Helpers/Data'
import { delay } from '../../Helpers/General'

type NewKetoReadingProps = {
  onBack: () => void
}

export const NewKetoReading: React.FC<NewKetoReadingProps> = (props: NewKetoReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (reading === 0) { delay(500) }
    try {
      const data = dateTime ? { reading, created: dateTime } : { reading }

      await submitReading('keto', data)
      setShowSuccessModal(true)
    } catch(err) {
      console.log('Error keto handleSubmit: ', err)
    }
  }

  return(
    <>
    <NewReadingHeader text={'New Ketones Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
      <Text style={Styles.unit}>{'mmol/L'}</Text>
      <TouchableOpacity onPress={async () => await handleSubmit()} style={Styles.submit}>
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
  unit: {
    fontSize: 20
  },
  submit: {
    padding: 20,
    backgroundColor: '#c4c4c4'
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
