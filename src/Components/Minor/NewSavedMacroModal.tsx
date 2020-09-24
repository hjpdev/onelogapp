import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import MacroAmountSelector from './MacroAmountSelector'
import GradientBorder from './GradientBorder'

type NewSavedMacroModalProps = {
  isVisible: boolean
  onClose: () => void
  macros: {
    kcal: number
    carbs: number
    sugar: number
    protein: number
    fat: number
  }
}

const NewSavedMacroModal: React.FC<NewSavedMacroModalProps> = (props: NewSavedMacroModalProps) => {
  const { isVisible, onClose, macros } = props
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState('')

  console.log('AMOUNT => ', amount)
  console.log('UNIT => ', unit)

  return(
    <Modal isVisible={isVisible} animationIn='fadeInUp' animationOut='fadeOutDown' animationInTiming={500} animationOutTiming={500} style={Styles.modal}>
      <View style={Styles.container}>
        <TextInput placeholder={'Name'} onChangeText={setName} style={Styles.textInput} />
        <GradientBorder x={1.0} y={1.0} />
        <MacroAmountSelector updateAmount={setAmount} updateUnit={setUnit} />
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose} style={Styles.button}>
            <Text style={Styles.buttonText}>{'Cancel'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(name)} style={Styles.button}>
            <Text style={Styles.buttonText}>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default NewSavedMacroModal


const Styles = StyleSheet.create({
  container: {
    // height: '20%',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 2
  },
  modal: {
    // backgroundColor: '#ebebeb',
    alignItems: 'center',
    // justifyContent: 'center'
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
    borderRadius: 2
  },
  button: {
    // backgroundColor: 'red'
  },
  buttonText: {
    padding: 6
  }
})
