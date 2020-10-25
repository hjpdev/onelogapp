import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import MacroReadingInput from '../../Minor/MacroReadingInput'
import GradientBorder from '../../Minor/GradientBorder'
import MacroAmountSelector from '../../Minor/MacroAmountSelector'
import SuccessModal from '../SuccessModal'

import { handleSuccessfulUpdate, putReading } from '../../../Store/Data'
import { capitaliseAddWhitespace } from '../../../Helpers/General'
import { TSavedMacro } from '../../SavedMacros/SavedMacro'

type ModifySavedMacroModalProps = {
  isVisible: boolean
  data: TSavedMacro
  onClose: () => void
  update: () => void
}

const ModifySavedMacroModal: React.FC<ModifySavedMacroModalProps> = (props: ModifySavedMacroModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [name, setName] = useState(data.name)
  const [amount, setAmount] = useState(data.amount)
  const [unit, setUnit] = useState(data.unit)
  const [reading, setReading] = useState<{[key: string]: string | number}>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const id = data.id

  const handleSubmit = async () => {
    try {
      const data = { name, ...reading, amount, unit }
      const response = await putReading({ table: 'macro/saved', data, id })

      await handleSuccessfulUpdate('savedMacros', response, setShowSuccessModal)
      update()
      onClose()
    } catch (err) {
      console.log(`Error ModifySavedMacroModal.handleSubmit: ${err}`)
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
        <TextInput value={capitaliseAddWhitespace(name)} onChangeText={setName} style={Styles.name} />
        <GradientBorder x={1.0} y={1.0} />
        <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} amount={amount} unit={unit} allowEditUnit />
        <GradientBorder x={1.0} y={1.0} />
        <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setReading} />
        <ChoiceButtons confirmationText={'Submit'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifySavedMacroModal

const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start'
  },
  container: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  }
})
