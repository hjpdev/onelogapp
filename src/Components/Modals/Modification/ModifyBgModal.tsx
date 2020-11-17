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
  reading: BgReading
  onClose: () => void
  update: (dataKey: string) => void
}

type BgReading = {
  id: number
  created: Date
  data: number
}

const ModifyBgModal: React.FC<ModifyBgModalProps> = (props: ModifyBgModalProps) => {
  const { isVisible, reading, onClose, update } = props

  const [created, setCreated] = useState(reading.created)
  const [data, setData] = useState<number>(reading.data || 0.0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== reading.created ? { created, data } : { data }
      const response = await putReading({ table: 'bg', data: body, id: reading.id })

      await handleSuccessfulUpdate('bgReadings', response, setShowSuccessModal)
      update('bgReadings')
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
        style={Styles.modal}
      >
        <View style={Styles.container}>
          <ModifyTimeSelector created={created} setDateTime={setCreated} />
          <WheelSelector data={data} updateData={setData} />
          <View style={Styles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={Styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ChoiceButtons confirmationText="Submit" cancellationText="Cancel" onSubmit={async () => await handleSubmit()} onClose={onClose} />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
      <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={reading.id} name={generateCreatedDate(`${reading.created}`)} table="bg" dataKey="bgReadings" onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('bgReadings')} />
    </>
  )
}

export default ModifyBgModal

const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 260,
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
    marginVertical: 10
  },
  deleteText: {
    textAlign: 'center'
  }
})
