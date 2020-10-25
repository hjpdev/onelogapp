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

type ModifyBgModalProps = {
  isVisible: boolean
  data: BgReading
  onClose: () => void
  update: (dataKey: string) => void
}

type BgReading = {
  id: number
  created: Date
  reading: number
}

const ModifyBgModal: React.FC<ModifyBgModalProps> = (props: ModifyBgModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<number>(data.reading || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== data.created ? { created, reading } : { reading }
      const response = await putReading({ table: 'bg', data: body, id: data.id })

      await handleSuccessfulUpdate('bgReadings', response, setShowSuccessModal)
      update('bgReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyBgModal.handleSubmit: ${err}`)
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
        <View style={Styles.deleteContainer}>
          <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)} s>
            <Text style={Styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <ModifyTimeSelector created={created} setDateTime={setCreated} />
        <WheelSelector reading={data.reading} updateReading={setReading} />
        <ChoiceButtons confirmationText={'Submit'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={data.id} name={generateCreatedDate(`${data.created}`)} table={'bg'} dataKey={'bgReadings'} onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('bgReadings')} />
    </>
  )
}

export default ModifyBgModal

const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 240,
    backgroundColor: '#ebebeb',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  deleteContainer: {
    width: '33%',
    margin: 4,
    borderWidth: 1,
    borderBottomWidth: 1.2,
    borderRadius: 4
  },
  deleteText: {
    textAlign: 'center'
  }
})
