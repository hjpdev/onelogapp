import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

type PreviousReadingsModalProps = {
  isVisible: boolean,
  onPress: () => void
}

const PreviousReadingsModal: React.FC<PreviousReadingsModalProps> = (props: PreviousReadingsModalProps) => {
  const { isVisible, onPress } = props

  return(
    <Modal isVisible={isVisible} animationIn='fadeInUp' animationOut='fadeOutDown' style={Styles.modal}>
      <TouchableOpacity onPress={onPress}>
        <Text>{'Close'}</Text>
      </TouchableOpacity>
      <View>
        <Text>{'PreviousReadings'}</Text>
      </View>
    </Modal>
  )
}

export default PreviousReadingsModal


const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
