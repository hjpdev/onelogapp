import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Image, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, GradientBorder, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { StoredBgReading, DataKey, Table } from '../../../types'
import { ModifyBgStyles } from '../Styles'

interface ModifyBgModalProps {
  isVisible: boolean
  reading: StoredBgReading
  onClose: () => void
  showBgModal: () => void
  update: (_: DataKey) => void
}

const dataKey = DataKey.bg

const ModifyBgModal: React.FC<ModifyBgModalProps> = (props: ModifyBgModalProps) => {
  const { isVisible, reading, onClose, showBgModal, update } = props

  const [data, setData] = useState(reading.data || 0.0)
  const [created, setCreated] = useState(reading.created)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

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
        style={ModifyBgStyles.modal}
        onModalHide={onHide}
      >
        <View style={ModifyBgStyles.container}>
        <View style={ModifyBgStyles.deleteContainer}>
            <TouchableOpacity onPress={() => onDelete()}>
              <Image source={require('../../../Assets/Images/Bin.png')} style={{ height: 20, width: 20, borderBottomWidth: 1 }} />
            </TouchableOpacity>
          </View>
          <GradientBorder x={1.0} y={1.0} />
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <GradientBorder x={1.0} y={1.0} />
          <View style={{}}>
            <WheelSelector
              data={data}
              integerOptions={WheelSelectorOptions.bgInt}
              fractionOptions={WheelSelectorOptions.default}
              updateData={setData}
            />
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
        table={Table.bg}
        dataKey={DataKey.bg}
        onClose={() => setShowDeleteConfirmationModal(false)}
        update={() => update(DataKey.bg)}
        onModalHide={showBgModal}
      />
    </>
  )
}

export default ModifyBgModal
