import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Switch } from 'react-native'

import ReadingService from '../../../Services/ReadingService'
import SuccessModal from '../../Modals/SuccessModal'
import { TimeSelector, WheelSelector } from '../../Minor'
import { NewReadingHeader } from '../NewReadingHeader'
import { delay, WheelSelectorOptions } from '../../../Helpers/General'
import { DataKey, DoseReadingProps, NewReadingHeaderText, Table } from '../../../types'
import { DoseStyles } from '../Styles'

const dataKey = DataKey.dose

export const NewDoseReading: React.FC = () => {
  const [data, setData] = useState(0.0)
  const [long, setLong] = useState(false)
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    let response
    if (data > 0) {
      if (data < 1) {
        delay(500)
      }
      try {
        const reading: DoseReadingProps = dateTime ? { data, long, created: dateTime } : { data, long }
        response = await ReadingService.submitReading({
          table: Table.dose,
          reading
        })
      } catch (err) {
        console.log('Error dose handleSubmit: ', err)
      }
    }

    return response && ReadingService.handleSuccessfulSubmit(dataKey, response, setShowSuccessModal)
  }

  return (
    <>
      <NewReadingHeader headerText={NewReadingHeaderText.dose} dataKey={dataKey} />
      <View style={DoseStyles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <WheelSelector
          isDose
          integerOptions={WheelSelectorOptions.bgInt}
          fractionOptions={WheelSelectorOptions.doseFrac}
          updateData={setData}
        />
        <Text style={DoseStyles.unit}>Units</Text>
        <View style={DoseStyles.switch}>
          <Text style={DoseStyles.switchText}>Short</Text>
          <Switch testID="doseReading_toggleSwitch" onValueChange={() => setLong(!long)} value={long} />
          <Text style={DoseStyles.switchText}>Long</Text>
        </View>
        <TouchableOpacity onPress={async () => handleSubmit()} style={DoseStyles.submit}>
          <Text style={DoseStyles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )
}

export default NewDoseReading
