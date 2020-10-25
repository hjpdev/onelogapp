import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from '../Minor/GradientBorder'
import SuccessModal from './SuccessModal'
import { deleteReading, handleSuccessfulDelete } from '../../Store/Data'
import { formatName } from '../../Helpers/General'

type DeleteConfirmationModalProps = {
  id: number
  name: string
  table: string
  dataKey: string
  isVisible: boolean
  onClose: () => void
  update: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props: DeleteConfirmationModalProps) => {
  const { id, name, table, dataKey, isVisible, onClose, update } = props

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await deleteReading({ table, id })

      await handleSuccessfulDelete(dataKey, response, setShowSuccessModal)
      await update()
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
      backdropOpacity={0.33}
      style={Styles.modal}
    >
      <View style={Styles.container}>
        <Text style={Styles.name}>{`Delete ${formatName(name)}?`}</Text>
        <View style={Styles.buttons}>
          <View style={{ width: '50%', borderRightWidth: 1 }}>
            <TouchableOpacity onPress={onClose} style={Styles.button}>
              <Text style={Styles.buttonText}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%' }}>
            <TouchableOpacity onPress={async() => await handleDelete()} style={Styles.button}>
              <Text style={Styles.buttonText}>{'Confirm'}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#e4e4e4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    padding: 6,
    margin: 6
  },
  buttons: {
    flexDirection: 'row',
    borderTopWidth: 1
  },
  button: {
    margin: 6
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 6
  }
})
