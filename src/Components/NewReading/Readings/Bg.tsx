import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import SuccessModal from '../../Modals/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import WheelSelector from '../../Minor/WheelSelector'
import { delay } from '../../../Helpers'
import { handleSuccessfulSubmit, submitReading } from '../../../Store/Data'
import { NewReadingHeader } from '../NewReadingHeader'

export const NewBgReading: React.FC = () => {
  const [data, setData] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (data > 0) {
      if (data < 1) { delay(500) }
      try {
        const reading = dateTime ? { data, created: dateTime } : { data }
        const response = await submitReading({ table: 'bg', reading })

        return response && handleSuccessfulSubmit('bgReadings', response, setShowSuccessModal)
      } catch (err) {
        console.log('Error bg handleSubmit: ', err)
      }
    }
  }

  return (
    <>
      <NewReadingHeader headerText="Bg" dataKey="bgReadings" />
      <View style={Styles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <WheelSelector updateData={setData} />
        <Text style={Styles.unit}>mmol/L</Text>
        <TouchableOpacity onPress={async () => await handleSubmit()} style={Styles.submit}>
          <Text style={Styles.submitText}>Submit</Text>
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
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#d6d6d6'
  },
  submitText: {
    fontSize: 18
  },
  unit: {
    fontSize: 20
  }
})
