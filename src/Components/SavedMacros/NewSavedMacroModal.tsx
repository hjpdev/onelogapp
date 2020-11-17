import React, { useState } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from '../Minor/GradientBorder'
import ChoiceButtons from '../Minor/ChoiceButtons'
import MacroAmountSelector from '../Minor/MacroAmountSelector'
import SuccessModal from '../Modals/SuccessModal'
import { handleSuccessfulSubmit, submitReading } from '../../Store/Data'

type NewSavedMacroModalProps = {
  isVisible: boolean
  onClose: () => void
  macros: {
    kcal: number
    carbs: number
    sugar: number
    protein: number
    fat: number
  }
}

const NewSavedMacroModal: React.FC<NewSavedMacroModalProps> = (props: NewSavedMacroModalProps) => {
  const { isVisible, onClose, macros } = props

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    const data = { ...macros, name, amount, unit }
    try {
      const response = await submitReading({ table: 'macro/saved', data })
      onClose()
      return handleSuccessfulSubmit('savedMacros', response, setShowSuccessModal)
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
        style={Styles.modal}
      >
        <View style={Styles.container}>
          <TextInput placeholder="Name" onChangeText={setName} style={Styles.textInput} />
          <GradientBorder x={1.0} y={1.0} />
          <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} allowEditUnit />
          <ChoiceButtons confirmationText="Submit" cancellationText="Cancel" onSubmit={async () => await handleSubmit()} onClose={onClose} />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewSavedMacroModal

const Styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1.5,
    borderBottomWidth: 2,
    flex: 0
  },
  modal: {
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: 'grey',
    borderRadius: 2
  }
})
