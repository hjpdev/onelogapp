import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import MacroReadingInput from '../Minor/MacroReadingInput'
import GradientBorder from '../Minor/GradientBorder'
import ModifyTimeSelector from '../Minor/ModifyTimeSelector'
import SuccessModal from './SuccessModal'

import { handleSuccessfulUpdate, putReading } from '../../Store/Data'
import { TSavedMacro } from '../SavedMacros/SavedMacro'

type ModifyMacroModalProps = {
  isVisible: boolean
  data: TSavedMacro
  onClose: () => void
  update: (dataKey: string) => void
}

const ModifyMacroModal: React.FC<ModifyMacroModalProps> = (props: ModifyMacroModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<{[key: string]: string | number}>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const id = data.id

  const handleSubmit = async () => {
    try {
      const data = { ...reading }
      const response = await putReading({ table: `macro/${id}`, data })

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
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={Styles.modal}
    >
      <View style={Styles.container}>
        <ModifyTimeSelector created={created} setDateTime={setCreated} />
        <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setReading} />
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Cancel'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Submit'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifyMacroModal

const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start'
  },
  container: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    width: '50%',
    alignItems: 'center'
  },
  buttonText: {
    padding: 6
  }
})
