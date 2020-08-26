import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'
import SuccessModal from '../Minor/SuccessModal'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { submitReading, update } from '../../Helpers/Data'
import { delay } from '../../Helpers/General'

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
      const data = dateTime ? { reading, isLong, created: dateTime } : { reading, isLong }
      await submitReading('dose', data)
      await update('dose')
      setShowSuccessModal(true)
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
    padding: 20,
    backgroundColor: '#c4c4c4'
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
