import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native'

import NewReadingHeader from './NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { delay } from '../../Helpers/General'
import { submitReading, update } from '../../Helpers/Data'

type NewDoseReadingProps = {
  onBack: () => void
}

export const NewDoseReading: React.FC<NewDoseReadingProps> = (props: NewDoseReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState(0.0)
  const [isLong, setIsLong] = useState(false)
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    if (reading > 0) {
      if (reading < 1) { delay(500) }
      try {
        const data = dateTime ? { reading, isLong, created: dateTime } : { reading, isLong }

        await submitReading('dose', data)
        await update('dose')
        setShowSuccessModal(true)
        await delay(1000)
        setShowSuccessModal(false)
      } catch(err) {
        console.log('Error dose handleSubmit: ', err)
      }
    }
  }

  return(
    <>
    <NewReadingHeader text={'New Dose Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector isDose updateReading={setReading} />
      <Text style={Styles.unit}>{'Units'}</Text>
      <View style={Styles.switch}>
        <Text style={Styles.switchText}>Short</Text>
        <Switch
          testID={'doseReading_toggleSwitch'}
          onValueChange={() => setIsLong(!isLong)}
          value={isLong}
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
    borderRadius: 2,
    padding: 16,
    backgroundColor: '#e6e6e6'
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})
