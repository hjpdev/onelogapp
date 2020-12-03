import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { ChoiceButtonsStyles } from './Styles'

interface ChoiceButtonsProps {
  confirmationText: string
  cancellationText: string
  onSubmit: () => void
  onClose: () => void
}

export const ChoiceButtons: React.FC<ChoiceButtonsProps> = (props: ChoiceButtonsProps) => {
  const { confirmationText, cancellationText, onSubmit, onClose } = props

  return (
    <View style={ChoiceButtonsStyles.buttons}>
      <View style={ChoiceButtonsStyles.closeButton}>
        <TouchableOpacity onPress={onClose}>
          <Text style={ChoiceButtonsStyles.buttonText}>{cancellationText}</Text>
        </TouchableOpacity>
      </View>
      <View style={ChoiceButtonsStyles.submitButton}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={ChoiceButtonsStyles.buttonText}>{confirmationText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChoiceButtons
