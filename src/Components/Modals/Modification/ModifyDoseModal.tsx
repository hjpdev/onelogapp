import React, { useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import GradientBorder from '../../Minor/GradientBorder'
import ModifyTimeSelector from '../../Minor/ModifyTimeSelector'
import SuccessModal from '../SuccessModal'
import WheelSelector from '../../Minor/WheelSelector'

import { handleSuccessfulUpdate, putReading } from '../../../Store/Data'

type ModifyDoseModalProps = {
  isVisible: boolean
  data: DoseReading
  onClose: () => void
  update: (dataKey: string) => void
}

type DoseReading = {
  id: number
  created: Date
  reading: number
  long: boolean
}

function getDoseProperties<DoseReading>(obj: DoseReading): Array<keyof DoseReading> {
  const result: Array<keyof DoseReading> = []
  for (const key in obj) {
    result.push(key)
  }
  return result
}

const ModifyDoseModal: React.FC<ModifyDoseModalProps> = (props: ModifyDoseModalProps) => {
  const { isVisible, data, onClose, update } = props

  const [created, setCreated] = useState(data.created)
  const [reading, setReading] = useState<number>(data.reading || 0.0)
  const [long, setLong] = useState<boolean>(data.long)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const state: DoseReading = { id: data.id, created, reading, long }

  const isPropertyUpdated = (property: keyof DoseReading) => {
    return state[property] !== data[property]
  }

  const handleSubmit = async () => {
    try {
      let body = {} as any
      const properties: Array<keyof DoseReading> = getDoseProperties(state)
      for (const key of properties) {
        if (isPropertyUpdated(key)) {
          body[key] = state[key]
        }
      }
      const response = await putReading({ table: 'dose', data: body, id: state.id })

      await handleSuccessfulUpdate('doseReadings', response, setShowSuccessModal)
      update('doseReadings')
      onClose()
    } catch (err) {
      console.log(`Error ModifyDoseModal.handleSubmit: ${err}`)
    }
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
      style={Styles.modal}
    >
      <View style={Styles.container}>
        <ModifyTimeSelector created={state.created} setDateTime={setCreated} />
        <WheelSelector reading={data.reading} updateReading={setReading} />
        <View style={Styles.switch}>
        <Text style={Styles.switchText}>Short</Text>
          <Switch
          testID={'doseReading_toggleSwitch'}
          onValueChange={() => setLong(!long)}
          value={state.long}
          />
          <Text style={Styles.switchText}>Long</Text>
        </View>
        <View style={Styles.buttons}>
          <TouchableOpacity onPress={onClose} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Cancel'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.button}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={Styles.buttonText}>{'Submit'}</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default ModifyDoseModal

const Styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start'
  },
  container: {
    backgroundColor: '#ebebeb',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    paddingVertical: 2
  },
  switch: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    width: '50%',
    alignItems: 'center'
  },
  buttonText: {
    padding: 6
  }
})
