import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector'
import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../SuccessModal'
import WheelSelector from '../../Minor/WheelSelector'
import { generateCreatedDate } from '../../../Helpers/Date'
import { SimpleReading } from '../../../types'

interface ModifyKetoModalProps {
  isVisible: boolean
  reading: SimpleReading
  onClose: () => void
  update: (dataKey: string) => void
}

const readingService = new ReadingService()

const ModifyKetoModal: React.FC<ModifyKetoModalProps> = (props: ModifyKetoModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState<number>(reading.data || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { created, data } : { data }
      const response = await readingService.putReading({ table: 'keto', data: body, id: reading.id })

      await readingService.handleSuccessfulUpdate('ketoReadings', response, setShowSuccessModal)
      update('ketoReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyKetoModal.handleSubmit: ${err}`)
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
        style={Styles.modal}
      >
        <View style={Styles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <WheelSelector data={reading.data} updateData={setData} />
          <View style={Styles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)} >
              <Text style={Styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ChoiceButtons confirmationText="Submit" cancellationText="Cancel" onSubmit={async () => await handleSubmit()} onClose={onClose} />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
      <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={reading.id} name={generateCreatedDate(`${reading.created}`)} table="keto" dataKey="ketoReadings" onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('ketoReadings')} />
    </>
  )
}

export default ModifyKetoModal

const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 240,
    backgroundColor: '#ebebeb',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
    alignItems: 'center'
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderBottomWidth: 2,
    borderRadius: 4,
    marginBottom: 12
  },
  deleteText: {
    textAlign: 'center'
  }
})
