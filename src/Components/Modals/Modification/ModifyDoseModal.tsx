import React, { useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal'
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector'
import SuccessModal from '../SuccessModal'
import WheelSelector from '../../Minor/WheelSelector'
import { generateCreatedDate } from '../../../Helpers/Date'
import { handleSuccessfulUpdate, putReading } from '../../../Store/Data'

type ModifyDoseModalProps = {
  isVisible: boolean
  data: DoseReading
  onClose: () => void
  update: (dataKey: string) => void
}

type DoseReading = {
  id: number
  created: Date
  reading: number
  long: boolean
}

function getDoseProperties<DoseReading>(obj: DoseReading): Array<keyof DoseReading> {
  const result: Array<keyof DoseReading> = []
  for (const key in obj) {
    result.push(key)
  }
  return result
}

const ModifyDoseModal: React.FC<ModifyDoseModalProps> = (props: ModifyDoseModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<number>(data.reading || 0.0)
  const [long, setLong] = useState<boolean>(data.long)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const state: DoseReading = { id: data.id, created, reading, long }

  const isPropertyUpdated = (property: keyof DoseReading) => {
    return state[property] !== data[property]
  }

  const handleSubmit = async () => {
    try {
      let body = {} as any
      const properties: Array<keyof DoseReading> = getDoseProperties(state)
      for (const key of properties) {
        if (isPropertyUpdated(key)) {
          body[key] = state[key]
        }
      }
      const response = await putReading({ table: 'dose', data: body, id: state.id })

      await handleSuccessfulUpdate('doseReadings', response, setShowSuccessModal)
      update('doseReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyDoseModal.handleSubmit: ${err}`)
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
        <ModifyTimeSelector created={state.created} setDateTime={setCreated} />
        <WheelSelector reading={data.reading} updateReading={setReading} />
        <View style={Styles.switch}>
        <Text style={Styles.switchText}>Short</Text>
          <Switch
          testID={'doseReading_toggleSwitch'}
          onValueChange={() => setLong(!long)}
          value={state.long}
          />
          <Text style={Styles.switchText}>Long</Text>
        </View>
        <View style={Styles.deleteContainer}>
          <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)} s>
            <Text style={Styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <ChoiceButtons confirmationText={'Submit'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={data.id} name={generateCreatedDate(`${data.created}`)} table={'dose'} dataKey={'doseReadings'} onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('doseReadings')} />
    </>
  )
}

export default ModifyDoseModal

const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  container: {
    width: 240,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  switch: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16
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
