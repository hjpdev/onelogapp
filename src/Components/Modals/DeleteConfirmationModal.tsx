import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, StyleSheet, View } from 'react-native'

import ChoiceButtons from '../Minor/ChoiceButtons'
import SuccessModal from './SuccessModal'
import ReadingService from '../../Services/ReadingService'
import { truncateName } from '../../Helpers/General'

interface DeleteConfirmationModalProps {
  id: number
  name: string
  table: string
  dataKey: string
  isVisible: boolean
  onClose: () => void
  update: () => void
}

const readingService = new ReadingService()

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props: DeleteConfirmationModalProps) => {
  const { id, name, table, dataKey, isVisible, onClose, update } = props

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await readingService.deleteReading({ table, id })

      await readingService.handleSuccessfulDelete(dataKey, response, setShowSuccessModal)
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
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.33}
        style={Styles.modal}
      >
        <View style={Styles.container}>
          <Text style={Styles.name}>{`Delete:  ${truncateName(20, name)}?`}</Text>
          <ChoiceButtons confirmationText="Confirm" cancellationText="Cancel" onSubmit={async () => await handleDelete()} onClose={onClose} />
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
    width: '80%',
    backgroundColor: '#e4e4e4',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  name: {
    fontSize: 16,
    padding: 6,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    margin: 6
  }
})
