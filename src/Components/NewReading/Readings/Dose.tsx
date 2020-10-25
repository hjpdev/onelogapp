import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native'

import SuccessModal from '../../Modals/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import WheelSelector from '../../Minor/WheelSelector'
import { delay } from '../../../Helpers/General'
import { handleSuccessfulSubmit, submitReading } from '../../../Store/Data'
import { NewReadingHeader } from '../NewReadingHeader'


export const NewDoseReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)
  const [long, setLong] = useState(false)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (reading > 0) {
      if (reading < 1) { delay(500) }
      try {
        const data = dateTime ? { reading, long, created: dateTime } : { reading, long }
        const response = await submitReading({ table: 'dose', data })

        return handleSuccessfulSubmit('doseReadings', response, setShowSuccessModal)
      } catch(err) {
        console.log('Error dose handleSubmit: ', err)
      }
    }
  }

  return(
    <>
    <NewReadingHeader headerText={'Dose'} dataKey={'doseReadings'} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector isDose updateReading={setReading} />
      <Text style={Styles.unit}>{'Units'}</Text>
      <View style={Styles.switch}>
        <Text style={Styles.switchText}>Short</Text>
        <Switch
          testID={'doseReading_toggleSwitch'}
          onValueChange={() => setLong(!long)}
          value={long}
        />
        <Text style={Styles.switchText}>Long</Text>
      </View>
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
  unit: {
    fontSize: 20
  },
  switch: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#e6e6e6'
  },
  submitText: {
    fontSize: 18
  },
})
