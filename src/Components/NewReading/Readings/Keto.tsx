import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import SuccessModal from '../../Modals/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import WheelSelector from '../../Minor/WheelSelector'
import { delay, WheelSelectorOptions } from '../../../Helpers/General'
import ReadingService from '../../../Services/ReadingService'
import { NewReadingHeader } from '../NewReadingHeader'

const readingService = new ReadingService()

export const NewKetoReading: React.FC = () => {
  const [data, setData] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (data === 0) { delay(500) }
    try {
      const reading = dateTime ? { data, created: dateTime } : { data }
      const response = await readingService.submitReading({ table: 'keto', reading })

      return readingService.handleSuccessfulSubmit('ketoReadings', response, setShowSuccessModal)
    } catch (err) {
      console.log('Error keto handleSubmit: ', err)
    }
  }

  return (
    <>
      <NewReadingHeader headerText="Ketones" dataKey="ketoReadings" />
      <View style={Styles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <WheelSelector integerOptions={WheelSelectorOptions.default} fractionOptions={WheelSelectorOptions.default} updateData={setData} />
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
  unit: {
    fontSize: 20
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
})
