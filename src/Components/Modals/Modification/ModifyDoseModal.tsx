import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native'

import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import { ChoiceButtons, GradientBorder, ModifyTimeSelector, WheelSelector } from '../../Minor'
import { WheelSelectorOptions } from '../../../Helpers'
import { DataKey, StoredDoseReading, Table } from '../../../types'
import { ModifyDoseStyles } from '../Styles'

interface ModifyDoseModalProps {
  isVisible: boolean
  reading: StoredDoseReading
  onClose: () => void
  showDoseModal: () => void
  update: (_: DataKey) => void
}

const ModifyDoseModal: React.FC<ModifyDoseModalProps> = (props: ModifyDoseModalProps) => {
  const { isVisible, reading, onClose,showDoseModal, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState(reading.data || 0.0)
  const [long, setLong] = useState(reading.long)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
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
      const response = await ReadingService.putReading({
        table: Table.dose,
        data: body,
        id: state.id
      })

      await ReadingService.handleSuccessfulUpdate(DataKey.dose, response, setShowSuccessModal)
      update(DataKey.dose)
      onClose()
    } catch (err) {
      console.log(`Error ModifyDoseModal.handleSubmit: ${err}`)
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
        style={ModifyDoseStyles.modal}
        onModalHide={onHide}
      >
        <View style={ModifyDoseStyles.container}>
          <View style={ModifyDoseStyles.deleteContainer}>
            <TouchableOpacity onPress={() => onDelete()}>
              <Image source={require('../../../Assets/Images/Bin.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>
          <GradientBorder x={1.0} y={1.0} />
          <ModifyTimeSelector created={state.created} setDateTime={setCreated} />
          <GradientBorder x={1.0} y={1.0} />
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
        onModalHide={showDoseModal}
      />
    </>
  )
}

export default ModifyDoseModal
