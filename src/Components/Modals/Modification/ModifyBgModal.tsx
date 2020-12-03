import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, TouchableOpacity, View } from 'react-native'

import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { StoredBgReading, DataKey, Table } from '../../../types'
import { ModifyBgStyles } from '../Styles'

interface ModifyBgModalProps {
  isVisible: boolean
  reading: StoredBgReading
  onClose: () => void
  onDelete: () => void
  update: (_: DataKey) => void
}

const dataKey = DataKey.bg

const ModifyBgModal: React.FC<ModifyBgModalProps> = (props: ModifyBgModalProps) => {
  const { isVisible, reading, onClose, onDelete, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState(reading.data || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { created, data } : { data }
      const response = await ReadingService.putReading({
        table: Table.bg,
        data: body,
        id: reading.id
      })

      await ReadingService.handleSuccessfulUpdate(dataKey, response, setShowSuccessModal)
      update(dataKey)
      onClose()
    } catch (err) {
      console.log(`Error ModifyBgModal.handleSubmit: ${err}`)
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
        style={ModifyBgStyles.modal}
      >
        <View style={ModifyBgStyles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <WheelSelector
            data={data}
            integerOptions={WheelSelectorOptions.bgInt}
            fractionOptions={WheelSelectorOptions.default}
            updateData={setData}
          />
          <View style={ModifyBgStyles.deleteContainer}>
            <TouchableOpacity onPress={onDelete}>
              <Text style={ModifyBgStyles.deleteText}>Delete</Text>
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
    </>
  )
}

export default ModifyBgModal
