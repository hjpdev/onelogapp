import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import ReadingService from '../../../Services/ReadingService'
import DeleteConfirmationModal from '../DeleteConfirmationModal'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, GradientBorder, MacroAmountSelector, MacroReadingInput } from '../../Minor'
import { capitaliseAddWhitespace } from '../../../Helpers/General'
import { DataKey, MacroReadingData, StoredSavedMacroReading, Table } from '../../../types'
import { ModifySavedMacroStyles } from '../Styles'

interface ModifySavedMacroModalProps {
  isVisible: boolean
  reading: StoredSavedMacroReading
  onClose: () => void
  update: (_: DataKey) => void
}

const ModifySavedMacroModal: React.FC<ModifySavedMacroModalProps> = (props: ModifySavedMacroModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [name, setName] = useState(reading.name)
  const [amount, setAmount] = useState(reading.amount)
  const [unit, setUnit] = useState(reading.unit)
  const [data, setReading] = useState({} as MacroReadingData)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const { id } = data

  const handleSubmit = async () => {
    try {
      const newReading = {
        name,
        ...data,
        amount,
        unit
      }
      const response = await ReadingService.putReading({ table: Table.savedMacro, data: newReading, id })

      await ReadingService.handleSuccessfulUpdate(DataKey.savedMacro, response, setShowSuccessModal)
      update(DataKey.savedMacro)
      onClose()
    } catch (err) {
      console.log(`Error ModifySavedMacroModal.handleSubmit: ${err}`)
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
      >
        <View style={ModifySavedMacroStyles.container}>
          <TextInput value={capitaliseAddWhitespace(name)} onChangeText={setName} style={ModifySavedMacroStyles.name} />
          <GradientBorder x={1.0} y={1.0} />
          <MacroAmountSelector
            updateAmount={setAmount}
            updateUnit={setUnit}
            amount={amount}
            unit={unit}
            allowEditUnit
          />
          <GradientBorder x={1.0} y={1.0} />
          <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setReading} />
          <View style={ModifySavedMacroStyles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={ModifySavedMacroStyles.deleteText}>Delete</Text>
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
        table={Table.savedMacro}
        dataKey={DataKey.savedMacro}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.savedMacro)}
      />
    </>
  )
}

export default ModifySavedMacroModal
