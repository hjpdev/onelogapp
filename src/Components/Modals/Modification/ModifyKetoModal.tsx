import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { DataKey, StoredKetoReading, Table } from '../../../types'
import { ModifyKetoStyles } from '../Styles'

interface ModifyKetoModalProps {
  isVisible: boolean
  reading: StoredKetoReading
  onClose: () => void
  update: (_: DataKey) => void
}

const readingService = new ReadingService()

const ModifyKetoModal: React.FC<ModifyKetoModalProps> = (props: ModifyKetoModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState(reading.data || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { created, data } : { data }
      const response = await readingService.putReading({
        table: Table.keto,
        data: body,
        id: reading.id
      })

      await readingService.handleSuccessfulUpdate(DataKey.keto, response, setShowSuccessModal)
      update(DataKey.keto)
      onClose()
    } catch (err) {
      console.log(`Error ModifyKetoModal.handleSubmit: ${err}`) // eslint-disable-line no-console
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
        style={ModifyKetoStyles.modal}
      >
        <View style={ModifyKetoStyles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <WheelSelector
            data={reading.data}
            integerOptions={WheelSelectorOptions.default}
            fractionOptions={WheelSelectorOptions.default}
            updateData={setData}
          />
          <View style={ModifyKetoStyles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={ModifyKetoStyles.deleteText}>Delete</Text>
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
        table={Table.keto}
        dataKey={DataKey.keto}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.keto)}
      />
    </>
  )
}

export default ModifyKetoModal
