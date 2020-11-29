import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import DeleteConfirmationModal from '../DeleteConfirmationModal'
import MacroReadingInput from '../../Minor/MacroReadingInput'
import GradientBorder from '../../Minor/GradientBorder'
import MacroAmountSelector from '../../Minor/MacroAmountSelector'
import SuccessModal from '../SuccessModal'

import ReadingService from '../../../Services/ReadingService'
import { capitaliseAddWhitespace, truncateName } from '../../../Helpers/General'
import { TSavedMacro } from '../../SavedMacros/SavedMacro'

type ModifySavedMacroModalProps = {
  isVisible: boolean
  data: TSavedMacro
  onClose: () => void
  update: () => void
}

const readingService = new ReadingService()

const ModifySavedMacroModal: React.FC<ModifySavedMacroModalProps> = (props: ModifySavedMacroModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [name, setName] = useState(data.name)
  const [amount, setAmount] = useState(data.amount)
  const [unit, setUnit] = useState(data.unit)
  const [reading, setReading] = useState<{[key: string]: string | number}>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)

  const { id } = data

  const handleSubmit = async () => {
    try {
      const data = { name, ...reading, amount, unit }
      const response = await readingService.putReading({ table: 'macro/saved', data, id })

      await readingService.handleSuccessfulUpdate('savedMacros', response, setShowSuccessModal)
      update()
      onClose()
    } catch (err) {
      console.log(`Error ModifySavedMacroModal.handleSubmit: ${err}`)
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
      >
        <View style={Styles.container}>
          <TextInput value={capitaliseAddWhitespace(name)} onChangeText={setName} style={Styles.name} />
          <GradientBorder x={1.0} y={1.0} />
          <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} amount={amount} unit={unit} allowEditUnit />
          <GradientBorder x={1.0} y={1.0} />
          <MacroReadingInput showSavedMacroOptions={false} data={data} updateReading={setReading} />
          <View style={Styles.deleteContainer}>
            <TouchableOpacity onPress={() => setShowDeleteConfirmationModal(true)}>
              <Text style={Styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <ChoiceButtons confirmationText="Submit" cancellationText="Cancel" onSubmit={async () => await handleSubmit()} onClose={onClose} />
        </View>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
      <DeleteConfirmationModal isVisible={showDeleteConfirmationModal} id={data.id} name={truncateName(20, `${data.name}`)} table="macro/saved" dataKey="savedMacros" onClose={() => setShowDeleteConfirmationModal(false)} update={() => update('savedMacros')} />
    </>
  )
}

export default ModifySavedMacroModal

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 2
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
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
