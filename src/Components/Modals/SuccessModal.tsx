import React from 'react'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

type SuccessModalProps = {
  isVisible: boolean
  onPress: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = (props: SuccessModalProps) => {
  const { isVisible, onPress } = props

  return(
    <Modal
      isVisible={isVisible}
      animationIn='zoomIn'
      animationOut='zoomOut'
      animationInTiming={500}
      animationOutTiming={200}
      hasBackdrop={false}
      style={Styles.modal}
    >
      <View>
        <TouchableOpacity onPress={onPress}>
          <Image style={Styles.image} source={require('../../Assets/Images/Confirmation.png')} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default SuccessModal


const Styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100
  }
})
