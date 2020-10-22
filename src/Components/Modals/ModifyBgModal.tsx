import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from '../Minor/GradientBorder'
import ModifyTimeSelector from '../Minor/ModifyTimeSelector'
import SuccessModal from './SuccessModal'
import WheelSelector from '../Minor/WheelSelector'

import { handleSuccessfulUpdate, putReading } from '../../Store/Data'

type ModifyBgModalProps = {
  isVisible: boolean
  data: BgReading
  onClose: () => void
  update: (dataKey: string) => void
}

type BgReading = {
  id: number
  created: Date
  reading: number
}

const ModifyBgModal: React.FC<ModifyBgModalProps> = (props: ModifyBgModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<number>(data.reading || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== data.created ? { created, reading } : { reading }
      const response = await putReading({ table: 'bg', data: body, id: data.id })

      await handleSuccessfulUpdate('bgReadings', response, setShowSuccessModal)
      update('bgReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyBgModal.handleSubmit: ${err}`)
    }
  }

  return(
    <>
    <Modal
      isVisible={isVisible}
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={Styles.modal}
    >
      <View style={Styles.container}>
        <ModifyTimeSelector created={created} setDateTime={setCreated} />
        <WheelSelector reading={data.reading} updateReading={setReading} />
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Cancel'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Submit'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifyBgModal

const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start'
  },
  container: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    width: '50%',
    alignItems: 'center'
  },
  buttonText: {
    padding: 6
  }
})
