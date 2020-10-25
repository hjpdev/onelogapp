import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import DeleteConfirmationModal from '../DeleteConfirmationModal'
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector'
import SuccessModal from '../SuccessModal'
import WheelSelector from '../../Minor/WheelSelector'
import { generateCreatedDate } from '../../../Helpers/Date'

import { handleSuccessfulUpdate, putReading } from '../../../Store/Data'

type ModifyKetoModalProps = {
  isVisible: boolean
  data: KetoReading
  onClose: () => void
  update: (dataKey: string) => void
}

type KetoReading = {
  id: number
  created: Date
  reading: number
}

const ModifyKetoModal: React.FC<ModifyKetoModalProps> = (props: ModifyKetoModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<number>(data.reading || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== data.created ? { created, reading } : { reading }
      const response = await putReading({ table: 'keto', data: body, id: data.id })

      await handleSuccessfulUpdate('ketoReadings', response, setShowSuccessModal)
      update('ketoReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyKetoModal.handleSubmit: ${err}`)
    }
  }

  return(
    <>
    <Modal
      isVisible={isVisible}
      animationIn='zoomIn'
      animationOut='zoomOut'
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      backdropOpacity={0.66}
      style={Styles.modal}
    >
      <View style={Styles.container}>
        <ModifyTimeSelector created={created} setDateTime={setCreated} />
        <WheelSelector reading={data.reading} updateReading={setReading} />
        <View style={Styles.deleteContainer}>
          <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)} s>
            <Text style={Styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <ChoiceButtons confirmationText={'Submit'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={data.id} name={generateCreatedDate(`${data.created}`)} table={'keto'} dataKey={'ketoReadings'} onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('ketoReadings')} />
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
