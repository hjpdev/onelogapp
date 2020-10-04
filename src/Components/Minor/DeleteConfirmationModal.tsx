import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from './GradientBorder'
import SuccessModal from './SuccessModal'
import { deleteReading, handleSuccessfulDelete } from '../../Store/Data'
import { formatName } from '../SavedMacros/SavedMacro'

type DeleteConfirmationModalProps = {
  id: number
  name: string
  table: string
  isVisible: boolean
  onClose: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props: DeleteConfirmationModalProps) => {
  const { id, name, table, isVisible, onClose } = props

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await deleteReading({ table, id })

      await handleSuccessfulDelete('savedMacros', response, setShowSuccessModal)
      onClose()
    } catch (err) {
      console.log(`Error handleDelete table: ${table}, id: ${id}: ${err}`)
    }
  }

  return (
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
        <Text style={Styles.name}>{`Delete ${formatName(name)}?`}</Text>
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Cancel'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async() => await handleDelete()} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Confirm'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default DeleteConfirmationModal


const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '70%',
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    padding: 6,
    margin: 6
  },
  buttons: {
    flexDirection: 'row'
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