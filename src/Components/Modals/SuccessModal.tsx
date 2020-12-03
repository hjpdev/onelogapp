import React from 'react'
import Modal from 'react-native-modal'
import { Image, TouchableOpacity, View } from 'react-native'

import { SuccessStyles } from './Styles'

interface SuccessModalProps {
  isVisible: boolean
  onPress: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = (props: SuccessModalProps) => {
  const { isVisible, onPress } = props

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={500}
      animationOutTiming={200}
      hasBackdrop={false}
      style={SuccessStyles.modal}
    >
      <View>
        <TouchableOpacity onPress={onPress}>
          <Image style={SuccessStyles.image} source={require('../../Assets/Images/Confirmation.png')} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default SuccessModal
