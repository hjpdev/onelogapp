import React from 'react'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

type SuccessModalProps = {
  isVisible: boolean,
  onPress: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = (props: SuccessModalProps) => {
  const { isVisible, onPress } = props

  return(
    <Modal isVisible={isVisible} animationIn='zoomIn' animationOut='zoomOut' animationInTiming={500} animationOutTiming={200} hasBackdrop={false} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <TouchableOpacity style={{padding: 300}} onPress={onPress}>
          <Image style={{ height: 100, width: 100 }} source={require('../../Assets/Images/Confirmation.png')} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default SuccessModal


const Styles = StyleSheet.create({

})
