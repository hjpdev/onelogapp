import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import MacroAmountSelector from './MacroAmountSelector'
import GradientBorder from './GradientBorder'
import SuccessModal from './SuccessModal'
import { handleSuccessfulSubmit, submitReading } from '../../Store/Data'

type ModifyReadingModalProps = {
  isVisible: boolean
  onClose: () => void
  id: number
  type: string
}

const ModifyReadingModal: React.FC<ModifyReadingModalProps> = (props: ModifyReadingModalProps) => {
  const { isVisible, onClose, id, type } = props
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return(
    <>
    <Modal isVisible={isVisible} animationIn='fadeInUp' animationOut='fadeOutDown' animationInTiming={500} animationOutTiming={500} style={Styles.modal}>
      <View style={Styles.container}>
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose}>
            <Text style={Styles.buttonText}>{'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <Text style={Styles.buttonText}>{'Delete'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifyReadingModal


const Styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 2
  },
  modal: {
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: 'grey',
    borderRadius: 2
  },
  buttons: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 2
  },
  buttonText: {
    padding: 6
  }
})
