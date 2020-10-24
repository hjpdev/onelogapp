import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

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
	  style={Styles.modal}>
	  <View style={Styles.container}>
		<GradientBorder x={1.0} y={1.0} />
    <View>
  		<MacroAmountSelector unit={data.unit} updateAmount={setAmount} />
    </View>
		<View style={Styles.buttons}>
      <View style={{ width: '50%', borderRightWidth: 1 }}>
        <TouchableOpacity onPress={onClose}>
          <Text style={Styles.buttonText}>{'Cancel'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '50%' }}>
        <TouchableOpacity onPress={async () => await handleSubmit()}>
          <Text style={Styles.buttonText}>{'Add'}</Text>
        </TouchableOpacity>
      </View>
		</View>
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
    borderRadius: 2,
    borderWidth: 1
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
  },
  buttons: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderWidth: 1
  },
  buttonText: {
    padding: 6,
    textAlign: 'center'
  }
})
