import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

import NewReadingHeader from '../Minor/NewReadingHeader'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { submitReading } from '../../Helpers/Data'
import { delay } from '../../Helpers/General'

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
        setShowSuccessModal(true)
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
    <Modal isVisible={showSuccessModal} animationIn='zoomIn' animationOut='zoomOut' animationInTiming={500} animationOutTiming={200} hasBackdrop={false} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <TouchableOpacity style={{padding: 300}} onPress={() => setShowSuccessModal(false)}>
          <Image style={{ height: 100, width: 100 }} source={require('../../Assets/Images/Confirmation.png')} />
        </TouchableOpacity>
      </View>
    </Modal>
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
