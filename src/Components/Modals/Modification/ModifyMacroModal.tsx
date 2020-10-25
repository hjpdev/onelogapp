import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import MacroReadingInput from '../../Minor/MacroReadingInput'
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector'
import SuccessModal from '../SuccessModal'

import { handleSuccessfulUpdate, putReading } from '../../../Store/Data'

type ModifyMacroModalProps = {
  isVisible: boolean
  data: MacroReading
  onClose: () => void
  update: (dataKey: string) => void
}

type MacroReading = {
  id: number
  created: Date
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
}

const ModifyMacroModal: React.FC<ModifyMacroModalProps> = (props: ModifyMacroModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<{[key: string]: string | number}>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    try {
      const body = created !== data.created ? { ...reading, created } : { ...reading }
      const response = await putReading({ table: 'macro', data: body, id: data.id })

      await handleSuccessfulUpdate('macroReadings', response, setShowSuccessModal)
      update('macroReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyMacroModal.handleSubmit: ${err}`)
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
        <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setReading} />
        <ChoiceButtons confirmationText={'Submit'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifyMacroModal


const Styles = StyleSheet.create({
  modal: {
  },
  container: {
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4
  }
})
