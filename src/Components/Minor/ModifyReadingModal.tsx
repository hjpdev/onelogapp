import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from './GradientBorder'
import SuccessModal from './SuccessModal'

type ModifyReadingModalProps = {
  isVisible: boolean
  id: number
  onClose: () => void
  showReadingModal: () => void
}

const ModifyReadingModal: React.FC<ModifyReadingModalProps> = (props: ModifyReadingModalProps) => {
  const { isVisible, onClose, id, showReadingModal } = props
  const [showSuccessModal, setShowSuccessModal] = useState(false)

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
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={showReadingModal} style={Styles.button}>
            <Text style={Styles.buttonText}>{'Edit'}</Text>
          </TouchableOpacity>
          <GradientBorder x={1.0} y={1.0} />
          <TouchableOpacity onPress={() => null} style={Styles.button}>
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
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 2
  },
  modal: {
    alignItems: 'center'
  },
  buttons: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-around',
    borderRadius: 2
  },
  button: {
    margin: 6
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 6
  }
})
