import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, ModifyTimeSelector, MacroReadingInput } from '../../Minor'
import { StoredMacroReading, Table, DataKey, MacroReadingData } from '../../../types'
import { ModifyMacroStyles } from '../Styles'

interface ModifyMacroModalProps {
  isVisible: boolean
  reading: StoredMacroReading
  onClose: () => void
  update: (_: DataKey) => void
}

const ModifyMacroModal: React.FC<ModifyMacroModalProps> = (props: ModifyMacroModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState({} as MacroReadingData)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { ...reading, created } : { ...reading }
      const response = await ReadingService.putReading({ table: Table.macro, data: body, id: reading.id })

      await ReadingService.handleSuccessfulUpdate(DataKey.macro, response, setShowSuccessModal)
      update(DataKey.macro)
      onClose()
    } catch (err) {
      console.log(`Error ModifyMacroModal.handleSubmit: ${err}`)
    }
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={500}
        animationOutTiming={500}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.66}
        style={ModifyMacroStyles.modal}
      >
        <View style={ModifyMacroStyles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setData} />
          <View style={ModifyMacroStyles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={ModifyMacroStyles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ChoiceButtons
            confirmationText="Submit"
            cancellationText="Cancel"
            onSubmit={async () => handleSubmit()}
            onClose={onClose}
          />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
      <DeleteConfirmationModal
        isVisible={showDeleteConfirmationModal}
        reading={reading}
        table={Table.macro}
        dataKey={DataKey.macro}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.macro)}
      />
    </>
  )
}

export default ModifyMacroModal
