import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { delay } from '../../Helpers/General'
import { submitReading } from '../../Helpers/Data'

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
      await delay(1000)
      setShowSuccessModal(false)
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
    height: '92%'
  },
  unit: {
    fontSize: 20
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
