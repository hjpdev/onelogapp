import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ChoiceButtonsProps = {
  confirmationText: string
  cancellationText: string
  onSubmit: () => void
  onClose: () => void
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = (props: ChoiceButtonsProps) => {
  const { confirmationText, cancellationText, onSubmit, onClose } = props

  return (
    <View style={Styles.buttons}>
      <View style={Styles.closeButton}>
        <TouchableOpacity onPress={onClose}>
          <Text style={Styles.buttonText}>{cancellationText}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.submitButton}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={Styles.buttonText}>{confirmationText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChoiceButtons


const Styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#e4e4e4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2
  },
  submitButton: {
    width: '50%'
  },
  closeButton: {
    width: '50%',
    borderRightWidth: 1
  },
  buttonText: {
    padding: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})