import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import Modal from 'react-native-modal'

import ReadingService from '../../Services/ReadingService'
import SuccessModal from '../Modals/SuccessModal'
import { GradientBorder, ChoiceButtons, MacroAmountSelector} from '../Minor'
import { SavedMacroReading, Table } from '../../types'
import { NewSavedMacroModalStyles } from './Styles'

interface NewSavedMacroModalProps {
  isVisible: boolean
  onClose: () => void
  macros: SavedMacroReading
}

const readingService = new ReadingService()

const NewSavedMacroModal: React.FC<NewSavedMacroModalProps> = (props: NewSavedMacroModalProps) => {
  const { isVisible, onClose, macros } = props

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    const data = {
      ...macros,
      name,
      amount,
      unit
    }
    try {
      const response = await readingService.submitReading({
        table: Table.savedMacro,
        data
      })
      onClose()
      return readingService.handleSuccessfulSubmit('savedMacros', response, setShowSuccessModal)
    } catch (err) {
      console.log('Error NewSavedMacroModal handleSubmit: ', err)
    }
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={NewSavedMacroModalStyles.modal}
      >
        <View style={NewSavedMacroModalStyles.container}>
          <TextInput placeholder="Name" onChangeText={setName} style={NewSavedMacroModalStyles.textInput} />
          <GradientBorder x={1.0} y={1.0} />
          <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} allowEditUnit />
          <ChoiceButtons
            confirmationText="Submit"
            cancellationText="Cancel"
            onSubmit={async () => await handleSubmit()}
            onClose={onClose}
          />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewSavedMacroModal
