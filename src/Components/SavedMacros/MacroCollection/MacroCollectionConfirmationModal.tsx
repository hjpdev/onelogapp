import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import ChoiceButtons from '../../Minor/ChoiceButtons'
import GradientBorder from '../../Minor/GradientBorder'
import MacroAmountSelector from '../../Minor/MacroAmountSelector'
import SuccessModal from '../../Modals/SuccessModal'
import { delay } from '../../../Helpers/General'
import { TSavedMacro } from '../SavedMacro'

type MacroCollectionConfirmationModalProps = {
  isVisible: boolean
  data: TSavedMacro
  onClose: () => void
  onSubmit: (amount: number, data: TSavedMacro) => void
}

const MacroCollectionConfirmationModal: React.FC<MacroCollectionConfirmationModalProps> = (props: MacroCollectionConfirmationModalProps) => {
  const { isVisible, data, onClose, onSubmit } = props

  const [amount, setAmount] = useState<number>(data.amount)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const handleSubmit = async () => {
    onSubmit(amount, data)
    onClose()
    setShowSuccessModal(true)
    await delay(1200)
    setShowSuccessModal(false)
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
    backdropOpacity={0.2}
	  style={Styles.modal}>
	  <View style={Styles.container}>
		<GradientBorder x={1.0} y={1.0} />
    <View>
  		<MacroAmountSelector unit={data.unit} updateAmount={setAmount} />
    </View>
    <ChoiceButtons confirmationText={'Add'} cancellationText={'Cancel'} onSubmit={async () => await handleSubmit()} onClose={onClose} />
	  </View>
	</Modal>
	<SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
	</>
  )
}

export default MacroCollectionConfirmationModal


const Styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderBottomWidth: 2,
    borderRadius: 4,
  },
  modal: {
	  alignItems: 'center'
  }
})
