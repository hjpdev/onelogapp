import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import NewReadingHeader from '../NewReadingHeader'
import SuccessModal from '../../Minor/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import WheelSelector from '../../Minor/WheelSelector'
import { delay } from '../../../Helpers/General'
import { submitReading, update } from '../../../Store/Data'

export const NewBgReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (reading > 0) {
      if (reading < 1) { delay(500) }
      try {
        const data = dateTime ? { reading, created: dateTime } : { reading }
        await submitReading({ table: 'bg', data })
        await update({ dataKey: 'bgReadings' })
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
    <NewReadingHeader headerText={'Bg'} dataKey={'bgReadings'} />
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
  unit: {
    fontSize: 20
  }
})
