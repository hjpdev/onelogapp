import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { View } from 'react-native'

import SuccessModal from '../../Modals/SuccessModal'
import { ChoiceButtons, GradientBorder, MacroAmountSelector } from '../../Minor'
import { delay } from '../../../Helpers/General'
import { StoredSavedMacroReading } from '../../../types'
import { ConfirmationModalStyles } from './Styles'

interface MacroCollectionConfirmationModalProps {
  isVisible: boolean
  data: StoredSavedMacroReading
  onClose: () => void
  onSubmit: (amount: number, data: StoredSavedMacroReading) => void // eslint-disable-line no-unused-vars
}

const MacroCollectionConfirmationModal: React.FC<MacroCollectionConfirmationModalProps> = (
  props: MacroCollectionConfirmationModalProps
) => {
  const { isVisible, data, onClose, onSubmit } = props

  const [amount, setAmount] = useState(data.amount)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    onSubmit(amount, data)
    onClose()
    setShowSuccessModal(true)
    await delay(1200)
    setShowSuccessModal(false)
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
        backdropOpacity={0.2}
        style={ConfirmationModalStyles.modal}
      >
        <View style={ConfirmationModalStyles.container}>
          <GradientBorder x={1.0} y={1.0} />
          <View>
            <MacroAmountSelector unit={data.unit} updateAmount={setAmount} />
          </View>
          <ChoiceButtons
            confirmationText="Add"
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

export default MacroCollectionConfirmationModal
