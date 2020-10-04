import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import MacroReadingInput from '../Minor/MacroReadingInput'
import GradientBorder from '../Minor/GradientBorder'
import MacroAmountSelector from '../Minor/MacroAmountSelector'
import SuccessModal from './SuccessModal'

import { handleSuccessfulUpdate, putReading } from '../../Store/Data'
import { formatName } from '../../Helpers/General'
import { TSavedMacro } from '../SavedMacros/SavedMacro'

type ModifyMacroModalProps = {
  isVisible: boolean
  data: TSavedMacro
  onClose: () => void
  update: () => void
}

const ModifyMacroModal: React.FC<ModifyMacroModalProps> = (props: ModifyMacroModalProps) => {
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
      const response = await putReading({ table: `macro/saved/${id}`, data })

      await handleSuccessfulUpdate('savedMacros', response, setShowSuccessModal)
      update()
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
        <TextInput value={formatName(name)} onChangeText={setName} style={Styles.name} />
        <GradientBorder x={1.0} y={1.0} />
        <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} amount={amount} unit={unit} />
        <GradientBorder x={1.0} y={1.0} />
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
