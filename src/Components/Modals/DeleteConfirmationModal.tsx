import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'

import SuccessModal from './SuccessModal'
import ReadingService from '../../Services/ReadingService'
import { ChoiceButtons } from '../Minor'
import { generateCreatedDate } from '../../Helpers'
import { truncateName } from '../../Helpers/General'
import { DataKey, StoredReading, Table } from '../../types'
import { DeleteConfirmationStyles } from './Styles'

interface DeleteConfirmationModalProps {
  reading: StoredReading
  table: Table
  dataKey: DataKey
  isVisible: boolean
  onClose: () => void
  update: (_: DataKey) => void
}

const readingService = new ReadingService()

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props: DeleteConfirmationModalProps) => {
  const { reading, table, dataKey, isVisible, onClose, update } = props
  const { id, created } = reading
  const name = generateCreatedDate(`${created}`)

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await readingService.deleteReading({ table, id })

      await readingService.handleSuccessfulDelete(dataKey, response, setShowSuccessModal)
      await update(dataKey)
      onClose()
    } catch (err) {
      console.log(`Error handleDelete table: ${table}, id: ${id}: ${err}`) // eslint-disable-line no-console
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
        style={DeleteConfirmationStyles.modal}
      >
        <View style={DeleteConfirmationStyles.container}>
          <Text style={DeleteConfirmationStyles.name}>{`Delete:  ${truncateName(20, name)}?`}</Text>
          <ChoiceButtons
            confirmationText="Confirm"
            cancellationText="Cancel"
            onSubmit={async () => handleDelete()}
            onClose={onClose}
          />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default DeleteConfirmationModal
