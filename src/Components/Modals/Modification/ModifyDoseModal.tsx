import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Switch, Text, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { DataKey, StoredDoseReading, Table } from '../../../types'
import { ModifyDoseStyles } from '../Styles'

interface ModifyDoseModalProps {
  isVisible: boolean
  reading: StoredDoseReading
  onClose: () => void
  update: (_: DataKey) => void
}

const readingService = new ReadingService()

const ModifyDoseModal: React.FC<ModifyDoseModalProps> = (props: ModifyDoseModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState(reading.data || 0.0)
  const [long, setLong] = useState(reading.long)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const state: StoredDoseReading = {
    id: reading.id,
    created,
    data,
    long
  }

  const isPropertyUpdated = (property: keyof StoredDoseReading) => state[property] !== reading[property]

  const handleSubmit = async () => {
    try {
      const body = {} as any
      Object.keys(state).forEach((key) => {
        if (isPropertyUpdated(key)) {
          body[key] = state[key]
        }
      })
      const response = await readingService.putReading({
        table: Table.dose,
        data: body,
        id: state.id
      })

      await readingService.handleSuccessfulUpdate(DataKey.dose, response, setShowSuccessModal)
      update(DataKey.dose)
      onClose()
    } catch (err) {
      console.log(`Error ModifyDoseModal.handleSubmit: ${err}`) // eslint-disable-line no-console
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
        style={ModifyDoseStyles.modal}
      >
        <View style={ModifyDoseStyles.container}>
          <View style={ModifyDoseStyles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={ModifyDoseStyles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ModifyTimeSelector created={state.created} setDateTime={setCreated} />
          <WheelSelector
            data={reading.data}
            integerOptions={WheelSelectorOptions.bgInt}
            fractionOptions={WheelSelectorOptions.doseFrac}
            updateData={setData}
          />
          <View style={ModifyDoseStyles.switch}>
            <Text style={ModifyDoseStyles.switchText}>Short</Text>
            <Switch testID="doseReading_toggleSwitch" onValueChange={() => setLong(!long)} value={state.long} />
            <Text style={ModifyDoseStyles.switchText}>Long</Text>
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
        table={Table.dose}
        dataKey={DataKey.dose}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.dose)}
      />
    </>
  )
}

export default ModifyDoseModal
