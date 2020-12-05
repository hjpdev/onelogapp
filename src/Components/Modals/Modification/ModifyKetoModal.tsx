import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Image, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, GradientBorder, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { DataKey, StoredKetoReading, Table } from '../../../types'
import { ModifyKetoStyles } from '../Styles'

interface ModifyKetoModalProps {
  isVisible: boolean
  reading: StoredKetoReading
  onClose: () => void
  showKetoModal: () => void
  update: (_: DataKey) => void
}

const ModifyKetoModal: React.FC<ModifyKetoModalProps> = (props: ModifyKetoModalProps) => {
  const { isVisible, reading, onClose, showKetoModal, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState(reading.data || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { created, data } : { data }
      const response = await ReadingService.putReading({
        table: Table.keto,
        data: body,
        id: reading.id
      })

      await ReadingService.handleSuccessfulUpdate(DataKey.keto, response, setShowSuccessModal)
      update(DataKey.keto)
      onClose()
    } catch (err) {
      console.log(`Error ModifyKetoModal.handleSubmit: ${err}`)
    }
  }

  const onHide = () => {
    deleteConfirmation && setShowDeleteConfirmationModal(true)
    setDeleteConfirmation(false)
  }

  const onDelete = () => {
    setDeleteConfirmation(true)
    onClose()
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
        onModalHide={onHide}
      >
        <View style={ModifyKetoStyles.container}>
          <View style={ModifyKetoStyles.deleteContainer}>
            <TouchableOpacity onPress={() => onDelete()}>
              <Image source={require('../../../Assets/Images/Bin.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>
          <GradientBorder x={1.0} y={1.0} />
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <GradientBorder x={1.0} y={1.0} />
          <WheelSelector
            data={reading.data}
            integerOptions={WheelSelectorOptions.default}
            fractionOptions={WheelSelectorOptions.default}
            updateData={setData}
          />
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
        onModalHide={showKetoModal}
      />
    </>
  )
}

export default ModifyKetoModal
