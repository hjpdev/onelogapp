import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

type NewSavedMacroModalProps = {
  isVisible: boolean
  onClose: () => void
}

const NewSavedMacroModal: React.FC<NewSavedMacroModalProps> = (props: NewSavedMacroModalProps) => {
  const { isVisible, onClose } = props
  const [name, setName] = useState('')

  return(
    <Modal isVisible={isVisible} animationIn='fadeInUp' animationOut='fadeOutDown' animationInTiming={500} animationOutTiming={200} style={Styles.modal}>
      <View style={Styles.container}>
        <TextInput placeholder={'Name:'} onChangeText={setName} style={Styles.textInput} />
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
    height: '50%',
    width: '50%',
    // backgroundColor: 'blue'
  },
  modal: {
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 200,
    backgroundColor: 'white',
    borderColor: 'grey'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    // backgroundColor: 'red'
  },
  buttonText: {
    padding: 6
  }
})
