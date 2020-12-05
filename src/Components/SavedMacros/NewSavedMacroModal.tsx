import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import Modal from 'react-native-modal'

import MacroAmountSelector from '../Minor/MacroAmountSelector'
import ReadingService from '../../Services/ReadingService'
import SuccessModal from '../Modals/SuccessModal'
import { GradientBorder, ChoiceButtons } from '../Minor'
import { MacroReadingData, SavedMacroReadingProps, Table } from '../../types'
import { NewSavedMacroModalStyles } from './Styles'

interface NewSavedMacroModalProps {
  isVisible: boolean
  data: MacroReadingData
  onClose: () => void
}

const NewSavedMacroModal: React.FC<NewSavedMacroModalProps> = (props: NewSavedMacroModalProps) => {
  const { isVisible, onClose, data } = props

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    const reading: SavedMacroReadingProps = { data, name, amount, unit }
    let response
    try {
      response = await ReadingService.submitReading({
        table: Table.savedMacro,
        reading
      })
      onClose()
    } catch (err) {
      return console.log('Error NewSavedMacroModal handleSubmit: ', err)
    }

    return ReadingService.handleSuccessfulSubmit('savedMacros', response, setShowSuccessModal)
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
            onSubmit={async () => handleSubmit()}
            onClose={onClose}
          />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewSavedMacroModal
